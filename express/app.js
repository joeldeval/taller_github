var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/fotos');

var userSchemaJSON = {
	email:String,
	password:String
};

var user_schema = new Schema(userSchemaJSON);

var User = mongoose.model('User', user_schema);


app.use('/public',express.static('public')); // archivos estaticos que no cambian.. js, img, css

// leer parametros 
app.use(bodyParser.json()); // para peticiones application/json 
app.use(bodyParser.urlencoded({extended:true})); // define que algoritmo hara el parser

app.set('view engine', 'jade');


// Método Http => get / post  / PUT / patch / delete

app.get('/', function(req, res){
	res.render("index");
});

app.get('/login', function(req,res){
	User.find(function(err,doc){
		console.log(doc);
		res.render('login');

	});
});

app.post('/users', function(req,res){
	var user = new User({email: req.body.email, password: req.body.password});

	user.save(function(){
		res.send("guardamos tus datos");
	});
});

app.listen(3131);
