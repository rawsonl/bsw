var $q = require('q'),
	requestLibrary = require('request'),
	socialApiUrl = 'https://bigsexywords.api.oneall.com/',
	auth = {
		user: '7f80c397-d591-4fa8-a491-7e7ed8140e6b',
		pass: 'ae921c4a-c96b-4837-aa94-dbce805aac54',
		sendImmediately: true
	};



function getUserFromConnectionToken(connectionToken) {
	var url = (socialApiUrl + 'connections/' + connectionToken + '.json'),
		fetchUserToken = $q.defer();

	console.log('social login post', connectionToken);
	requestLibrary.get(url, {
				auth: auth
			}, 

			function(error, apiResponse, data ) {
				// console.log('api response', data);
				// console.log('api response', apiResponse, data);
				if ( error || !data) {
					return fetchUserToken.reject(error);
				}
				var jsonData = JSON.parse(data).response,
					result = jsonData.result,
					connectionData = result.data,
					user = connectionData.user;
				console.log('api response from connection token', user);

				fetchUserToken.resolve(user);
			}
		)

	return fetchUserToken.promise;
}


exports.lookupConnectionToken = getUserFromConnectionToken;