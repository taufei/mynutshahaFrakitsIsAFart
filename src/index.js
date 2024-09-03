var fs = require('fs');
const { Remarkable } = require('remarkable');
var path = require("path");
var renderer = new Remarkable();

var fileName = './export/index.html';
if (!fs.existsSync("./export")) {
    fs.mkdirSync("./export");
}
var stream = fs.createWriteStream(fileName);

stream.once('open', function(fd) {
  var html = buildHtml();

  stream.end(html);
});
function buildHtml(req) {
    var header = '';
    var body = 'Hello World';

    var filenames = fs.readdirSync("./src/docs", {recursive: true});
    body += "<br><br>";
    for (i of filenames) {
      console.log(i);
      if (path.parse(i).ext == "" && !fs.existsSync("./export/" + i)) fs.mkdirSync("./export/" + i);
      if (i.endsWith(".md")) { 
        body += i + "<br>";
        var data = fs.readFileSync("./src/docs/" + i, 'utf8');
        //console.log(data);
        fs.writeFileSync("./export/" + i.replace(".md", ".html"), renderer.render(data), 'utf8');
      }
    }
  
    // concatenate header string
    // concatenate body string
  
    return '<!DOCTYPE html>'
         + '<html><head>' + header + '</head><body>' + body + '</body></html>';
};
