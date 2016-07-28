var express = require('express');
var Imagen = require('./models/imagenes');
// rutas modulares
var router = express.Router();

/* app.com/app/  */

router.get('/', function(req, res){
	/* buscar el usuario */
	
	res.render('app/home')
});

/* REST */

// muestra formulario para subir imagen
router.get('/imagenes/new', function(req,res){
	res.render('app/imagenes/new')
});

// muestra formulario para actualizar imagen
router.get('/imagenes/:id/edit', function(req,res){
	Imagen.findById(req.params.id, function(err, imagen){
			res.render('app/imagenes/edit', {imagen: imagen});
		});
});


// mostrar imagen basado en ID
router.route('/imagenes/:id')
	.get(function(req,res){

		Imagen.findById(req.params.id, function(err, imagen){
			res.render('app/imagenes/show', {imagen: imagen});
		});

	})
	.put(function(req,res){

		Imagen.findById(req.params.id, function(err, imagen){
			imagen.title = req.body.title;
			imagen.save(function(err){
				if(!err){
					res.render('app/imagenes/show', {imagen: imagen});
				}else{
					res.render('app/imagenes/'+imagen.id+'/edit', {imagen: imagen})
				}
			})

		});

	})
	.delete(function(req,res){

	});

// collection de imagenes
router.route('/imagenes')
	.get(function(req,res){ // obtener todas imagenes
		Imagen.find({}, function(err, imagenes){
			if(err){
				res.redirect('/app'); return;
			}
			res.render('app/imagenes/index', {imagenes: imagenes})
		});
	})
	.post(function(req,res){ // crea una imagen
		var data = {
			title: req.body.title
		}

		var imagen = new Imagen(data);

		imagen.save(function(err){
			if(!err){
				res.redirect('app/imagenes/'+imagen._id);
			}else{
				res.render(err);
			}
		});
	});

module.exports = router;