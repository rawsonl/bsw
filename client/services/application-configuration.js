var HOST = 'localhost:3000',
	REGISTRATION_ROUTE = '/social-registration',
	LOGIN_ROUTE = '/social-login';


function service( $window, $http ){

	return {
		host: HOST,
		socialRegistrationRoute: REGISTRATION_ROUTE,
		socialLoginRoute: LOGIN_ROUTE,
		socialRegistrationCallbackUri: HOST + REGISTRATION_ROUTE,
		socialLoginCallbackUri: HOST + LOGIN_ROUTE	
	}

}

angular.module('bigSexyWords.services')
	.service('applicationConfigurationService', service);

