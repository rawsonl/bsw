var moduleName = 'bigSexyWords',
	// applicationModules = _.map(['controllers', 'directives', 'filters', 'services'], function (name) {
	applicationModules = _.map(['controllers', 'directives', 'filters', 'services'], function (name) {
	    return "bigSexyWords." + name;
	}), 
	vendorDependencies = [], 
	// vendorDependencies = ['ui.select2', 'ui.bootstrap'], 
	angularDependencies = ['ngRoute'], 
	externalDependencies = angularDependencies.concat(vendorDependencies), 
	allDependencies = applicationModules.concat(externalDependencies);

_.each(applicationModules, function (name) {
    angular.module(name, externalDependencies);
});

var clientModule = angular.module(moduleName, allDependencies);

clientModule.config(function main($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        controller: 'customerController',
        templateUrl: '/markup/pages/customer.html'
    });
    $routeProvider.when('/customer', {
        controller: 'customerController',
        templateUrl: '/markup/pages/customer.html'
    });

    $routeProvider.when('/writer', {
        controller: 'writerController',
        templateUrl: '/markup/pages/writer.html'
    });

    $routeProvider.when('/arbitration', {
        controller: 'arbitrationController',
        templateUrl: '/markup/pages/arbitration.html'
    });

    $routeProvider.when('/registration', {
        controller: 'registrationController',
        templateUrl: '/markup/pages/registration.html'
    });

    $routeProvider.when('/userprofile', {
        controller: 'userprofileController',
        templateUrl: '/markup/pages/userprofile.html'
    });

    $routeProvider.otherwise({ redirectTo: '/' });

});

