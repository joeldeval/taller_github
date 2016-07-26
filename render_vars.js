var http = require('http'),
	fs = require('fs');





http.createServer(function(req, res){

	fs.readFile("./index.html", function(err, html){
		// convertimos el archivo binatio a string
		var htmlString = html.toString();

		// expresiones regulares
		var variables = htmlString.match(/[^\{\}]+(?=\})/g);
		var nombre = "Bioxor";

		// variable ['nombre']
		for (var i = variables.length - 1; i >= 0; i--) {
			// lo ejecutamos como código de js
			// para obtener el valor de dicha variable
			var value = eval(variables[i]);


			// reemplaza contenido con llaves por su valor correspondiente
			htmlString = htmlString.replace("{"+variables[i]+"}", value)
		}

		// mandamos el contenido
		res.writeHead(200,{"Content-Type":"text/html"})
		res.write(htmlString);
		res.end();
	});
	
}).listen(3131);