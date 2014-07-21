var encryption = require('../security/encryption'),
	OneAll = require('../services/one-all'),
	mongoose = require('mongoose'),
	mysql = require('mysql'),
	$q = require('q');



mongoose.connect('mongodb://localhost/test');

var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user: '',
	password: '',
	database: 'test',

	connectTimeout: 5000
})

mysqlConnection.connect();

function passwordValidation(password, done){
	console.log('validating password', password);
	return done(true);
}

exports.Schema = new (mongoose.Schema)({
	id: { type: String },
	email: { type: String, required: true },
	password: { type: String, required: true, validate: passwordValidation },
	userToken: { type: String, required: false }
});

exports.Model = function(){ return mongoose.model('User', exports.Schema); }

exports.Schema.pre('save', function(next) {
	if ( true ) {
		return next();
	}
	return next('some error occured');
});

exports.Schema.post('validate', function(user){

	user.password = exports.hashPassword(user.password);
})

exports.Schema.post('save', function(user){
	console.log('user has been saved', user);
})


exports.emailExists = function(email){
	return true;
};

exports.hashPassword = function(password){
	console.log('hashing password', password);
	return encryption.passwordHash(password);
}

exports.all = function(){
	var fetchUsers = $q.defer();

	mysqlConnection.query('select * from users', function(error, rows, fields){
		if ( error ) {
			console.error('all users error', error );
			fetchUsers.reject(error);
		}
		else {
			console.log('all users', rows, fields);
			fetchUsers.resolve(rows);
		}
	})

	return fetchUsers.promise;
}

exports.create = function(userData){ //mysql

	var createNewUser = $q.defer();

	mysqlConnection.query('insert into users set ?', userData, function(error, result){
		if ( error ) { 
			console.error('error inserting user',error, userData);
			createNewUser.reject(error);
		}
		else {
			console.log('creating user', result);
			createNewUser.resolve(result);
		}
	})

	return createNewUser.promise;
}

exports.createNew = function(userData){ //mongodb
	var UserModel = exports.Model(),
		createNewUser = $q.defer();

	console.log('user data new', userData);

	UserModel.create(userData, function(error, user){
		if ( error ) { 
			console.error('error saving new user', error);
			createNewUser.reject(error);
		}
		else {
			console.log('save has been successful', user);
			createNewUser.resolve(user);
		}
	})

	return createNewUser.promise;
}

exports.findFromConnectionToken = function(connectionToken){

	console.log('finding from connection token ' , connectionToken );


	return OneAll.lookupConnectionToken(connectionToken)
		.then(exports.findBSWUserFromSocialUser, 
			function(){
				console.error('could not lookup connection token', connectionToken);
			});
}

exports.findBSWUserFromSocialUser = function(socialUser){
	console.log('finding user from social account', socialUser);

	var User = exports.Model(),
		findUser = $q.defer();

	User.find()
		.exec(function(error, results){
			if ( error ) {
				console.error('something went wrong', error);
				findUser.reject(results);
			} else {
				console.log(results);
				findUser.resolve(results);
			}
		})

	return findUser.promise;
}

