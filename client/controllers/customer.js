

function controller($scope){


	this.newWorkflow = function(){
		return { 
			stage: 'initial'
		};
	}

	this.getStage = function(){
		return $scope.workflow.stage;
	}

	this.setStage = function(stage){
		$scope.workflow.stage = stage;
	}

	this.advanceStage = function(requirements) {
		return this.getStage();
	}

	if ( !$scope.workflow ) $scope.workflow = this.newWorkflow();

}

angular.module('bigSexyWords.controllers')
	.controller('customerController', controller);

