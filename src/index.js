var fs = require('fs');
var hljs = require('highlight.js');
var haxeformat = require('./haxeformat.js');
var wiki = require('./pages/wiki.build.js');
var tools = require('./pages/tools/tools.build.js');
var docs = require('./pages/docs.build.js');

hljs.registerLanguage('haxe', haxeformat);

var pageDir = process.argv[2] || "";
var exportPath = "./export/" + (process.argv[3] || '');

if(!pageDir.endsWith('/')) pageDir += '/';

if (!fs.existsSync(exportPath)) {
	fs.mkdirSync(exportPath, {recursive: true});
}

fs.copyFileSync("./src/style.css", exportPath + "style.css");
fs.copyFileSync("./src/pages/wiki.css", exportPath + "/wiki.css");

wiki.buildHtml(pageDir, exportPath); // builds into /wiki
tools.buildHtml(pageDir, exportPath); // builds into /tools
docs.buildHtml(pageDir, exportPath); // builds into /docs