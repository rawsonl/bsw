var PORT = process.env.PORT || 3000;

var express = require('express'),
	_ = require('underscore'),
	path = require('path'),
	http = require('http'),

	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser');

var expressApplication = express();


function setupApplication(application){


	var server = http.createServer(application);

    // application.use(express.cookieParser());
    application.use(bodyParser.urlencoded({ extended: true }));
    application.use(bodyParser.json());
    application.use(cookieParser('secret-string'));
	application.use(express.static(path.join(__dirname, '..')));
    // application.use(express.methodOverride());

    // application.use(express.session({
    //     secret: 'loLC@tzzZ'
    // }));

    server.listen(PORT, function(){
    	console.log('server listening on port - ', PORT);
    });

    setupRoutes(application);

}

function setupRoutes(application){

    var User = require('./data/user');

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

    application.get('/users', function(request, response){
        User.all()
            .then(function(users){
                console.log('found users', users);
                response.send(users);
            }, function(error){ response.send(500);});
        // User.findBSWUserFromSocialUser({})
        //     .then(function(user){
        //         console.log('responding with user', user);
        //         response.send(user);
        //     }, function(error){
        //         console.error('error occured while searching for bsw user', socialUser, error );
        //         response.send(500);
        //     })
    })

    application.post('/users', function(request, response){
        // User.createNew(request.body)
        User.create(request.body)
            .then(function(user){ response.send(user);},
                    function(error){ response.send(500);})
    })

	application.get(/\/[\w\/\-]*$/, function(request, response){
        response.sendfile(path.join(__dirname, '..', 'index.html'));
	})

}

exports.startup = function(){
	setupApplication(expressApplication);
}