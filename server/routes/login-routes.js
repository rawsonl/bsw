
var User = require('../data/user');


exports.attachAllRoutes = function(application){

    application.post('/login', function(request, response){
        var credentials = request.body;

        User.findByCredentials(credentials)
            .then(function(user){
                console.log("returning user from credentials", user, credentials);
                response.send(user.email);
            }, function(error){
                if ( error.message == 'not-found') {
                    response.send(404);
                } else {
                    response.send(500);
                }
            })
    })

    application.post('/social-login', function(request, response){
        var oneAllData = request.body,
            connectionToken = oneAllData.connection_token

        console.log('connection token', connectionToken);

        User.findFromConnectionToken(connectionToken)
            .then(function(user){
                console.log(user);
                response.send(user);
            }, function() { response.redirect('/login') });

    })

}