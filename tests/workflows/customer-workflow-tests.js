

describe('Customer Workflow', function(){

	var rootScope, customerController;

	beforeEach(function(done){
		module('bigSexyWords');


		// setTimeout(function(){
		// 	done();
		// }, 3000);
		inject(function($rootScope, $controller){
			rootScope = $rootScope.$new();

			customerController = $controller('customerController', {
				'$scope': rootScope
			})

			done()
		})
	});


	describe('project preparation', function(){

		beforeEach(function(done){

			done();
		})


		it ( 'begins with an initial stage', function(done){
			var workflow = customerController.newWorkflow(),
				workflowStage = customerController.getStage();

			expect(workflowStage).toEqual('initial');
			done();
		})

		// it ( 'advances to validate project from initial stage when is NOT recurring', function(done){

		// 	var workflow = customerController.newWorkflow(),
		// 		newWorkflowStage = customerController.getStage(),
		// 		advancedStage = customerController.advanceStage({ isRecurring: false });


		// 	expect(newWorkflowStage).toEqual('initial');
		// 	expect(advancedStage).toEqual('validateProject');

		// 	done();

		// })

		// it ( 'advances to validate project from initial stage when is recurring', function(done){

		// 	var workflow = customerController.newWorkflow(),
		// 		newWorkflowStage = customerController.getStage(),
		// 		advancedStage = customerController.advanceStage({ isRecurring: true });


		// 	expect(newWorkflowStage).toEqual('initial');
		// 	expect(advancedStage).toEqual('validateProject');

		// 	done();

		// })
	})

	describe('project start validation', function(){

		var workflow;

		beforeEach( function(done){

			workflow = customerController.newWorkflow();

			customerController.setStage('validateProject');

			done();
		})

		it ( 'begins with validateProject stage', function(done){
			var currentStage = customerController.getStage();

			expect(currentStage).toEqual('validateProject');

			done();
		})

		it ( 'advances to validateProject if is not valid', function(done){
			var currentStage = customerController.getStage(),
				advancedStaged = customerController.advanceStage({ });

			expect(currentStage).toEqual('validateProject');
			expect(advancedStaged).toEqual('validateProject');

			done();
		})

		// it ( 'advances to escrowCollection if is valid', function(done){
		// 	var currentStage = customerController.getStage(),
		// 		advancedStaged = customerController.advanceStage({ isRecurring: false, someProperty: true });

		// 	expect(currentStage).toEqual('validateProject');
		// 	expect(advancedStaged).toEqual('escrowCollection');

		// 	done();
		// })
	})




})