const { Remarkable } = require('remarkable');
var path = require("path");
var Mustache = require('mustache');
var jsdom = require("jsdom");
var fs = require('fs');
var hljs = require('highlight.js');
var { fixHtmlRefs, htmlToString, parseTemplate } = require("../../utils.js");

var header = fs.readFileSync("./src/pages/templates/header.html", 'utf8')

const tools = [
	{
		link: "index",
		title: "Home",
		desc: "Home of the tools",
		internal: true
	},
	{
		link: "event-packer",
		title: "Event Packer",
		desc: "Tool to pack events for the engine"
	}
];

function buildHtml(_pageDir, _exportPath) {
	var pageDir = _pageDir + "tools/";
	var exportPath = _exportPath + "tools/";
	if (!fs.existsSync(exportPath)) {
		fs.mkdirSync(exportPath, {recursive: true});
	}
	console.log("Building Tools");

	var diplayTools = tools.filter(tool => !tool.internal);

	for(const tool of tools) {
		var path = "./src/pages/tools/" + tool.link + "/index.html";
		var outpath = exportPath + tool.link + "/index.html";
		if(tool.link == "index") {
			path = "./src/pages/tools/index.html";
			outpath = exportPath + "index.html";
		}

		var filePath = outpath.split("/");
		filePath.pop();
		filePath = filePath.join("/");

		if (!fs.existsSync(filePath)) {
			fs.mkdirSync(filePath, {recursive: true});
		}
		var templatePage = fs.readFileSync(path, 'utf8');
		var vars = {
			title: tool.title,
			header: header,
			tools: diplayTools
		};
		console.log(tool.link);

		let html = parseTemplate(templatePage, vars);

		var dom = fixHtmlRefs(html, pageDir, _pageDir);

		//console.log(data);
		fs.writeFileSync(
			outpath,
			htmlToString(dom),
			'utf8'
		);
	}
}

module.exports = {
	buildHtml: buildHtml
}