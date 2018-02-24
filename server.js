var express = require('express');
var app = express();
var server = app.listen(1009, listening);

function listening() {
  console.log('Listennig ...');
}
app.use(express.static('public'));