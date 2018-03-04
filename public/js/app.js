function begin() {
  let $products = $('#products');
  
  /* Categoría antiguedades */
  let xhr = $.getJSON('https://api.mercadolibre.com/sites/MPE/search?q=laptops&condition=new');

  xhr.done(function(data) { 
    console.log(data);
    $products.html('');

    let dataArticles = data.results;
    dataArticles.forEach(element => {
      let categoryId = element.category_id;
      let img = element.thumbnail;
      let title = element.title;
      let price = element.price;
      let availableQuantity = element.available_quantity;
      let soldQuantity = element.sold_quantity; 

      $products.append(`
      <div class="col-5 display margin selection" data-id="${categoryId}">
      <div class="col-12 flex">
          <img src="${img}" alt="title" class="bor-rad">
      </div>
      <div class="col-12">
          <p>${title}</p>
          <p>Price: S/.${price}</p>
          <p>Available Quantity: ${availableQuantity}</p>
          <p>SoldQuantity: ${soldQuantity}</p>
      </div>
      </div>
      `);
      let $product = $('#products .selection');

      $product.on('click', function() {
        let product = $(this).attr('data-id');

        showProduct(product);
      });
    });
  });

  function showProduct(item) {
    let categoryUrl = `https://api.mercadolibre.com/currencies/${item}`;
    console.log(categoryUrl);
    $.ajax({
      method: 'GET',
      url: categoryUrl,
      dataType: 'json',
      success: function(ans) {
        console.log(data);
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
}

$(document).ready(begin);