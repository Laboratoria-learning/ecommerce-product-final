var express = require('express');
var app = express();

// Archivos estaticos  (js y css)
app.use(express.static(__dirname + '/public'));
// Index.html
app.use(express.static(__dirname + '/views'));
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.listen(3000);