var $q = require('q'),
	requestLibrary = require('request'),
	socialApiUrl = 'https://citizendish.api.oneall.com/',
	auth = {
		user: '5a62c4fc-6fba-4dfe-8445-2da5f1c32b0c',
		pass: '0c344ce4-c3ea-447d-8242-d28545939e40',
		// user: '',
		// pass: '',
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
				console.log('api response', apiResponse, data);
				if ( error || !!data) {
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