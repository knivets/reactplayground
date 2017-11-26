function setTokens(tokens){
	localStorage.setItem('tokens', JSON.stringify(tokens));
}

function removeTokens(){
	localStorage.removeItem('tokens');
}

function getTokens(){
	let tokensJson = localStorage.getItem('tokens');
	if(tokensJson){
		return JSON.parse(tokensJson);
	}
}

export {
	getTokens,
	setTokens,
	removeTokens,
}
