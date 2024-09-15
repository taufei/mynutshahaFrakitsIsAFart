var fs = require('fs');
var hljs = require('highlight.js');
var haxeformat = require('./haxeformat.js');
var wiki = require('./pages/wiki.build.js');
var tools = require('./pages/tools/tools.build.js');
var apiDocs = require('./pages/apiDocs.build.js');
var indexPage = require('./pages/index.build.js');

var { copyDir } = require('./utils.js');

hljs.registerLanguage('haxe', haxeformat);

var pageDir = process.argv[2] || "";
var exportPath = "./export/" + (process.argv[3] || '');

if(!pageDir.endsWith('/')) pageDir += '/';

if (!fs.existsSync(exportPath)) {
	fs.mkdirSync(exportPath, {recursive: true});
}

copyDir("./src/img/", exportPath + "/img/");

fs.copyFileSync("./src/style.css", exportPath + "style.css");
fs.copyFileSync("./src/pages/wiki.css", exportPath + "/wiki.css");
fs.copyFileSync("./src/pages/index.css", exportPath + "/index.css");

indexPage.buildHtml(pageDir, exportPath); // builds into /
wiki.buildHtml(pageDir, exportPath); // builds into /wiki
tools.buildHtml(pageDir, exportPath); // builds into /tools
apiDocs.buildHtml(pageDir, exportPath); // builds into /api-docs