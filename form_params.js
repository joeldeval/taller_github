var http = require('http'),
	fs = require('fs');





http.createServer(function(req, res){

	if(req.url.indexOf("favicon.ico") > 0){ return; }



	fs.readFile("./index.html", function(err, html){
		
		var htmlString = html.toString();
		var arregloParametros = [], parametros = {};
		var nombre = "";
		var variables = htmlString.match(/[^\{\}]+(?=\})/g);
		
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

		for (var i = variables.length - 1; i >= 0; i--) {
			var variable = variables[i];

			htmlString = htmlString.replace("{"+variable+"}", parametros[variable]);
		}

		// mandamos el contenido
		res.writeHead(200,{"Content-Type":"text/html"})
		res.write(htmlString);
		res.end();
	});
	
}).listen(3131);