$('document').ready(function() {
  const $btnSearch = $('#btn-search');
  let input = $('#search');

  function getDefault(){
    valorBuscado = 'tecnologia';
    const url = `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${valorBuscado}`;
    fetch(url)
      .then(handleErrors)
      .then(parseJSON)
      .then(defaultData)
      .catch(displayErrors);    
  }

  getDefault();

  $btnSearch.click(function(event) {
    $('#ocultar').addClass('display-none');
    event.preventDefault();
    $('#contente-list').html('');
    $('#contente-search').html('');
    $('#container-search').html('');
    valorBuscado = input.val();
    const url = `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${valorBuscado}`;
    fetch(url)
      .then(handleErrors)
      .then(parseJSON)
      .then(searchData)
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
  
  function searchData(data) {
    console.log(data);
    data.results.forEach(element => {
      $('#container-search').append(`<div class="col-lg-3 col-md-4 mb-4">
      <div class="card h-100">
        <a href="#">
          <img class="card-img-top padding-40" src="${element.thumbnail}" alt="">
        </a>
        <div class="card-body">
          <a href="#" class="btn btn-primary btn-block producto" precio = "${element.price}" titulo = ${element.title} >Agregar a Carrito</a>
          <h4 class="card-title">
            <a href="${element.permalink}" class="title-card">${element.title}</a>
          </h4>
          <h5>${ 'S/. ' + element.price}</h5>
          <p class="card-text">Cantidad Vendida : ${element.sold_quantity} </p>
        </div>
      </div>
    </div>`);
    });
    input.val('');
    addPaypal();
  }

  function defaultData(data) {
    console.log(data);
    data.results.forEach(element => {
      $('#insertar').append(`<div class="col-lg-3 col-md-4 mb-4">
      <div class="card h-100">
        <a href="#">
          <img class="card-img-top padding-40" src="${element.thumbnail}" alt="">
        </a>
        <div class="card-body">
        <a href="#" class="btn btn-primary btn-block producto" precio = "${element.price}" titulo = ${element.title} >Agregar a Carrito</a>
          <h4 class="card-title">
            <a href="${element.permalink}" class="title-card">${element.title}</a>
          </h4>
          <h5>${ 'S/. ' + element.price}</h5>
          <p class="card-text">Cantidad Vendida : ${element.sold_quantity} </p>
        </div>
      </div>
    </div>`);
    });
    addPaypal();
  }

  function displayErrors(err) {
    console.log('INSIDE displayErrors!');
    console.log(err);
  }

  function addPaypal() {
    paypal.minicart.render({
      strings: {
        button: 'Pagar',
        buttonAlt: 'Total',
        subtotal: 'Total:',
        empty: 'No hay productos en el carrito'
      }
    });
    // Eventos para agregar productos al carrito
    $('.producto').click(function(event) {
      event.stopPropagation();
      paypal.minicart.cart.add({
        business: 'aycuevam@gmail.com', // Cuenta paypal para recibir el dinero
        item_name: $(this).attr('titulo'),
        amount: $(this).attr('precio'),
        currency_code: 'PEN',
       });
    });
  }

  $('#comprar').click(function(){
    $('#buscar').removeClass('form-search');
  });
});