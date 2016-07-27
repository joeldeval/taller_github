var express = require('express');
var bodyParser = require('body-parser');

var app = express();

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
	res.render('login');
});

app.post('/users', function(req,res){
	console.log(req.body.password); // body es un objeto que obtiene los parametros que se envian desde la vista
	res.send("recibimos tus datos")
});

app.listen(3131);
