import request from 'superagent';
import config from './config';
import {
	getTokens,
	setTokens,
	removeTokens
} from './tokens';

function apiCall(endpoint, cb, method = 'GET', body = {}){
	let tokens = getTokens();
	if(!tokens){
		cb('not authenticated');
		return;
	}
	request(method.toUpperCase(), config.API_URL + '/' + endpoint)
		.set('x-access-token', tokens.jwt)
		.send(body)
		.end((err, res) => {
			if(err && err.status === 401){
				refreshTokens(() => apiCall(endpoint, cb, method, body));
			}
			else {
				if(cb){
					cb(err, res)
				}
			}
		});
}

function guestApiCall(endpoint, cb, method = 'GET', body = {}){
	request(method.toUpperCase(), config.API_URL + '/' + endpoint)
		.send(body)
		.end(cb);
}

function refreshTokens(cb){
	let oldTokens = getTokens();
	if(oldTokens){
		guestApiCall('access-tokens/refresh', (err, res) => {
			if(err){
				// the refresh_token is incorrect,
				// not much we can do here
				removeTokens();
				if(cb){
					cb('unauthenticated');
				}
			}
			else {
				let tokens = {
					jwt: res.body.jwt,
					refresh_token: oldTokens.refresh_token
				}
				setTokens(tokens);
				if(cb){
					cb(null, tokens);
				}
			}
		}, 'POST', {refresh_token: oldTokens.refresh_token});
	}
	else
	{
		if(cb)
		{
			cb('unauthenticated');
		}
	}
}

export {
	apiCall,
	guestApiCall,
}
