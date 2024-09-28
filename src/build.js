var fs = require('fs');
var hljs = require('highlight.js');
var haxeformat = require('./haxeformat.js');
var wiki = require('./pages/wiki.build.js');
var tools = require('./pages/tools/tools.build.js');
var apiDocs = require('./pages/apiDocs.build.js');
var indexPage = require('./pages/index.build.js');
var featuredMods = require('./pages/featuredMods.build.js');

var { copyDir, compileSass } = require('./utils.js');

hljs.registerLanguage('haxe', haxeformat);

var pageDir = process.argv[2] || "./";
var exportPath = "./export/" + (process.argv[3] || '');

if(!pageDir.endsWith('/')) pageDir += '/';

if (!fs.existsSync(exportPath)) {
	fs.mkdirSync(exportPath, {recursive: true});
}


console.log("Building pages...");

copyDir("./src/img/", exportPath + "/img/");

compileSass("./src/style.scss", exportPath + "/style.css");
compileSass("./src/pages/wiki.scss", exportPath + "/wiki.css");
compileSass("./src/pages/index.scss", exportPath + "/index.css");
compileSass("./src/pages/featuredMods.scss", exportPath + "/featuredMods.css");
compileSass("./src/giscus-theme.scss", exportPath + "/giscus-theme.css");

indexPage.buildHtml(pageDir, exportPath); // builds into /
wiki.buildHtml(pageDir, exportPath); // builds into /wiki
tools.buildHtml(pageDir, exportPath); // builds into /tools
featuredMods.buildHtml(pageDir, exportPath); // builds into /featuredMods
apiDocs.buildHtml(pageDir, exportPath); // builds into /api-docs

console.log("Build completed.");