function getMLProducts(productSearch) {
  // https://api.mercadolibre.com/sites/MLC/search?q=guitarra
  $.get('https://api.mercadolibre.com/sites/MLC/search?q=' + productSearch, function(data) {
    console.log(data);
    $('#divProductsList').empty();
    $.each(data.results, function(i, products) {
      var html = '<div class="col-md-2">';
      html += '<div class="card mb-5 box-shadow">';
      html += '<img src="' + products.thumbnail + '" alt="Responsive image" class="img rounded">';
      html += '<div class="card-body">';
      html += '<p class="card-text"> ' + products.title + '<br><strong>$' + products.price + '</strong> </p>';
      html += '<div class="d-flex justify-content-between aling-items-center">';
      html += '<div class="btn-group">';
      html += '<button class="btn btn-sm btn-outline-secondary btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick="javascript:getProductDetail(\'' + products.id + '\')">view</button>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      $('#divProductsList').append(html);
      // html += '';
      // console.log(categoria.name);
    });
  });
}

function getProductDetail(productId) {
  $.get('https://api.mercadolibre.com/items/' + productId, function(data) {
    console.log(data);
    // $('#divProductsList').empty();
    // $.each(data, function(i, product) {
    //   var html='';
    //   //$('#divProductsList').append(html);
    //   //html += '';
    //   // console.log(categoria.name);
    // });
  }); 
}

$(document).ready(() => {
  $('.carousel').carousel();
  $('#searchForm').submit(function(event) {
    if ($('#searchText').val() === '') {
      alert('Debe escribir un producto a buscar');
    } else {
      getMLProducts($('#searchText').val());
      $('#searchText').val('');
    }
    event.preventDefault();
  });
});