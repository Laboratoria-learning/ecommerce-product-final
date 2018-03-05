const express = require('express');
// Body parser 
// const bodyParser = require('body-parser');

const app = express();
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

var port = process.env.PORT || 8080;

// var todoRoutes = require('./routes/ruta');

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});
// app.get('/alcatel', todoRoutes);


app.listen(port);