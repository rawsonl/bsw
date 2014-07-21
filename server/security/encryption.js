
var crypto = require('crypto');

exports.sha512 = function(text){
	var hash = crypto.createHash('sha512');

	hash.update(text);

	return hash.digest('hex');
}

exports.passwordHash = function(text){
	return exports.sha512(text);
}