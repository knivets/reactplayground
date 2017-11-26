import request from 'superagent';
import config from './config';
import { getTokens } from './tokens';

function apiCall(endpoint, cb, method = 'GET', body = {}){
	let tokens = getTokens();
	if(!tokens){
		cb('not authenticated');
		return;
	}
	request(method.toUpperCase(), config.apiUrl + '/' + endpoint)
		.set('x-access-token', tokens.jwt)
		.send(body)
		.end(cb);
}

function guestApiCall(endpoint, cb, method = 'GET', body = {}){
	request(method.toUpperCase(), config.apiUrl + '/' + endpoint)
		.send(body)
		.end(cb);
}

export {
	apiCall,
	guestApiCall,
}
