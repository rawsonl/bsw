function controller($scope, $filter, userProfileService){


	$scope.profile = {
		biography: '',

		userRatingsGrid: {
			data: 'profile.userRatings',
		},

		userRatings: []
	}

	userProfileService.getUserRatings()
		.then(function(results){
			console.log('received user ratings', results);
			$scope.profile.userRatings = _.map(results, function(row){
				return _.extend(row, {
					date: $filter('date')(row.date, 'short')
				})
			});
		})

}

angular.module('bigSexyWords.controllers')
	.controller('userProfileController', controller);
