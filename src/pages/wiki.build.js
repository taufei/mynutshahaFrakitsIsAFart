const { Remarkable } = require('remarkable');
var path = require("path");
var Mustache = require('mustache');
var jsdom = require("jsdom");
var fs = require('fs');
var hljs = require('highlight.js');

var { fixHtmlRefs } = require("../utils.js");

var header = fs.readFileSync("./src/pages/templates/header.html", 'utf8');

function generateSidebar(list, basePath = '', selected = null, idx = null) {
	if(!idx) {
		idx = {
			value: 0
		}
	}
	let html = '';

	list.forEach(item => {
		var parity = idx.value % 2 == 0 ? "even" : "odd";
		idx.value++;

		var visualName = item[0];
		if(item.length > 1 && item[1] != null) {
			visualName = item[1];
		}
		visualName = visualName.replace("UNFINISHED", "<span style='color: #FF0000;'>UNFINISHED</span>")
		var hasChildren = item.length > 2 && item[2] != null;
		html += `<li class="sidebar-list-item ${parity}">`;
		var href = `/${basePath}/${item[0]}.md`;
		var isSelected = href.replace(/^\/+/g, "") == selected.replace(/^\/+/g, "");

		var classAttr = isSelected ? ` class="${parity} selected"` : ` class="${parity}"`;
		html += `<a href="${href}"${classAttr}>${visualName}</a>`;

		if(hasChildren) {
			var path = item[0].split("/")[0];
			const subPath = basePath ? `${basePath}/${path}` : path;
			html += `<ul class="sidebar-unordered-list ${parity}">\n`;
			html += generateSidebar(item[2], subPath, selected, idx);
			html += `</ul>\n`;
		}
		html += `</li>\n`;
	});

	return html;
}

var wikiDir = "pages/wiki/";

var sidebarRaw = fs.readFileSync("./src/pages/wiki.json", "utf8");
var parsedSidebar = JSON.parse(sidebarRaw);

function buildHtml(_pageDir, _exportPath) {
	var pageDir = _pageDir + "wiki/";
	var exportPath = _exportPath + "wiki/";
	if (!fs.existsSync(exportPath)) {
		fs.mkdirSync(exportPath, {recursive: true});
	}
	console.log("Building Wiki");

	var templatePage = fs.readFileSync("./src/pages/wiki.html", 'utf8');
	var filenames = fs.readdirSync("./src/" + wikiDir, {recursive: true});
	var renderer = new Remarkable({
		html: true,
	});

	for (i of filenames) {
		var parsedName = path.parse(i);
		var ext = parsedName.ext;
		if (ext == "" && !fs.existsSync(exportPath + i))
			fs.mkdirSync(exportPath + i, {recursive: true});
		if (ext == ".png" || ext == ".jpg" || ext == ".jpeg" || ext == ".gif") {
			fs.copyFile("./src/" + wikiDir + i, exportPath + i, () => {});
		}
		if (ext == ".md") {
			var filename = parsedName.name;

			var sidebar = generateSidebar(parsedSidebar, "", i);

			var title = filename.replace(/\.md$/, "");
			if(title == "index") {
				title = "Home";
			}
			var vars = {
				title: title,
				content: renderer.render(fs.readFileSync("./src/" + wikiDir + i, 'utf8')),
				sidebar: sidebar,
				header: header
			};
			console.log(i);

			var html = Mustache.render(templatePage, vars, null, {
				escape: function(text) {
					return text;
				}
			});

			var dom = fixHtmlRefs(html, pageDir, _pageDir);

			//console.log(data);
			fs.writeFileSync(
				exportPath + i.replace(/\.md$/, ".html"),
				dom.serialize(),
				'utf8'
			);
		}
	}
};

module.exports = {
	buildHtml: buildHtml
}