(function(window, document) {
  libreria.getID('vista')
    .enrutar()
    .ruta('/', 'views/inicio.html', null, null)
    .ruta('/search-view', 'views/search.html', 'search', function() {
      _.getID('crearSearch');
    })
})(window, document);
