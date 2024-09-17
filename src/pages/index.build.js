const { Remarkable } = require('remarkable');
var path = require("path");
var Mustache = require('mustache');
var jsdom = require("jsdom");
var fs = require('fs');
var hljs = require('highlight.js');

var { fixHtmlRefs, copyDir, parseTemplate } = require("../utils.js");

var header = fs.readFileSync("./src/pages/templates/header.html", 'utf8')

function buildHtml(_pageDir, _exportPath) {
	var pageDir = _pageDir + "/";
	var exportPath = _exportPath + "/";
	if (!fs.existsSync(exportPath)) {
		fs.mkdirSync(exportPath, {recursive: true});
	}
	console.log("Building Index Page");


    if (!fs.existsSync(exportPath)) {
        fs.mkdirSync(exportPath, {recursive: true});
    }
    var path = "./src/pages/index.html";
    var outpath = exportPath + "index.html";
    var templatePage = fs.readFileSync(path, 'utf8');
    var vars = {
        title: "Home",
        header: header
    };

    let html = parseTemplate(templatePage, vars);

    var dom = fixHtmlRefs(html, pageDir, _pageDir);

    //console.log(data);
    fs.writeFileSync(
        outpath,
        dom.serialize(),
        'utf8'
    );
}

module.exports = {
	buildHtml: buildHtml
}