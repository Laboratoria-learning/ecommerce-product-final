$(document).ready(function () {

  /*page('ruta', callback)*/
  page('/MPE68085', user)
  page('/MPE1613', user)
  page('/MPE1618', user)
  page('/MPE3236', user)
  page('/MPE1631', user)
  page('/MPE1608', user)
  page('/MPE68166', user)
  page('/MPE7155', user)    
  page('/MPE68126', user)
  page('/MPE1621', user)
  page('/MPE1902', user)  
  page('*', notFound)
  page()

  function user() {
    document.getElementById('test').textContent = 'hola';
  }

   function notFound() {
    document.getElementById('test').textContent = 'not found';
  }

  // inicializando y configurando sidebar materialize
  $(".button-collapse").sideNav();
  $('.button-collapse#shopping-cart').sideNav({
    edge: 'right',
  });

  //hallando categorias  que  se  colocaran en listas
  $.ajax({
    url: 'https://api.mercadolibre.com/categories/MPE1574',
    success: function (data) {
      var categorias = data.children_categories
      console.log(categorias)
      categorias.forEach(function (element) {
        const li = `<li  class="lisCategorias" data-id=${element.id}><a href="/${element.id}" class='categorie'>${element.name}</a></li>`
        // $(".right").append(li);
        $("#mobile-demo").append(li);
      });

    }

  });

  // jalando subcategorias
  $.ajax({
    url: 'https://api.mercadolibre.com/sites/MPE/search?category=MPE1574',
    success: function (data) {
      var children = data.results
      console.log(children);

      children.forEach(function (element) {
        const div = ` <div id= ${element.category_id} class="listProductos  card col s12 m3  l3" style="height: 280px; width:250px; margin:8px 9px " >
       <img src="${element.thumbnail} alt="">
       <p class="center-align">${element.title}</p>
       <p class="center-align " style="color: blue;"> costo :${element.price} </p>
       <p class="center-align">${element.category_id}</p>
       </div>`
        $(".row").append(div);
        // $(".listProductos").hide();

      })

    }
  });

  //evento que relaciona  la categoria  con las subcategorias.

  //$(".lisCategorias").click(function() {
  // if($(".lisCategorias").attr( "data-id" )=== $(".listProductos").attr("id")){
  //   $( ".lisProductos" ).show()
  // }
  //});

  // Inicia Configuración de API PayPal

  paypal.Button.render({
    env: 'production', // Or 'sandbox',
    client: {
      sandbox: 'AUbwyqI0Qv7-Jx560ktdg_rwLNaT35-a3FYA7-SdVf9i7dTbYD56hMqXC4YGQZr0RHMHOKhHlUJblkfk',
      production: 'AWStTtI9jh03288Nu2oVlmmgFz-3lXcnm7Jtwj4QZ55oPw2m8cDK4vsyU_vORxwtEfjoygFEOAiM0LWO'
    },
    locale: 'es_ES',
    commit: true, // Show a 'Pay Now' button
    style: {
      color: 'blue',
      size: 'responsive',
      shape: 'rect',
    },

    payment: function (data, actions) {
      return actions.payment.create({
        payment: {
          transactions: [{
            amount: {
              total: '1.00', // enviar precio en esta función 
              currency: 'USD'
            }
          }]
        }
      });
    },

    onAuthorize: function (data, actions) {
      return actions.payment.execute().then(function (payment) {
        // The payment is complete!
        // You can now show a confirmation message to the customer
      });
    },
  }, '#paypal-button');

  // Termina Configuración de API PayPal  
})