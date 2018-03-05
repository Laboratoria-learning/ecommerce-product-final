function laptops() {
  let $products = $('#products');
  let xhr = $.getJSON('https://api.mercadolibre.com/sites/MPE/search?q=laptops&condition=new');
  xhr.done(function(data) { 
    // console.log(data);
    $products.html('');

    let dataArticles = data.results;
    dataArticles.forEach(element => {
      let categoryId = element.category_id;
      let img = element.thumbnail;
      let title = element.title;
      let price = element.price;
      let availableQuantity = element.available_quantity;
      let soldQuantity = element.sold_quantity; 

      /* Utilizaremos esta funcion para remplazar espacios por '-' */
      let titleChain = spaces(title);

      $products.append(`
     <a href="#/id=?${categoryId}-${titleChain}" class="col-5 display margin selection" data-img="${img}" data-title="${title}" data-price="${price}" data-available="${availableQuantity}" data-sold="${soldQuantity}">
     <div class="col-12 flex">
         <img src="${img}" alt="title laptop" class="image">
     </div>
     <div class="col-12">
         <p>${title}</p>
         <p>Price: S/.${price}</p>
     </div>
     </a>
     `);
    });
    laptop();
  });
}

function laptop() {
  let $products = $('#products');
  let $product = $('#products .selection');

  $product.on('click', function() {
    $products.html('');
    let productImg = $(this).attr('data-img');
    let productTitle = $(this).attr('data-title');
    let productPrice = $(this).attr('data-price');
    let productAvailable = $(this).attr('data-available');
    let productSold = $(this).attr('data-sold');

    $products.append(`<div class="col col-lg-12 flex">
        <div class="col col-lg-10 flex container-laptop">
        <div class="col-5 flex">
            <img src="${productImg}" alt="title" class="bor-rad">
        </div>
        <div class="col-7">
            <h3>${productTitle}</h3>
            <p>Price: S/.${productPrice}</p>
            <p>Available Quantity: ${productAvailable}</p>
            <p>SoldQuantity: ${productSold}</p>
        </div>
        </div>
        </div>`);
  });
}

function spaces(title) {
  var chain = title;
  chain = chain.replace(/\s/g, '-');
  return chain;
}