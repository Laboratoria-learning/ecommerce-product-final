var express = require('express');
var app = express();
var server = app.listen(3000, listening);

function listening() {
  console.log('Server on');
}


//Desde la carpeta public vamos a servir nuestra pagina web
app.use(express.static('public'));
