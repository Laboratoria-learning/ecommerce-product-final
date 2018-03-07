(function($) {
  //inicializa sammy en #main
  var app = $.sammy('#main', function() {
    //sammy puede usar el plugin template y session en main
    this.use('Template');
    this.use('Session');
    this.around(function(callback) {
      var context = this;
      this.load('data/data.json')
        .then(function(items) {
          context.items = items;
        })
        .then(callback);
    });
    // Cuando se cliqueen los botones en registro
    $('#register-btn').click(function(e) {
      e.preventDefault();
      var emailReg = $('#inputEmailReg').val();
      var passReg = $('#inputPassReg').val();
      console.log(emailReg);
      console.log('registrado');
      firebase.auth().createUserWithEmailAndPassword(emailReg, passReg)
        .then(function() {
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then(function() {
          }).catch(function(error) {
          });
        })
        .catch(function(error) {
          // los errores van aquí.
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }); // fin funcion click en boton registro

    // FIREBASE
    $('#log-btn').click(function(e) {
      e.preventDefault();
      var emailLog = $('#inputEmailLog').val();
      var passLog = $('#inputPassLog').val();
      firebase.auth().signInWithEmailAndPassword(emailLog, passLog).catch(function(error) {
        // los errores van aquí.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    }); // fin funcion click en boton log in
    // ver si hay usuario activo
    function observardor() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $('.cart-info').show();
          $('#logOut').show();
          $('#logIn').hide();
          $('#register').hide();
          // el usuario ingresó
        } else {
          $('.cart-info').hide();
          $('#logOut').hide();
          $('#logIn').show();
          $('#register').show();
          // el usuario salió
          // ...
        }
      });
    }; // fin funcion observador
    observardor();

    // desconectar
    $('#logOut').click(function() {
      firebase.auth().signOut().then(function() {
      });
      firebase.auth().signOut().catch(function(error) {
      });
    }); // fin funcion click en boton log out

    $('#forgotPass').click(function() {
      var auth = firebase.auth();
      var emailAddress = prompt('Ingresa tu correo electrónico');
      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // enviar mail
      }).catch(function(error) {
      });
    }); // fin funcion click en olvidar contraseña

    // validación de email
    function validateEmail($email) {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test($email);
    }
/*
* ruta basica #, cuando el navegador está en #, la
* funcion que definimos se ejecutará en un contexto sammy
* muestra los items que están en la data appeneada en template
*/
    this.get('#/', function(context) {
      context.app.swap('');
      $.each(this.items, function(i, item) {
        context.render('templates/item.template', {
          id: i,
          item: item
        })
          .appendTo(context.$element());
      });
    });

    this.get('#/item/:id', function(context) {
      this.item = this.items[this.params['id']];
      if (!this.item) {
        return this.notFound();
      }
      this.partial('templates/item_detail.template');
    });

    this.post('#/cart', function(context) {
      var itemId = this.params['item_id'];
      // fetch al carro actual
      var cart = this.session('cart', function() {
        return {};
      });
      if (!cart[itemId]) {
        // este item no está aún en el carro
        // inicializa la cantidad con 0
        cart[itemId] = 0;
      }
      cart[itemId] += parseInt(this.params['quantity'], 10);
      // almacena el carro
      this.session('cart', cart);
      this.trigger('update-cart');
    });
// funcion para actualizar carro
    this.bind('update-cart', function() {
      var sum = 0;
      $.each(this.session('cart') || {}, function(id, quantity) {
        sum += quantity;
      });
      $('.cart-info')
        .find('.cart-items').text(sum).end()
        .animate({paddingTop: '30px'})
        .animate({paddingTop: '10px'});
    });

    this.bind('run', function() {
      // muestra el carro actualizado
      this.trigger('update-cart');
    });
  });
  $(function() {
    app.run('#/');
  });
})(jQuery);

/*
* botón de pagp por Stripe, se puso en item_detail.template
* el botón llama al servidor de stripe con la API (data key)
* de prueba que el sitio entrega a los desarrolladores
* para que funcione hay que ingresar el número de TC de prueba
* 4242 4242 4242 4242 más una fecha de vencimiento creíble
* y 3 digitos al azar
$(".pay").append("<script src='https://checkout.stripe.com/checkout.js'" + "class='stripe-button'" +
    "data-key='pk_test_LMeQ66Q4hSaSh774qEv4EzwZ'" +
    "data-image='/images/marketplace.png'" +
    "data-name='SPA test'" +
    "data-description='test de compra de 1 producto'" +
    "data-amount='2000'" +
    "data-label='Buy'></script>")
*/