const express = require('express');
// Body parser 
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Archivos estaticos  (js y css)
app.use(express.static(__dirname + '/public'));
// Index.html
app.use(express.static(__dirname + '/views'));
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.listen(port);