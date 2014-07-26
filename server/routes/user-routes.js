
var User = require('../data/user');


exports.attachAllRoutes = function(application){

	application.get('/users', function(request, response){
		User.all()
			.then(function(users){
                // console.log('found users', users);
				response.send(users);
			}, function(error){
				console.error('found all users', error);
				response.send(500);
			})
	})

    application.post('/users', function(request, response){
        User.create(request.body)
            .then(function(user){ 
                response.send(user);
            }, function(error){ 
                response.send(500);
            })
    })

    application.get('/user-ratings', function(request, response){
    	response.send([
			{ stars: '0', comments: 'item 1', date: new Date() },
			{ stars: '4', comments: 'numero 2', date: new Date() },
			{ stars: '2', comments: '', date: new Date() },
			{ stars: '5', comments: '', date: new Date() },
		])
    })

}