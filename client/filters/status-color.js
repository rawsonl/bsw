

function filter( ){

	return function(input){
		return '';
	}

}

angular.module('bigSexyWords.filters')
	.filter('statusColor', filter);

