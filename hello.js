var http = require("http");

var manejador = function(solicitud, respuesta){
	console.log("se recibió una peticion");
	respuesta.end("holeee");
}

var servidor = http.createServer(manejador);

servidor.listen(3131);