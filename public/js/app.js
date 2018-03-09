$(document).ready(function() {
  // Eventos para cada ítem del barra de navegación
  $('.navbar-brand').click(function() {
    containerProduct.html('<h2>Precios increhíbles</h2>');
  });

  $('#alcatel').click(function(e) {
    $.getJSON(urlCategory(modelo.alcatel))
      .then(listCelular);
    celular();
  });

  $('#huawei').click(function(e) {
    $.getJSON(urlCategory(modelo.huawei))
      .then(listCelular);
    celular();
  });

  $('#htc').click(function(e) {
    $.getJSON(urlCategory(modelo.htc))
      .then(listCelular);
    celular();
  });

  $('#lg').click(function(e) {
    $.getJSON(urlCategory(modelo.lg))
      .then(listCelular);
    celular();
  });

  $('#motorola').click(function(e) {
    $.getJSON(urlCategory(modelo.motorola))
      .then(listCelular);
    celular();
  });

  $('#nokia').click(function(e) {
    $.getJSON(urlCategory(modelo.nokia))
      .then(listCelular);
    celular();
  });

  $('#samsung').click(function(e) {
    $.getJSON(urlCategory(modelo.samsung))
      .then(listCelular);
    celular();
  });

  $('#sony').click(function(e) {
    $.getJSON(urlCategory(modelo.sony))
      .then(listCelular);
    celular();
  });
});
