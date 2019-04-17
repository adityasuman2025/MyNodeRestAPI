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
	app.get('/all_studs', function(req, res, err)
	{
		con.query('SELECT * FROM students', function (error, results, fields)
		{
			if(error) 
			{
				console.log(error);
				res.send({error: "database error"});
			}
			else
				res.send(results);
		});
	});

	app.get('/stud', function(req, res, err)
	{
		con.query('SELECT * FROM students WHERE roll_no = "' + req.query.roll + '"', function (error, results, fields)
		{
			if(error) 
			{
				console.log(error);
				res.send({error: "database error"});
			}
			else
				res.send(results);
		});
	});

	app.post('/add_stud', function(req, res, err)
	{
		//var query = "INSERT INTO `students` (`roll_no`, `password`, `name`) VALUES ?";
		query = "INSERT INTO `students` (";

		var value = [];

		var myobject = req.body;
		for (var key in myobject) 
		{
			query = query + "`" + key + "`, ";
			value.push(myobject[key]);
		}

		query = query.slice(0, -2);
		query = query + ") VALUES ?";

		var values = [];
		values.push(value);

		con.query(query, [values] , function(error, results, fields)
		{
			if(error) 
			{
				console.log(error);
				res.send({error: "database error"});
			}
			else
				res.send(results);
		});
	});

	app.put('/update_stud/:roll_no', function(req, res, err)
	{
		con.query('UPDATE students SET ? WHERE roll_no = "' + req.params.roll_no + '"', req.body, function (error, results, fields)
		{
			if(error) 
			{
				console.log(error);
				res.send({error: "database error"});
			}
			else
				res.send(results);
		});
	});

	app.delete('/update_stud/:roll_no', function(req, res, err)
	{
		con.query('UPDATE students SET ? WHERE roll_no = "' + req.params.roll_no + '"', req.body, function (error, results, fields)
		{
			if(error) 
			{
				console.log(error);
				res.send({error: "database error"});
			}
			else
				res.send(results);
		});
	});

//exporting this file so that it can be used at other places
	module.exports = app;
