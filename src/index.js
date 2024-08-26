var fs = require('fs');

var fileName = './docs/index.html';
if (!fs.existsSync("./docs")) {
    fs.mkdirSync("./docs");
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
    body += "<br>";
    body += filenames.toString().replaceAll(",", "<br>");
  
    // concatenate header string
    // concatenate body string
  
    return '<!DOCTYPE html>'
         + '<html><head>' + header + '</head><body>' + body + '</body></html>';
};
