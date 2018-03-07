$(document).ready(() => {
  fetch('https://api.mercadolibre.com/sites/MLC/search?q=ipod').then(function(response) {
      return response.json();
  })
  .then(function(data) {
    console.log(data)
  })
  site();
  categories();

  promocion();
  /*conversion();*/

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

    } else {

      document.getElementById('login-btn').addEventListener('click', login);
      document.getElementById('signup-btn').addEventListener('click', signup);
      document.getElementById('logout-btn').addEventListener('click', logout);
      document.getElementById('google-btn').addEventListener("click", ingresoGoogle);
      document.getElementById('facebook-btn').addEventListener('click', ingresoFacebook);

      $('#login-btn').click(login);
      $('#signup-btn').click(signup);
      $('#logout-btn').click(logout);
      $('#google-btn').click(ingresoGoogle);
      $('#facebook-btn').click(ingresoFacebook);

    }
  });
});

var database = firebase.database();
var user = null;

function login() {

  let email = document.getElementById('email-login').value;
  let pw = document.getElementById('pw-login').value;

  if (email !== '' && pw !== '') {
    const promise = firebase.auth().signInWithEmailAndPassword(email, pw);
    promise.catch(e => alert(e.message));
  }
}

function signup() {

  let email = document.getElementById('email-signup').value;
  let pw = document.getElementById('pw-signup').value;

  if (email !== '' && pw !== '') {
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pw);
    promise.catch(e => alert(e.message));
  }
}

function logout() {
  firebase.auth().signOut();
}

function ingresoGoogle() {
  if(!firebase.auth().currentUser){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result){
      var token = result.credential.accesstoken;
      var user = result.user;
      var name = result.user.displayName;
      agregarUserBD(user);
    }).catch(function(error) {
      console.log("error", error.message);
      var errorCode = error.Code;
      var errorMessage = error.message;
      var errorEmail = error.email;
      var errorCredential = error.credential;
      if(errorCode === 'auth/account-exists-with-different-credential'){
        alert('Es el mismo usuario');
      }
    });
  }else {
    firebase.auth().signOut();
  }
}

function ingresoFacebook() {
  if(!firebase.auth().currentUser){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    firebase.auth().signInWithPopup(provider).then(function(result){
      var token = result.credential.accesstoken;
      var user = result.user;
      console.log(user);
      agregarUserBD(user);

      /*window.location.href = 'movie.html';*/

    }).catch(function(error) {
      console.log("error", error.message);
      var errorCode = error.Code;
      var errorMessage = error.message;
      var errorEmail = error.email;
      var errorCredential = error.credential;
      if(errorCode === 'auth/account-exists-with-different-credential'){
        alert('Es el mismo usuario');
      }
    });
  }else {
    firebase.auth().signOut();
  }
}

// variables globales
var siteSelected = 'MLC';

var categorie = '';



// sitios para seleccionar

function site() {
  fetch('https://api.mercadolibre.com/sites/').then(function(response) {
      return response.json();
  })
  .then(function(data) {
    $.each(data, function(i, country) {
      if (country.id == 'MLC') {
        $('#country').append(`<option value="${country.id}" data-index="${i}" class="option ${i}" selected>${country.name}</option>`)
      } else {
        $('#country').append(`<option value="${country.id}" data-index="${i}" class="option ${i}">${country.name}</option>`)
      }
    });


    document.getElementById('country').addEventListener('change', selectionSite);


  })

}

function categories() {

  $('#categories').html('');

  fetch(`https://api.mercadolibre.com/sites/${siteSelected}/categories`).then(function(response) {
      return response.json();
  })
  .then(function(data) {

    data.forEach(function(categorie, i) {
      $('#categories').append(`<li id="categorie-${i}" data-cat="${categorie.id}" data-index="${i}" class="categorieSearch">${categorie.name}</li>`)

      
    });

    $('.categorieSearch').on('click', selectionCategorie);

  })

}

function selectionCategorie() {

  categoria = $(this).data('cat');
  $('#categories').html('');
  fetch(`https://api.mercadolibre.com/categories/${categoria}`).then(function(response) {
      return response.json();
  })
  
    .then(function(data) {
      data.children_categories.forEach(function(categories, i) {
        $('#categories').append(`<li id="categorieSelect-${i}" data-select="${categories.name}" class="categorieSelect">${categories.name}</li>`)

      });
    $('.categorieSelect').on('click', selectionProductos);
   });

}

function selectionProductos() {
  let productos = $(this).data('select');
  $('#promociones').html('');
  $('#rowProductos').html('');
  fetch(`https://api.mercadolibre.com/sites/${siteSelected}/search?q=${productos}`).then(function(response) {
      return response.json();
  })
    .then(function(data) {
      
      data.results.forEach(function(producto, i) {
        $('#rowProductos').append(`
                                    <div class="col-md-4 imgSelect" data-index="${producto.id}">
                                      <img class="card-img-top img-${i}" src="${producto.thumbnail}">
                                      <h5 class="card-title text-${i}">${producto.title}</h5>
                                      <p>${producto.price}</p>
                          
                                    </div>`);
  
      });
      $('.imgSelect').click(showInfo);
   });

}

function showInfo() {
  let index = $(this).data('index');
  fetch(`https://api.mercadolibre.com/items/${index}`).then(function(response) {
      return response.json();
   })
  
    .then(function(data) {
      console.log('es mio',data);
      $('#promociones').html('');
      $('#rowProductos').html('');
      let title = data.title
      let price = data.price;
      let condition = data.condition;
      let peso = data.currency_id;
      let thumbnail = data.thumbnail;
      fetch(`https://api.mercadolibre.com/items/${index}/description`).then(function(response) {
      return response.json();
      })
  
      .then(function(data) {
        console.log('es mio',data);
        let description=data.plain_text
        fetch(`https://api.mercadolibre.com/currency_conversions/search?from=${peso}&to=USD`).then(function(response) {
      return response.json();
    })
  
      .then(function(data) {
         console.log(data.ratio)
         let cantidad = data.ratio
        $('#rowProductos').append(`
                                    <div class="col-md-4 imgSelect" data-index="${index}">
                                      <img class="card-img-top" src="${thumbnail}">
                                      <h5 class="card-title">${title}</h5>
                                      <p>${description}</p>
                                      <p>USD ${parseFloat(cantidad)*parseFloat(price)} /(aprox)${peso}${price}</p>
                                      <p>${condition}</p>
                                      <button type="button" class="btn btn-primary" id="addCesta">Añadir a la cesta</button>
                                      <button type="button" class="btn btn-primary" id="Comprar">Comprar</button> 
                                    </div>`);
      });
        
      });

    });
}



// seleccion de sitio para buscar productos (pais)
function selectionSite() {
  let option = $(this).val();

  siteSelected = siteSearch(option);
}

function siteSearch(option) {

  if (option != '') {
    return option;
  } else {
    return 'MLC';
  }
}


// llama a la funcion cuando al buscador se presiona un enter

document.getElementById('search').addEventListener('keypress', function(event) {
  if (event.which === 13) {
    search(document.getElementById('search').value);

  }
});

// buscar todas las imagenes con palabra ingresada
function search(search) {

  $('#promociones').html('');
  fetch(`https://api.mercadolibre.com/sites/${siteSelected}/search?q=${search}`).then(function(response) {
      return response.json();
  })
  
    .then(function(data) {

        data.results.forEach(function(producto, i) {
        $('#rowProductos').append(`
                                    <div class="col-md-4 imgProducto" data-index="${producto.id}">
                                      <img class="card-img-top img-${i}" src="${producto.thumbnail}">
                                      <h5 class="card-title text-${i}">${producto.title}</h5>
                                      <p>${producto.price}</p>
                                    
                                  
                                    </div>`);
  
      });
      $('.imgProducto').click(showInfo);

   });

}


function randomize() {
  let promo = [];
  let result =promo.splice(getRandomInt(0, lis.length), 1)[0];
  fetch(`https://api.mercadolibre.com/sites/${siteSelected}/categories`).then(function(response) {
    return response.json();
  })
  .then(function(data) {
    data.forEach(function(promocion, i) {
      promo.push(promocion.name)
    });
  })
  return result;
}

// seleccion de palabra clave para carrusel
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function promocion () {
  fetch(`https://api.mercadolibre.com/sites/${siteSelected}/search?q=${randomize}`).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log('promo',data);
    data.results.forEach(function(producto, i) {
        $('#promociones').append(`
                                    <div class="col-md-4 imgPromo" data-index="${producto.id}">
                                      <img class="card-img-top img-${i}" src="${producto.thumbnail}">
                                      <h5 class="card-title text-${i}">${producto.title}</h5>
                                      <p>${producto.price}</p>
          
                                    </div>`);
  
    });
    $('.imgPromo').click(showInfo);
  }) 
    
}



