const express = require('express');
const app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.listen(port);