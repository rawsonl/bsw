

function directive( ){


	function link($scope, $element, $attributes) {

		


	}

	return {
		restrict: 'E',

		link: link,
		scope: {
			stages: '=',
			currentStage: '='
		},

		templateUrl: '/components/progress-bar.html',
		replace: true
	}
	

}

angular.module('bigSexyWords.directives')
	.directive('progressBar', directive);

