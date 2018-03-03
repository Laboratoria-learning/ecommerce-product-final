$('document').ready(function() {
  const $btn = $('#btn-search');
  let input = $('#search');
  $btn.click(function(event) {
    event.preventDefault();
    $('#contente-list').html('');
    $('#contente-search').html('');
    $('#container-search').html('');
    const url = `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${input.val()}`;
    fetch(url)
      .then(handleErrors)
      .then(parseJSON)
      .then(addNews)
      .catch(displayErrors);
  });
  
  function handleErrors(res) {
    if (!res.ok) {
      throw Error(res.status);
    }
    return res;
  }
  
  function parseJSON(res) {
    return res.json()
      .then(function(data) {
        return data;
      });
    console.log(data);
  }

  function addNews(data) {
    data.results.forEach(element => {
      $('#container-search').append(` <div class="card m-2" style="width: 18rem;">
      <img class="card-img-top" src="${element.thumbnail}" alt="Card image cap">
      <div class="card-body">
      <h5 class="card-title">S/. ${element.price}</h5>
      <h6 class="card-title">${element.listing_type_id}</h6>
      <p class="card-text">${element.title}.</p>
      <input class="car btn btn-primary" type="button" value="AÑADIR AL CARRITO" price="${element.price}" title="${element.listing_type_id}" />
      </div>
      </div>`);
    });
    input.val('');
  }
  
  function displayErrors(err) {
    console.log('INSIDE displayErrors!');
    console.log(err);
  }
  
  // configuración inicial del carrito 
  paypal.minicart.render({
    strings: {
      button: 'Pagar'
      , buttonAlt: 'Total'
      , subtotal: 'Total:'
      , empty: 'No hay productos en el carrito'
    }
  });

  // Eventos para agregar productos al carrito
  $('.car').click(function(event) {
    event.stopPropagation();
    paypal.minicart.cart.add({
      // Cuenta paypal para recibir el dinero
      business: 'aycuevam@unc.edu.pe', 
      item_name: $(this).attr('titulo'),
      amount: $(this).attr('precio'),
      currency_code: 'PEN',
    });
  });
});