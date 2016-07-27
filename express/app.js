var express = require('express');
var bodyParser = require('body-parser');
var User = require('./models/user').User;
var session = require('express-session');
var router_app = require('./routes_app');
var session_middleware = require('./middlewares/session');

var app = express();

app.use('/public',express.static('public')); // archivos estaticos que no cambian.. js, img, css
// leer parametros 
app.use(bodyParser.json()); // para peticiones application/json 
app.use(bodyParser.urlencoded({extended:true})); // define que algoritmo hara el parser

/* /app */
/* /  */

app.use(session({
	secret: "132dasdasuyghbjh123d",
	resave: false,
	saveUninitialized: false
}));

app.set('view engine', 'jade');


// Método Http => get / post  / PUT / patch / delete

app.get('/', function(req, res){
	console.log(req.session.user_id);
	res.render("index");
});

app.get('/signup', function(req,res){
	User.find(function(err,doc){
		console.log(doc);
		res.render('signup');

	});
});

app.get('/login', function(req,res){
	res.render('login');
});

app.post('/users', function(req,res){

	var user = new User({
						email: req.body.email, 
						password: req.body.password, 
						password_confirmation: req.body.password_confirmation,
						username: req.body.username
						});

     //prommises en vez de recibir un callback regresa una promesa
	user.save().then(function(us){
		res.send('Guardamos el usuario exitosamente');
	}, function(err){
		if(err){
			console.log(String(err));
			res.send('No pudimos guardar la información');
		}
	})
});

app.post('/sessions', function(req,res){


	User.findOne({email: req.body.email, password: req.body.password},function(err, user){
		req.session.user_id = user._id;
		res.redirect('/app');
	});

});

app.use('/app',session_middleware);
app.use('/app', router_app);

app.listen(3131);
