$(document).ready(function() {
  // Acá le decimos a Sammy que comience a correr cuando el sitio cargue
  app.run('#/');
  // Inicializamos esto para que se sumen los elementos que quedaron en el carrito en la última sesión
  app.trigger('update-cart');
  $('[data-toggle="tooltip"]').tooltip();
  // lamando a la función para appendear las categorías en 'Filter by categories'
  categories();
  updateCartSingle();
  // Cancelando la compra
  $('body').on('click', '#cancel', function() {
    app.stores.session.clearAll();
    $('.item-cart-container').remove();
    app.trigger('update-cart');
    location.reload();
  });
});

// App sera la variable de Sammy
const app = Sammy('#products');
// Le decimos a Sammy que puede usar el plugin de Templates
app.use(Sammy.Template);
// Y también vamos a usar session y Storage, que permiten almacenar info en local storage
app.use(Sammy.Session);
// Creamos un nuevo objeto vacío que almacenará las compras
let cart = app.session('cart', function() {
  return {};
});

app.around(callback => {
  fetch('assets/data/data.json')
    .then(response => response.json())
    .then(response => {
      app.items = response;
    })
    .then(callback)
    .catch(error => console.log(error));
});

// Con app.get creamos una nueva ruta. Context es el espacio en dónde nos ubicamos
// CALLBACK
app.get('#/', context => {
  $('#sub-nav input').val('');
  $('#categories').show();
  context.app.swap('');
  $.each(app.items, (i, item) => {
    context.render('assets/templates/item.template', {id: i,
      item: item})
      .appendTo(context.$element());
      item.id = i;
  });
});

// Nueva ruta, la que se creará al hacer click en cada imagen
app.get('#/item/:id', function(context) {
  $('#sub-nav input').val('');
  $('#categories').hide();
  /*
  * En este caso no usamos funciones flecha porque usaremos this
  * Dentro de este context, this será el producto en el que el usuario hizo click
  */
  app.item = app.items[this.params['id']];
  if (!app.item) {
    return app.notFound();
  }
  this.partial('assets/templates/item_detail.template');
});

app.get('#/cart', function(context) {
  $('#categories').hide();
  $('#sub-nav input').val('');
  checkout();
  
  context.app.swap('');
  $.each(cart, (i, item) => {
    context.render('assets/templates/cart.template', {item:item})
      .appendTo(context.$element());
  });
  context.render('assets/templates/pay.template')
    .appendTo(context.$element());
});

app.get('#/wishlist', function(context) {
  $('#sub-nav input').val('');
  $('#categories').hide();
  context.app.swap('');
  context.render('assets/templates/wishlist.template')
    .appendTo(context.$element());
});

/* Ahora vamos a definir un nuevo método. En lugar de get, usaremos post
* Cuando usamos GET, le pedimos datos a determinado origen
* Cuando usamos POST, le enviamos datos a determinado destinatario
*/

app.post('#/cart', function(context) {
  let itemId = this.params['item_id'];
  let itemPrice = parseInt(app.item.price.replace('CLP$', '').replace('.', ''));
  if (!cart[itemId]) {
    cart[itemId] = {quantity: 0,
      price: 0};
      app.items[itemId].quantity = 0;
  }
  cart[itemId].quantity += parseInt(this.params['quantity']);
  cart[itemId].price += parseInt(itemPrice);
  app.session('cart', cart);
  this.trigger('update-cart');
});

const updateCartSingle = function() {
  $('body').on('click', '.btn-add-to-cart', function() {
    let itemId = $(this).data('value');
    let itemPrice = parseInt($(this).data('price').replace('CLP$', '').replace('.', ''));
    if (!cart[itemId]) {
      cart[itemId] = {quantity: 0,
        price: 0};
      app.items[itemId].quantity = 0;
    }
    cart[itemId].quantity ++;
    app.items[itemId].quantity ++;
    cart[itemId].price += itemPrice;
    app.session('cart', cart);
    app.trigger('update-cart');
  });
};

app.bind('update-cart', function() {
  let sum = 0;
  let total = Object.keys(cart);
  let totalPrice = 0;
  $.each(app.session('cart') || {}, function(id, product) {
    sum += product.quantity;
    let uniquePrice = cart[id].price;
    uniquePrice = cart[id].price * cart[id].quantity;
    totalPrice = totalPrice + uniquePrice;
  });
  $('#cart-access')
    .find('#items-cart').text(sum).end()
    .find('#total-amount').text(totalPrice).end()
    .animate({paddingTop: '30px'})
    .animate({paddingTop: '10px'});
});


/**
 * función para filtrar un array y devolver los elementos pero sin sus duplicados
 * fuente y explicación profunda:
 * http://www.etnassoft.com/2011/06/24/array-unique-eliminar-valores-duplicados-de-un-array-en-javascript/
 */
Array.prototype.unique=function(a){
  return function() {return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});


// dándole a Filter by Categories las categorías disponibles en el data.json
function categories(finalArray) {
  // aquí guardaremos todas las categorías
  let catArr = [];
  fetch('assets/data/data.json')
    .then(function (response) {
      return response.json()
    })
    .then(function(data) {
      //pusheando a catArr todas las categorías
      data.forEach(function(element) { /* aquí recorremos cada elemento de la data */
        element.categories.forEach(function(el) { /* element.categories es un array de categorías de un elemento*/
          catArr.push(el); /* aquí pusheamos a catArr cada categría en ese array */
        });
      });
      //guardando en una variable el nuevo array con los elementos filtrados
      let catArrFilter = catArr.unique();
      // recorremos cada categoría única
      catArrFilter.forEach(function(element, index) {
        let counter = 0; /* inicializamos un contador para saber cuántos elementos de la data poseen
        la categoría que estamos recorriendo */
        for (let i = 0; i < catArr.length; i ++) {
          if (element == catArr[i]) { /* comparamos el elemento actual con todos los elementos de catArr */
            counter = counter + 1; /* cuenta cuántas veces existe */
          }
        }
        let name = element;
        name = name.split(' ').join('-');
        $('#categories ul').append(`<li class="list-group-item d-flex justify-content-between align-items-center"><a href="#/categories/${name}">${element}</a><span class="categorie-counter badge badge-pill">${counter}</span></li> `);
      });
      // retornar categorías únicas, sin repetirse
      return catArr.unique();
    });
};

// Nueva ruta, para las categorías d:
app.get('#/categories/:name', function(context) {
  $('#sub-nav input').val('');
  category = this.params['name'];
  category = category.split('-').join(' ');
  $('#categories').show();
  context.app.swap('');
  $.each(app.items, (i, item) => {
    let searching = item.categ
    if (item.categories.indexOf(category) >= 0) {
      context.render('assets/templates/item.template', {id: i,
        item: item})
        .appendTo(context.$element());
        item.id = i;
      }
  });
});

const checkout = () => {
  // Creamos un nuevo array sólo con los ids de los objetos comprados
  let productsStr = Object.keys(cart);
  // Pasamos cada uno de los items por parseInt para que sean números y no strings
  let productsId = productsStr.map((i) => {
    return parseInt(i);
  });
  productsId.map(i => {
    cart[i].title = app.items[i].title;
    cart[i].img = app.items[i].img;
    cart[i].id = i;
  });
  return cart;
};


$('#sub-nav').on('change', 'input', function() {
  let title = $(this).val();
  title = title.split(' ').join('-');
  $('#go-search').attr('href', `#/title/${title}`)
})

// Nueva ruta, para los nombres (BUSCADOR)
app.get('#/title/:title', function(context) {
  title = this.params['title'];
  title = title.split('-').join(' ');
  title = title.toLowerCase();
  $('#categories').show();
  context.app.swap('');
  $.each(app.items, (i, item) => {
    let searching = item.title
    searching = searching.toLowerCase()
    if (searching.indexOf(title) >= 0) {
      context.render('assets/templates/item.template', {id: i,
        item: item})
        .appendTo(context.$element());
        item.id = i;
      }
  });
});

$('#products').on('click', '.remove', function() {
  let id = $(this).attr('id');
  delete cart[id];
  console.log(cart);
  // actualizando localstorage
  app.session('cart', cart);
  location.reload();
});

app.get('#/cart/payment', function(context) {
  $('#categories').hide();
  context.app.swap('');
  context.render('assets/templates/payment.template')
    .appendTo(context.$element());
});

/*
 * calculando total d:
 */
var calculateTotalPrice = () => {
  let total = Object.keys(cart)
  let totalPrice = 0;

  total.forEach(function(element) {
    let uniquePrice = cart[element].price;
    uniquePrice = cart[element].price * cart[element].quantity;
    totalPrice = totalPrice + uniquePrice;
  });
  return totalPrice;
};

