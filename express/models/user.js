var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
	String 
	Number
	Date
	Buffer
	Boolean
	Mixed
	Objectid
	Array
*/

// creación de schema despues sigue e modelo
var user_schema = new Schema({
	name: String,
	username: String,
	password: String,
	age: Number,
	email: String,
	date_of_birth: Date
});




