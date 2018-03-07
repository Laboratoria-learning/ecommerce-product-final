$(function() {
  $('.slider').slider();
  // Se obtiene la data completa de los elementos contenidos en el archivo json
  $.getJSON('https://raw.githubusercontent.com/tamybl/beautysales-spa/master/products.json', function(data) {
    // Funcion que imprime los datos contenido en data en el HTML
    generateProductsHTML(data);
    $(window).trigger('hashchange');
  });

  $(window).on('hashchange', function() {
    render(decodeURI(window.location.hash));
  });


  function render(url) {
  // This function decides what type of page to show
  // depending on the current url hash value.
  }

  $('.tab a').click(showByType);
});

function showByType() {
  var typeSelected = $(this);
  var typeName = typeSelected.attr('id');
  window.location.hash = 'product/' + typeName;
  $('.all-products .products-list').find('li').remove();

  $.ajax({
    url: `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${typeName}`,
    type: 'GET',
    datatype: 'json'
  })
    .done(function(response) {
      // si el llamado fue exitoso, llama a showProductsByType
      generateProductsHTML(response);
    })
    .fail(function(error) {
      // si el llamado falla, lanza un console.log
      console.log('error');
    });
  let link = 'https://www.mercadopago.com/mlc/checkout/pay?pref_id=176718880-409c9cc0-88b0-4ad2-8b9f-2f7943581965';
  $('.mercado').html('<a mp-mode="dftl" href=' + link + ' name="MP-payButton" class="blue-ar-l-rn-none mercado">Buy now!</a>');
}
function generateProductsHTML(data) {
  let list = $('.all-products .products-list');
  const theTemplateScript = $('#products-template').html();
  var theTemplate = Handlebars.compile(theTemplateScript);
  const limit = 20;
  let resultsPerPage = [];
  for (let i = 0; i <= 20; i++) {
    resultsPerPage.push(data[i]);
  }
  list.append(theTemplate(resultsPerPage));
  
  list.find('li').on('click', function(e) {
    e.preventDefault();
    var productIndex = $(this).data('index');
    window.location.hash = 'product/' + productIndex;
  });

  $(window).trigger('hashchange');
}

$(window).on('hashchange', function() {
  render(decodeURI(window.location.hash));
});

function render(url) {
}


var shop = $('#shop');

$(shop).click(addToCart);
var counter = 1;
function addToCart() {
  $(shop).html('<i class="fas fa-shopping-cart"></i> Cart (' + (counter) + ')');
  counter++;
}

$('.cart').click(function(e) {
  const jsonCart = {};
  jsonCart.products = [];
  let id = $(this).attr('data-id');
  let name = $(this).attr('data-name');
  jsonCart.products.push({
    id: id,
    name: name});
  localStorage.setItem('jsonCart', JSON.stringify(jsonCart));
  let db = localStorage.getItem('jsonCart');
});

function productsPerPage(data, min, max) {
  // Array que se despliega
  let results = [];
  for (let i = min; i <= max; i++) {
    if (data[i] !== undefined) {
      results.push(data[i]);
    }
  }
  return results;
}
