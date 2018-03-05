$(document).ready(function () {
  const url = 'https://api.mercadolibre.com/sites/MLA/search?category=';
  const modelo = {
    alcatel: 'MLA5571',
    huawei: 'MLA112285',
    htc: 'MLA30151',
    lg: 'MLA7076',
    motorola: 'MLA4231',
    nokia: 'MLA3506',
    samsung: 'MLA3519',
    sony: 'MLA3515'
  }
  const containerProduct = $('#container-product');

  // Obtener la url por categoría
  function urlCategory(idCategory) {
    return `${url}${idCategory}`;
  }

  // Recorrido para obtener la lista de celulares
  function listCelular(data) {
    var str = '';
    data.results.forEach(function (element) {
      console.log(element.thumbnail);
      str += `<div class="col-12 col-md-3 text-center box-celphone">  
        <img src="${element.thumbnail}" alt="image">
        <p class="font-weight-bold">${element.title}</p>
        <p class="text-success font-weight-bold">S/ ${element.price}</p>
        </div>`
    })
    containerProduct.html(str)
  }

  // Eventos para cada ítem del barra de navegación
  $('.navbar-brand').click(function () {
    containerProduct.html('<h2>Precios increhíbles</h2>')
  })

  $('#alcatel').click(function (e) {
    $.getJSON(urlCategory(modelo.alcatel))
      .then(listCelular)
  })
  $('#huawei').click(function (e) {
    $.getJSON(urlCategory(modelo.huawei))
      .then(listCelular)
  })
  $('#htc').click(function (e) {
    $.getJSON(urlCategory(modelo.htc))
      .then(listCelular)
  })
  $('#lg').click(function (e) {
    $.getJSON(urlCategory(modelo.lg))
      .then(listCelular)
  })
  $('#motorola').click(function (e) {
    $.getJSON(urlCategory(modelo.motorola))
      .then(listCelular)
  })
  $('#nokia').click(function (e) {
    $.getJSON(urlCategory(modelo.nokia))
      .then(listCelular)
  })
  $('#samsung').click(function (e) {
    $.getJSON(urlCategory(modelo.samsung))
      .then(listCelular)
  })
  $('#sony').click(function (e) {
    $.getJSON(urlCategory(modelo.sony))
      .then(listCelular)
  })
})
