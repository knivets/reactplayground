import {
	getTokens,
	setTokens,
	removeTokens
} from './tokens';
import {
	apiCall,
	guestApiCall
} from './api.js';

function currentUser(cb){
	apiCall('me', function(err, res){
		if(err){
			// error means that the token is either
			// expired, incorrect or absent
			refresh(function(err, res){
				if(err){
					cb('unauthenticated');
				}
				else {
					// if token refresh went successfully,
					// restart currentUser procedure
					currentUser(cb);
				}
			});
		}
		else {
			if(cb){
				cb(null, res.body);
			}
		}
	});
}

function refresh(cb){
	let oldTokens = getTokens();
	if(oldTokens){
		guestApiCall('access-tokens/refresh', function(err, res){
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
	currentUser,
}
