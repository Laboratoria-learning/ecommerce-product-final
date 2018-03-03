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
    let template = `<div class="col-lg-3">
        <div class="card h3">
        <div class="text-center"><img class="img-r" src="${element.thumbnail}" alt="Card image cap"></div>
        <div class="card-body text-center">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">Precio : ${element.price}</p>
          <a href="" class="btn btn-primary " id="${element.id}" data-toggle="modal" data-target="#exampleModal">Buy</a>
        </div>
         </div>
      </div>`;
    $('.row').append(template);
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
  home();


});