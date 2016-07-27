var express = require('express');

// rutas modulares
var router = express.Router();

/* app.com/app/  */
router.get('/', function(req, res){
	/* buscar el usuario */
	
	res.render('app/home')
});


module.exports = router;