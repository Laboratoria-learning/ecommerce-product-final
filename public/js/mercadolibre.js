$(document).ready(function () {

  var mostrarTodosTemas = function () {
    $.getJSON('https://api.mercadolibre.com/sites/MPE/search?category=MPE118865', function (temas) {
      temas.results.forEach(crearTema);
    });
  };

  var crearTema = function (tema) {

    var $contenedorTema = $('<div />');
    $contenedorTema.addClass('jumbotron');
    $contenedorTema.append("<h6>Item: " + tema.title + "</h6>");
    $contenedorTema.append("<h6><strong>Precio: </strong>" + tema.price + "</h6>");
    $contenedorTema.append("<h6><strong>Moneda: </strong><span class='willSearch'>" + tema.curency_id + "</span></h6>");
    $contenedorTema.append("<h6>Estado: " + tema.condition + "</h6>");
    $contenedorTema.append("<img src=' " + tema.thumbnail + " '>");
    $(newSection).append($contenedorTema);

  };
});
