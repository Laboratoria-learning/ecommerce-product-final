// Mercadopago.setPublishableKey("TEST-dd92e68a-5db3-46b6-aca4-05d790927bad");

// Mercadopago.createToken(form, tokenHandler);

// ----------------------------- INICIO ROUTING

(function() {
  function init() {
    let router = new Router([
      new Route('deco', 'deco.html', true)
    ]);
  }
  init();
}());
// ----------------------------- FIN ROUTING

// ----------------------------- INICIO FIREBASE

function eCommerce() {
  this.signInButton = document.getElementById('signIn');
  this.signOutButton = document.getElementById('signOut');
  this.signInButton.addEventListener('click', this.signIn.bind(this));
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.initFirebase();
};

eCommerce.prototype.signIn = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
};

eCommerce.prototype.signOut = function() {
  this.auth.signOut();
};

eCommerce.prototype.initFirebase = function() {
  // Shortcuts to Firebase SDK features.
  this.auth = firebase.auth();
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

eCommerce.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    console.log('conectado');
  } else {
   	console.log('desconectado');
  }
};

window.onload = function() {
  myeCommerce = new eCommerce();
};

// ---------------------------------------- FIN FIREBASE
