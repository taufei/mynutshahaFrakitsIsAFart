const { Remarkable } = require('remarkable');
var path = require("path");
var Mustache = require('mustache');
var jsdom = require("jsdom");
var fs = require('fs');
var hljs = require('highlight.js');

var header = fs.readFileSync("./src/pages/templates/header.html", 'utf8');

function generateSidebar(list, basePath = '', selected = null) {
	let html = '';

	list.forEach(item => {
		var visualName = item[0];
		if(item.length > 1 && item[1] != null) {
			visualName = item[1];
		}
		var hasChildren = item.length > 2 && item[2] != null;
		html += `<li class="sidebar-list-item">`;
		var href = `/${basePath}/${item[0]}.md`;
		var isSelected = href.replace(/^\/+/g, "") == selected.replace(/^\/+/g, "");

		var classAttr = isSelected ? ` class="selected"` : "";
		html += `<a href="${href}"${classAttr}>${visualName}</a>`;

		if(hasChildren) {
			var path = item[0].split("/")[0];
			const subPath = basePath ? `${basePath}/${path}` : path;
			html += `<ul class="sidebar-unordered-list">\n`;
			html += generateSidebar(item[2], subPath, selected);
			html += `</ul>\n`;
		}
		html += `</li>\n`;
	});

	return html;
}

var wikiDir = "docs/";

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
			var vars = {
				title: filename.replace(".md", ""),
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

			var dom = new jsdom.JSDOM(html);
			var links = dom.window.document.querySelectorAll("[href]");
			var imageSrcs = dom.window.document.querySelectorAll("[src]");

			for(const link of links) {
				//path.normalize(path.parse(i).dir + "/" + link.href);
				link.href = link.href.replace(/.md$/, ".html").replace("./" + wikiDir, "./");
				if(link.href.startsWith("/")) {
					link.href = path.normalize("/" + pageDir + link.href.substring(1));
				}/* else {
					if(!link.href.startsWith("./")) {
						link.href = "/" + path.normalize("./" + exportPath + link.href);
					}
				}*/

				if(link.href.startsWith("root/")) {
					link.href = path.normalize("/" + _pageDir + link.href.substring(5));
				}
			}

			for(const image of imageSrcs) {
				image.src = image.src.replace(/.md$/, ".html").replace("./" + wikiDir, "./");
				if(image.src.startsWith("/")) {
					image.src = path.normalize("/" + _pageDir + image.src.substring(1));
				}/* else {
					if(!image.src.startsWith("./")) {
						image.src = "/" + path.normalize("./" + exportPath + image.src);
					}
				}*/
			}

			var codeblocks = dom.window.document.querySelectorAll('pre code[class^="language-"]');
			for(const codeblock of codeblocks) {
				codeblock.innerHTML = hljs.highlight(codeblock.textContent, {language: codeblock.className.split("-")[1]}).value;
				codeblock.parentElement.classList.add("hljs");
			}

			// select all non hljs codeblocks
			var inlineCodeblocks = dom.window.document.querySelectorAll('code:not([class^="language-"])');
			for(const codeblock of inlineCodeblocks) {
				codeblock.classList.add("inline-code");
			}

			var inlineCodeblocks = dom.window.document.querySelectorAll('pre code:not([class^="language-"])');
			for(const codeblock of inlineCodeblocks) {
				codeblock.parentElement.classList.add("inline-code");
			}

			//console.log(data);
			fs.writeFileSync(
				exportPath + i.replace(".md", ".html"),
				dom.serialize(),
				'utf8'
			);
		}
	}
};

module.exports = {
	buildHtml: buildHtml
}