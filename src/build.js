var fs = require('fs');
var hljs = require('highlight.js');
var haxeformat = require('./haxeformat.js');
var wiki = require('./pages/wiki.build.js');
var tools = require('./pages/tools/tools.build.js');
var apiDocs = require('./pages/apiDocs.build.js');
var indexPage = require('./pages/index.build.js');

var { copyDir, fixHtmlRefs, parseTemplate } = require('./utils.js');

var isFullBuild = process.argv.includes('--full');
process.argv = process.argv.filter(arg => arg != '--full');

var isWatch = process.argv.includes('--watch');
process.argv = process.argv.filter(arg => arg != '--watch');

var isFirstRun = process.argv.includes('--first-run');
process.argv = process.argv.filter(arg => arg != '--first-run');

hljs.registerLanguage('haxe', haxeformat);

var pageDir = process.argv[2] || "";
var exportPath = "./export/" + (process.argv[3] || '');

if(!pageDir.endsWith('/')) pageDir += '/';
if(!exportPath.endsWith('/')) exportPath += '/';

if (!fs.existsSync(exportPath)) {
	fs.mkdirSync(exportPath, {recursive: true});
}


console.log("Building pages...");

copyDir("./src/img/", exportPath + "/img/");

fs.copyFileSync("./src/style.css", exportPath + "/style.css");
fs.copyFileSync("./src/pages/wiki.css", exportPath + "/wiki.css");
fs.copyFileSync("./src/pages/index.css", exportPath + "/index.css");
fs.copyFileSync("./src/pages/api-docs.css", exportPath + "/api-docs.css");

indexPage.buildHtml(pageDir, exportPath); // builds into /
wiki.buildHtml(pageDir, exportPath); // builds into /wiki
tools.buildHtml(pageDir, exportPath); // builds into /tools
if(isFirstRun) {
	if(isFullBuild) {
		apiDocs.buildHtml(pageDir, exportPath, isWatch); // builds into /api-docs
	} else {
		console.log("Skipping API Docs build (not full build)...");
		apiDocs.buildNotBuilt(pageDir, exportPath); // builds into /api-docs
	}
}

console.log("Build completed.");