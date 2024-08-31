var fs = require('fs');

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
      if (i.endsWith(".md")) body += i + "<br>";
    }
  
    // concatenate header string
    // concatenate body string
  
    return '<!DOCTYPE html>'
         + '<html><head>' + header + '</head><body>' + body + '</body></html>';
};
