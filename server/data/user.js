var encryption = require('../security/encryption'),
	OneAll = require('../services/one-all'),
	mongoose = require('mongoose'),
	mysql = require('mysql'),
	MySQLManager = require('./mysql-manager'),
	$q = require('q');



mongoose.connect('mongodb://localhost/test');

// var mysqlConnection = mysql.createConnection({
// 	host: 'localhost',
// 	user: '',
// 	password: '',
// 	database: 'test',

// 	connectTimeout: 5000
// })

var mysqlConnection = mysql.createConnection({
	host: '181.224.136.124',
	user: 'bigsexyw_bswdb',
	password: 'CL@w642b',
	database: 'bigsexyw_bswdb',

	insecureAuth: true,

	connectTimeout: 5000
})

// mysqlConnection.connect();

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
	var UserModel = exports.Model(),
		fetchUsers = $q.defer();

	// UserModel.find()
	// 	.exec(function(error, results){
	// 		if ( error ) {
	// 			console.error('error fetching all users', error );
	// 			fetchUsers.reject(error);
	// 		} else {
	// 			console.log('all users', results);
	// 			fetchUsers.resolve(results);
	// 		}
	// 	})

	// mysqlConnection.connect();
	// mysqlConnection.query('select * from USERS', function(error, rows, fields){
	// 	if ( error ) {
	// 		fetchUsers.reject(error);
	// 	}
	// 	else {
	// 		fetchUsers.resolve(rows);
	// 	}
	// })

	MySQLManager.selectModel('USERS', {})
		.then(fetchUsers.resolve, fetchUsers.reject);

	fetchUsers.promise
		.then(function(users){
			console.log('all users', users);
		}, function(error){
			console.error('all users error', error);
		})

	return fetchUsers.promise;
}

exports.create = function(userData){ //mysql

	var UserModel = exports.Model(),
		createNewUser = $q.defer();

	UserModel.create(userData, function(error, user){
		if ( error ) createNewUser.reject(error);
		else createNewUser.resolve(user);
	})

	// mysqlConnection.query('insert into users set ?', userData, function(error, result){
	// 	if ( error ) { 
	// 		console.error('error inserting user',error, userData);
	// 		createNewUser.reject(error);
	// 	}
	// 	else {
	// 		console.log('creating user', result);
	// 		createNewUser.resolve(result);
	// 	}
	// })

	createNewUser.promise
		.then(function(user){
			console.log('created new user', user);
		}, function(error){
			console.error('create new user error', error );
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
		findUser = $q.defer(),

		conditions = {};

	conditions[socialUser.identity.provider + 'Token'] = socialUser.user_token;

	console.log('conditions', conditions);

	User.find(conditions)
		.exec(function(error, results){
			if ( error ) {
				console.error('something went wrong', error);
				findUser.reject(results);
			} else {
				console.log('finding bsw user from social user', results);
				findUser.resolve(results);
			}
		})

	return findUser.promise;
}

