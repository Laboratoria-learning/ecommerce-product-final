$(document).ready(function(){

  var mostrarTodosTemas = function() {
      $.getJSON('https://api.mercadolibre.com/sites/MPE/search?category=MPE118865', function(temas) {
        temas.forEach(crearTema);
      });
    };

    var crearTema = function(tema) {

        var $contenedorTema = $('<div />');
        $contenedorTema.addClass('jumbotron');
        $contenedorTema.append("<h6>Número de tema: "+ tema.id +"</h6>");
        $contenedorTema.append("<h6><strong>Autor: </strong>"+tema.author_name +"</h6>");
        $contenedorTema.append("<h6><strong>Contenido: </strong><span class='willSearch'>"+ tema.content +"</span></h6>");
        $contenedorTema.append("<h6>Número de respuestas: "+ tema.responses_count +"</h6>");
        $mostrarTemas.append($contenedorTema);

      };

      $('#shadow').on('click', mostrarTodosTemas());
});
