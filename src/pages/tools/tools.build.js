const { Remarkable } = require('remarkable');
var path = require("path");
var Mustache = require('mustache');
var jsdom = require("jsdom");
var fs = require('fs');
var hljs = require('highlight.js');
var { fixHtmlRefs } = require("../../utils.js");

var header = fs.readFileSync("./src/pages/templates/header.html", 'utf8')

function buildHtml(_pageDir, _exportPath) {
	var pageDir = _pageDir + "tools/";
	var exportPath = _exportPath + "tools/";
	if (!fs.existsSync(exportPath)) {
		fs.mkdirSync(exportPath, {recursive: true});
	}
	console.log("Building Tools");

	var tools = [
		"event-packer"
	];

	for(const tool of tools) {
		if (!fs.existsSync(exportPath + tool)) {
			fs.mkdirSync(exportPath + tool, {recursive: true});
		}
		var templatePage = fs.readFileSync("./src/pages/tools/" + tool + "/index.html", 'utf8');
		var vars = {
			title: tool,
			header: header
		};
		console.log(tool);

		var html = Mustache.render(templatePage, vars, null, {
			escape: function(text) {
				return text;
			}
		});

		var dom = fixHtmlRefs(html, pageDir, _pageDir);

		//console.log(data);
		fs.writeFileSync(
			exportPath + tool + "/index.html",
			dom.serialize(),
			'utf8'
		);
	}
}

module.exports = {
	buildHtml: buildHtml
}