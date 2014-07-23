var encryption = require('../security/encryption'),
	OneAll = require('../services/one-all'),
	mongoose = require('mongoose'),
	mysql = require('mysql'),
	MySQLManager = require('./mysql-manager'),
	_ = require('underscore'),
	$q = require('q');



mongoose.connect('mongodb://localhost/test');

function passwordValidation(password, done){
	console.log('validating password', password);
	return done(true);
}

function getSocialEmail(socialUser){
	var identity = socialUser.identity,
		provider = identity.provider,
		email = '';

	console.log('finding social email', identity, provider, email, ' =--=')

	if ( ['linkedin', 'facebook', 'twitter'].indexOf(provider) != -1 ) {
		var verifiedEmails = _.findWhere(identity.emails, { is_verified: true });

		email = verifiedEmails ? 
			_.first(verifiedEmails).value
			: _.first(identity.emails).value ;
	}

	console.log('found', email, '==--=')

	return email;
}

exports.Schema = new (mongoose.Schema)({
	id: { type: String },
	email: { type: String, required: false },
	password: { type: String, required: false, validate: passwordValidation },
	linkedinToken: { type: String, required: false },
	facebookToken: { type: String, required: false },
	twitterToken: { type: String, required: false },
});

exports.Model = function(){ return mongoose.model('User', exports.Schema); }

exports.Schema.pre('save', function(next) {
	if ( true ) {
		return next();
	}
	return next('some error occured');
});

exports.Schema.post('validate', function(user){
	if ( !user.password || user.password == '' ) return false;
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

	UserModel.find()
		.exec(function(error, results){
			if ( error ) {
				console.error('error fetching all users', error );
				fetchUsers.reject(error);
			} else {
				console.log('all users', results);
				fetchUsers.resolve(results);
			}
		})

	// MySQLManager.selectModel('Users', {})
	// 	.then(fetchUsers.resolve, fetchUsers.reject);

	fetchUsers.promise
		.then(function(users){
			console.log('all users', users);
			return users;
		}, function(error){
			console.error('all users error', error);
			return error;
		})

	return fetchUsers.promise;
}

exports.create = function(userData){ 

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
			return user;
		}, function(error){
			console.error('create new user error', error );
			return error;
		})

	return createNewUser.promise;
}

exports.createFromConnectionToken = function(connectionToken){
	return OneAll.lookupConnectionToken(connectionToken)
		.then(exports.createFromSocialUser);
}

exports.createFromSocialUser = function(socialUser) {
	var socialEmail = getSocialEmail(socialUser),
		bswUser = {
			email: socialEmail
		};

	bswUser[socialUser.identity.provider + 'Token'] = socialUser.user_token;

	return exports.create(bswUser);

}

exports.findByCredentials = function(credentials){
	var findUser = $q.defer(),
		User = exports.Model();

	if ( !!credentials && credentials.email && credentials.password ) {
		var hashedCredentials = {
			email: credentials.email,
			password: exports.hashPassword(credentials.password)
		};
		User.find(hashedCredentials)
			.exec(function(error, results){
				if ( error ) {
					findUser.reject(error);
				} else if (results.length == 0 ){
					findUser.reject({ message: 'not-found'})
				} 
				else {
					var user = results[0];
					findUser.resolve(user);
				}
			})
	} else {
		findUser.reject(false);
	}
	return findUser.promise;
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

exports.linkBSWUserWithSocialUser = function(bswUser, socialUser){
	var User = exports.Model(),
		linkUsers = $q.defer(),
		socialToken = {};

	socialToken[socialUser.identity.provider + 'Token'] = socialUser.user_token;

	User.update(bswUser, _.extend(bswUser, socialToken ))
		.exec(function(error, results){
			if ( error ) {
				console.error('something went wrong linking users', error );
				linkUsers.reject(error);
			} else {
				console.log('finished linking bsw user with social token', results);
				linkUsers.resolve(results);
			}
		})

	return linkUsers.promise;
}

