var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/fotos');


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
// validacion en schema nivel modelo
var user_schema = new Schema({
	name: String,
	username: String,
	password: String,
	age: Number,
	email: String,
	date_of_birth: Date
});

// los virtual no se guardan en la base de datos se usan para validaciones
user_schema.virtual('password_confirmation').get(function(){ // establecer la forma como se accede a un atributo
	return this.p_c;
}).set(function(password){ // asignar valor al atributo
	this.p_c = password;
});


// se crea un modelo y mapea una conexion a mongoDB
// y crea una collection llamada USERS en plural
var User = mongoose.model('User', user_schema);

module.exports.User = User;
