var express = require('express');
var Imagen = require('./models/imagenes');
var fs = require('fs');
// rutas modulares
var router = express.Router();

var image_finder_middleware = require('./middlewares/find_image');

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

router.all('/imagenes/:id*', image_finder_middleware);

// muestra formulario para actualizar imagen
router.get('/imagenes/:id/edit', function(req,res){
	res.render('app/imagenes/edit');
});


// mostrar imagen basado en ID
router.route('/imagenes/:id')
	.get(function(req,res){
		res.render('app/imagenes/show');
	})
	.put(function(req,res){
		// edita la imágen
		if(req.files.archivo.name === ''){
			res.locals.imagen.title = req.body.title;
			res.locals.imagen.save(function(err){
				if(!err){
					res.render('app/imagenes/show');
				}else{
					res.render('app/imagenes/'+req.params.id+'/edit')
				}
			})
		}else{
			var pathActual = './public/images/' + res.locals.imagen.path;

			fs.exists(pathActual, (exists) => {
			  console.log(exists ? 'it\'s there' : 'no passwd!');
			  
			  if(exists){
			  	fs.unlink(pathActual, function(err){
		  			if (err){
		                	res.send(err);
		                	return
		                }
			  	});
			  }

			});
			var path = req.files.archivo.path;
			var newPath = './public/images/' + req.files.archivo.name;

			if (req.files.archivo.type.indexOf('image')==-1){
	                res.send('El fichero que deseas subir no es una imagen');
	    	} else {
	    		 // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
		        fs.rename(path, newPath, function(err) {
		            if (err){
		                	res.send(err);
		                	return
		                } 
			            // Eliminamos el fichero temporal
			            fs.unlink(path, function() {
			                if (err){
			                	res.send(err);
			                	return
		                } 

						res.locals.imagen.title = req.body.title;
						res.locals.imagen.path = req.files.archivo.name;
						res.locals.imagen.save(function(err){
							if(!err){
								res.render('app/imagenes/show');
							}else{
								res.render('app/imagenes/'+req.params.id+'/edit')
							}
						})
		            });
		         });
		     }
		 }

	})
	.delete(function(req,res){
		// elimina imagen
		Imagen.findOneAndRemove({_id: req.params.id}, function(err){
			if(!err){
				res.redirect('/app/imagenes');
			}else{
				console.log(err);
				res.redirect('app/imagenes/'+req.params.id)
			}
		});
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

		var path = req.files.archivo.path;
		var newPath = './public/images/' + req.files.archivo.name;

		if (req.files.archivo.type.indexOf('image')==-1){
                res.send('El fichero que deseas subir no es una imagen');
    	} else {
    		 // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
	        fs.rename(path, newPath, function(err) {
	            if (err){
	                	res.send(err);
	                	return
	                } 
		            // Eliminamos el fichero temporal
		            fs.unlink(path, function() {
		                if (err){
		                	res.send(err);
		                	return
	                } 
	                console.log('paso el error')

	                var data = {
						title: req.body.title,
						path: req.files.archivo.name
					}

					var imagen = new Imagen(data);

					imagen.save(function(err){
						if(!err){
							res.redirect('/app/imagenes/'+imagen._id);
						}else{
							res.render(err);
						}
					});
	            });
	         });
	     }

	});

module.exports = router;