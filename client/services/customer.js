

function service( $window, $http ){

	return {
		action: function(){
			console.log('acting');
		}
	}

}

angular.module('bigSexyWords.services')
	.service('customerService', service);

