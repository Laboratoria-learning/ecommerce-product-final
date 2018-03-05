var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

var todoRoutes = require('./routes/ruta');

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});
app.get('/alcatel', todoRoutes);


app.listen(port);