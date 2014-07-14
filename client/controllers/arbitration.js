

function controller($scope){

	function getStatus(){
		return $scope.arbitration.status;
	}

	this.newArbitration = function(){
		return {
			status: 'unresolved',
		}
	}


	this.getStatus = function(){
		return getStatus();
	}

	this.resolve = function(){
		console.log('resolving');
		$scope.arbitration.status = 'resolved';
	}

	if (! $scope.arbitration ) {
		$scope.arbitration = this.newArbitration();
	}

}

angular.module('bigSexyWords.controllers')
	.controller('arbitrationController', controller);

