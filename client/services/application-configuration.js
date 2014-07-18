var HOST = 'localhost:3000',
	LOGIN_ROUTE = '/social-login';


function service( $window, $http ){

	return {
		host: HOST,
		socialLoginRoute: LOGIN_ROUTE,
		socialLoginCallbackUri: HOST + LOGIN_ROUTE	
	}

}

angular.module('bigSexyWords.services')
	.service('applicationConfigurationService', service);

