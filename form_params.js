var http = require('http'),
	fs = require('fs'),
	parser = require('./paramsParser.js'),
	render = require('./render_view.js');

var p = parser.parse;
var ren = render.render;

http.createServer(function(req, res){

	if(req.url.indexOf("favicon.ico") > 0){ return; }


	fs.readFile("./index.html", function(err, html){
		
		var nombre = "";
		
		var parametros = p(req);
	   
		

		// mandamos el contenido
		res.writeHead(200,{"Content-Type":"text/html"})
		res.write(ren(html, parametros));
		res.end();
	});
	
}).listen(3131);