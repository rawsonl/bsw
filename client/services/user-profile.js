

function service( $window, $http ){

	return {
		getUserRatings: function(){
			return $http.get('/user-ratings')
				.then(function(response){
					return response.data;
				}, function(error){
					console.error('something went wrong with the user serttings', error );
				})
		}
	}

}

angular.module('bigSexyWords.services')
	.service('userProfileService', service);

