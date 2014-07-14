

describe('Arbitration Workflow', function(){

	var rootScope, arbitrationController;

	beforeEach(function(done){
		module('bigSexyWords');


		// setTimeout(function(){
		// 	done();
		// }, 3000);
		inject(function($rootScope, $controller){
			rootScope = $rootScope.$new();

			arbitrationController = $controller('arbitrationController', {
				'$scope': rootScope
			})

			done()
		})
	});


	describe('some process', function(){

		beforeEach(function(done){
			done();
		})


		it('can evaluate true', function(done){

			expect(true).toBeTruthy();

			done();
		})

	})



})