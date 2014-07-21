

function service( $window, $http, applicationConfigurationService ){

	return {
		setupSocialLogin: function(domID){
			var _oneall = $window._oneall || [],
				callbackUri = applicationConfigurationService.socialLoginCallbackUri;


			_oneall.push(['social_login', 'set_callback_uri', '//' + callbackUri]);
			_oneall.push(['social_login', 'set_providers', ['facebook', 'google', 'linkedin', 'twitter']]);
			_oneall.push(['social_login', 'do_render_ui', domID]);

		}
	}

}

angular.module('bigSexyWords.services')
	.service('oneAllService', service);

