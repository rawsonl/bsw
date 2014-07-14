

describe('Writer Workflow', function(){

	var rootScope, writerController;

	beforeEach(function(done){
		module('bigSexyWords');


		// setTimeout(function(){
		// 	done();
		// }, 3000);
		inject(function($rootScope, $controller){
			rootScope = $rootScope.$new();

			writerController = $controller('writerController', {
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