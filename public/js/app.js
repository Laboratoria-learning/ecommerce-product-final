$(document).ready(function() {// 2DCF9C
  $('.carousel').carousel();
  page('/Disney Infinity', products);
  page('/Flippers y Arcade', products);
  page('/Nintendo', products);
  page('/PlayStation', products);
  page('/SEGA', products);
  page('/Tarjetas Prepagas para Juegos', products);
  page('/Videojuegos', products);
  page('/Xbox', products);
  page('/Otras Marcas', products);
  page('/public/index.html', home);
  page();
  $.ajax({
    url: 'https://api.mercadolibre.com/categories/MLA1144', // cambiar el
    success: function(data) {
      let categories = data.children_categories;
      console.log(categories);
      categories.forEach((element, index) => {
        let template = `<li class="nav-item" data-id="${element.id}" >
       <a class="nav-link" href="/${element.name}">${element.name}</a>
        </li>`;
        $('#container').append(template);
      });
    }
  });
  function products(ctx) {
    $('.row').html('');
    let categories = ctx.path;
    let name = categories.substr(1);
    console.log(name);
    $.ajax({
      url: `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${name}`, // cambiar el
      success: function(data) {
        let categories = data.results;
        categories.forEach((element)=>{
          template(element);   
        });
      }  
    });
  }
  function home() {
    $('.row').html('');
    $.ajax({
      url: 'https://api.mercadolibre.com/sites/MPE/search?category=MPE1144', // cambiar el
      success: function(data) {
        let productResults = data.results;
        productResults.forEach((element, index) => {
          template(element);
        });
      }
    }); 
  }
  function template(element) {
    let template = `<div class="col-6 col-lg-3">
        <div class="card h3">
        <div class="text-center pt-2"><img class="img-r" src="${element.thumbnail}" alt="Card image cap"></div>
        <div class="card-body text-center">
          <h5 class="font-s">${element.title}</h5>
          <p class="price">Precio : S/. ${element.price}</p>
          <div class="card-body">
          <a href="#" class="btn btn-primary product" id="${element.id}" price="${element.price}" title="${element.title}" role="button">Buy</a>
          </div>
          </div>
         </div>
      </div>`;
    $('.row').append(template);
    paypal.minicart.render({
      strings: {
        button: 'Pay'
        , buttonAlt: 'Total'
        , subtotal: 'Total:'
        , empty: 'You have no items in your bag'
      }
    });
    $('#' + element.id + '').click(function(event) {
      paypal.minicart.cart.add({
        business: 'gamestore@gmail.com', // Cuenta paypal para recibir el dinero
        item_name: $(this).attr('title'),
        amount: $(this).attr('price'),
        currency_code: 'PEN',
   
      });
    });
  }
  home();
});