var fs = require('fs');
const { Remarkable } = require('remarkable');
var path = require("path");
var Mustache = require('mustache');
var jsdom = require("jsdom");
var hljs = require('highlight.js');
var haxeformat = require('./haxeformat.js');

hljs.registerLanguage('haxe', haxeformat);

var docsPath = process.argv[2] || 'docs/';
var realPath = process.argv[3] || 'docs/';

if(!docsPath.endsWith('/')) {
	docsPath += '/';
}

if (!fs.existsSync("./export/" + realPath)) {
	fs.mkdirSync("./export/" + realPath, {recursive: true});
}

function generateSidebar(list, basePath = '') {
    let html = '';

    list.forEach(item => {
        if (item.length == 1) {
			item = item[0];
            const filePath = basePath ? `/${basePath}/${item}.html` : `/${item}.html`;
            html += `<li class="sidebar-list-item"><a href="${filePath}">${item.replace(" or ", "/")}</a></li>\n`;
        } else if (item.length == 2) {
            const [title, children] = item;
            const subPath = basePath ? `${basePath}/${title}` : title;

            html += `<li class="sidebar-list-item"><a href="/${subPath}/index.html">${title.replace(" or ", "/")}</a>\n<ul class="sidebar-unordered-list">\n`;
            html += generateSidebar(children, subPath);
            html += `</ul>\n</li>\n`;
        }
    });

    return html;
}

var sidebarRaw = fs.readFileSync("./src/list.json", "utf8");
var sidebar = generateSidebar(JSON.parse(sidebarRaw));

fs.copyFileSync("./src/style.css", "./export/" + realPath + "style.css");

buildHtml();
function buildHtml() {
	var templatePage = fs.readFileSync("./src/templates/page.html", 'utf8');
	var filenames = fs.readdirSync("./src/docs", {recursive: true});
	var renderer = new Remarkable({
		html: true,
	});

	for (i of filenames) {
		var parsedName = path.parse(i);
		var ext = parsedName.ext;
		console.log(i);
		if (ext == "" && !fs.existsSync("./export/" + realPath + i))
			fs.mkdirSync("./export/" + realPath + i, {recursive: true});
		if (ext == ".png" || ext == ".jpg" || ext == ".jpeg" || ext == ".gif") {
			fs.copyFile("./src/docs/" + i, "./export/" + realPath + i, () => {});
		}
		if (ext == ".md") {
			var filename = parsedName.name;
			var vars = {
				title: filename.replace(".md", ""),
				content: renderer.render(fs.readFileSync("./src/docs/" + i, 'utf8')),
				sidebar: sidebar
			};

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
				link.href = link.href.replace(/.md$/, ".html").replace("./docs/", "./");
				if(link.href.startsWith("/")) {
					link.href = path.normalize("/" + docsPath + link.href.substring(1));
				}/* else {
					if(!link.href.startsWith("./")) {
						link.href = "/" + path.normalize("./" + realPath + link.href);
					}
				}*/
			}

			for(const image of imageSrcs) {
				image.src = image.src.replace(/.md$/, ".html").replace("./docs/", "./");
				if(image.src.startsWith("/")) {
					image.src = path.normalize("/" + docsPath + image.src.substring(1));
				}/* else {
					if(!image.src.startsWith("./")) {
						image.src = "/" + path.normalize("./" + realPath + image.src);
					}
				}*/
			}

			var codeblocks = dom.window.document.querySelectorAll('pre code[class^="language-"]');
			for(const codeblock of codeblocks) {
				codeblock.innerHTML = hljs.highlight(codeblock.textContent, {language: codeblock.className.split("-")[1]}).value;
				codeblock.parentElement.classList.add("hljs");
			}

			//console.log(data);
			fs.writeFileSync(
				"./export/" + realPath + i.replace(".md", ".html"),
				dom.serialize(),
				'utf8'
			);
		}
	}
};
