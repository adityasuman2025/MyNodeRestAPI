var express = require('express');

var app = express();

//mysql databse connection
	var mysql = require('mysql');

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database : 'qr_attendance'
	});

	con.connect();

//routes
	app.get('/', function(req, res, err)
	{
		con.query('SELECT * FROM students', function (err, results, fields)
		{
			//if (error) throw error;
			res.send(results);
		});
	});

//exporting this file so that it can be used at other places
	module.exports = app;
