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

//enum
var posibles_valores = ['M', 'F'];

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email válido"];

var password_validation = {
	validator: function(p){
		return this.password_confirmation == p;
	},
	message: 'Las contraseñas no son iguales'
}

var user_schema = new Schema({
	name: String,
	last_name: String,
	username: {
		type: String,
		required: true,
		maxlength:[50, 'Usuario muy grande']
	},
	password: {
		type: String,
		minlength:[8, 'El password es muy corto'],
		validate: password_validation
	},
	age: {
		type: Number, 
		min: [5, 'La edad no puede ser menor que 5'], 
		max: [100, 'La edad no puede ser mayor que 100']
	},
	email: {
		type: String, 
		required: "El correo es obligatorio", 
		match: email_match
	},
	date_of_birth: Date,
	sex: {
		type: String, 
		enum: {
			values: posibles_valores,
			message: 'Opción no válida'
		}
	}
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
