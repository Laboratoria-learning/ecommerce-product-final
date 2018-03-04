function begin() {
  let $products = $('#products');
  
  /* Categoría antiguedades */
  let xhr = $.get('https://api.mercadolibre.com/sites/MPE/search?q=Antigüedades&condition=new');

  xhr.done(function(data) { 
    console.log(data);
    $products.html('');

    let dataArticles = data.results;
    dataArticles.forEach(element => {
      let id = element.id;
      let img = element.thumbnail;
      let title = element.title;
      let price = element.price;
      let availableQuantity = element.available_quantity;
      let soldQuantity = element.sold_quantity; 

      $products.append(`
      <div class="col-4" data-id="${id}">
      <div class="col-12">
          <img src="${img}" alt="title" class="bor-rad">
      </div>
      <div class="col-12">
          <p>${title}</p>
          <p>${price}</p>
          <p>${availableQuantity}</p>
          <p>${soldQuantity}</p>
      </div>
      </div>
      `);
    });
  });
}

$(document).ready(begin);