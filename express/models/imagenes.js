var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost:27017/fotos');

var img_schema = new Schema({
	title:{type:String, required:true}

});

var Imagen = mongoose.model('Imagen', img_schema);

module.exports = Imagen;