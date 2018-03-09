// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCmcnWQF8G_WUg0e9P4qyLFhLzkuB3YN_I',
  authDomain: 'ecommerce2-6c1f4.firebaseapp.com',
  databaseURL: 'https://ecommerce2-6c1f4.firebaseio.com',
  projectId: 'ecommerce2-6c1f4',
  storageBucket: 'ecommerce2-6c1f4.appspot.com',
  messagingSenderId: '192229541944'
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();
$('#btn-Google').click(function() {
  firebase.auth().signInWithPopup(provider).then(function(data) {
    var user = data.user;
    console.log(user);
    var name = user.displayName;
    $('h3').text(user.displayName);
    console.log(user.displayName);
  }).catch(function(error) {
    console.log(error);
  });
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('h3').text(user.displayName);
    $('.inicio').hide;
    $('.usuario').show;
  } else {
    $('.inicio').show;
    $('.usuario').hide;
  }
}); 
// cerrar session  
$('#cerrar').click(function() {
  firebase.auth().signOut().then(function() {
    $('.inicio').show;
    $('.usuario').hide;
  });   
});