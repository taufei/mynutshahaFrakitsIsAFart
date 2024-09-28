const { Remarkable } = require('remarkable');
var path = require("path");
var Mustache = require('mustache');
var jsdom = require("jsdom");
var fs = require('fs');
var hljs = require('highlight.js');

var { fixHtmlRefs, copyDir } = require("../utils.js");

var header = fs.readFileSync("./src/pages/templates/header.html", 'utf8')

function buildHtml(_pageDir, _exportPath) {
	var pageDir = _pageDir + "/";
	var exportPath = _exportPath + "/";
	if (!fs.existsSync(exportPath)) {
		fs.mkdirSync(exportPath, {recursive: true});
	}
	console.log("Building Index Page");

    var mods = [];
    var modsDir = "./featured-mods/";
    var files = fs.readdirSync(modsDir);
    for(const file of files) {
        if(file.startsWith(".")) continue;
        if(!fs.existsSync(modsDir + file + "/meta.json")) continue;
        var meta = JSON.parse(fs.readFileSync(modsDir + file + "/meta.json", 'utf8'));

        if(!fs.existsSync(exportPath + file)) fs.mkdirSync(exportPath + file);
        fs.copyFileSync(modsDir + file + "/cover.jpg", exportPath + file + "/cover.jpg");

        mods.push({
            name: meta.name,
            description: meta.description,
            image: "./" + file + "/cover.jpg",
            link: meta.link,
            tags: meta.tags ?? [],
            tagsRaw: (meta.tags ?? []).join(","),
            author: meta.author,
            source: meta.source,
            version: meta.version,
            lastUpdated: meta.lastUpdated ?? "1970-01-01T00:00:00.000Z"
        });
    }

    var path = "./src/pages/index.html";
    var outpath = exportPath + "index.html";
    var templatePage = fs.readFileSync(path, 'utf8');
    var vars = {
        title: "Home",
        header: header,
        mods: mods
    };

    let html = templatePage;
    let old;
    do {
        old = html;
        html = Mustache.render(html, vars, null, {
            escape: function(text) {
                return text;
            }
        });
    } while(html != old);

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