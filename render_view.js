function render(html,parametros){

	var htmlString = html.toString();
	var variables = htmlString.match(/[^\{\}]+(?=\})/g);

	for (var i = variables.length - 1; i >= 0; i--) {
		var variable = variables[i];

		htmlString = htmlString.replace("{"+variable+"}", parametros[variable]);
	}
	return htmlString;
}

module.exports.render = render;