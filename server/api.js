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
    application.use(bodyParser.urlencoded());
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

    application.post('/social-login', function(request, response){
        var oneAllData = request.body,
            connectionToken = oneAllData.connection_token;

        console.log('connection token', connectionToken);

        response.redirect('/customer');
    })

	application.get(/\/[\w\/\-]*$/, function(request, response){
        response.sendfile(path.join(__dirname, '..', 'index.html'));
	})

}

exports.startup = function(){
	setupApplication(expressApplication);
}