var encryption = require('../security/encryption'),
	mysql = require('mysql'),
	_ = require('underscore'),
	$q = require('q');



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

function modelRow(row, fields){
	console.log('modeling row', row, fields);

	return row;
}


exports.selectModel = function(name, conditions) {
	var selectQuery = $q.defer();

	mysqlConnection.connect();

	mysqlConnection.query('SELECT * from ' + name, function(error, rows, fields){
		if ( error ) { 
			console.error('error selecting model', error );
			selectQuery.reject(error);
		} else {
			console.log('select successful', rows.length, fields);
			var modeledData = _.map(rows, function(row){ 
				return modelRow(row, fields);
			});
			selectQuery.resolve(modeledData);
		}
	})

	return selectQuery.promise;
}