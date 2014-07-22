
var encryption = require('../security/encryption'),
	User = require('../data/user');


exports.attachAllRoutes = function(application){

  	application.post('/social-registration', function(request, response){

        var oneAllData = request.body,
            connectionToken = oneAllData.connection_token;

        User.createFromConnectionToken(connectionToken)
        	.then(function(user){
        		console.log('new user from connection token', connectionToken);
        		response.send(200);
        	}, function(error){
        		console.error('error creating user from connection token', error, connectionToken);
        		response.send(500);
        	})
    })

}