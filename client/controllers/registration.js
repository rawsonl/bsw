

function controller($scope, oneAllService, $window){


	$scope.user = {
		type: 'customer',
		email: ''
	};

	$scope.messages = {
		userType: 'are you a writer or a customer',
		loginType: 'are you going to login with email or social'
	}

	$scope.register = function(){
		alert(JSON.stringify($scope.user));
	}

	$scope.$watch('user.type', function(userType){
		console.log('user type changed', userType);
	})

	setTimeout(function(){
		oneAllService.setupSocialLogin('one-all');
		console.log('_oneall', $window._oneall, window._oneall);
	}, 1000);


}

angular.module('bigSexyWords.controllers')
	.controller('registrationController', controller);

