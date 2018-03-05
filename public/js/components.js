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
};

const containerProduct = $('#container-product');

// Obtener la url por categoría
function urlCategory(idCategory) {
  return `${url}${idCategory}`;
}

// Recorrido para obtener la lista de celulares
function listCelular(data) {
  var str = '';
  data.results.forEach(function(element) {
    let categoryId = element.category_id;
    let img = element.thumbnail;
    let title = element.title;
    let price = element.price;
    let availableQuantity = element.available_quantity;
    let soldQuantity = element.sold_quantity; 

    /* Utilizaremos esta funcion para remplazar espacios por '-' */
    let titleChain = spaces(title);
    
    str += `<a href="#/id=?${categoryId}-${titleChain}" class="col-12 col-md-3 text-center box-celphone selection" data-img="${img}" data-title="${title}" data-price="${price}" data-available="${availableQuantity}" data-sold="${soldQuantity}">  
      <img src="${img}" alt="image">
      <p class="font-weight-bold">${title}</p>
      <p class="text-success font-weight-bold">S/ ${price}</p>
      </a>`;
  });
  containerProduct.html(str);
  celular();
}

function celular() {
  let $products = $('#container-product');
  let $product = $('#container-product .selection');

  $product.on('click', function() {
    $products.html('');
    let productImg = $(this).attr('data-img');
    let productTitle = $(this).attr('data-title');
    let productPrice = $(this).attr('data-price');
    let productAvailable = $(this).attr('data-available');
    let productSold = $(this).attr('data-sold');

    $products.append(`<div class="col col-lg-12 flex margin-container">
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
