const { Remarkable } = require('remarkable');
var path = require("path");
var Mustache = require('mustache');
var jsdom = require("jsdom");
var fs = require('fs');
var hljs = require('highlight.js');

var { fixHtmlRefs, copyDir } = require("../utils.js");
var header = fs.readFileSync("./src/pages/templates/header.html", 'utf8')

function buildHtml(_pageDir, _exportPath) {
	var pageDir = _pageDir + "api-docs/";
	var exportPath = _exportPath + "api-docs/";
	if (!fs.existsSync(exportPath)) {
		fs.mkdirSync(exportPath, {recursive: true});
	}
	console.log("Building Api Docs");

	copyDir("./src/pages/api-docs/", exportPath);
}

module.exports = {
	buildHtml: buildHtml
}