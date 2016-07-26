function parse(req){
	var arregloParametros = [], parametros = {};


	if(req.url.indexOf('?') > 0){
	   		// /?nombre=Joel => ['/', 'nombre=Joel&data=algo']
	   		var urlDatos = req.url.split('?');
	   		var arregloParametros = urlDatos[1].split('&');
	   		// [nombre=Joel,data=algo]
    }	

    for(var i = arregloParametros.length - 1; i >= 0; i--){
   		var parametro = arregloParametros[i];
   		// nombre=Joel
   		var paramData = parametro.split('=');
   		// [nombre,joel]

   		parametros[paramData[0]] = paramData[1];
   		// {nombre: joel}

    }

	return parametros;
}

module.exports.parse = parse;