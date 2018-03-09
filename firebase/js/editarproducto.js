$(document).ready(function() {
  // Inicializar la base de datos
  var config = {
    apiKey: 'AIzaSyCA_qTHoFGTVKRvPSAMCajPblhVZJ73Zk0',
    authDomain: 'demoapp-30f5d.firebaseapp.com',
    databaseURL: 'https://demoapp-30f5d.firebaseio.com',
    projectId: 'demoapp-30f5d',
    storageBucket: 'demoapp-30f5d.appspot.com',
    messagingSenderId: '992985819602'
  };

  firebase.initializeApp(config);
  var database = firebase.database();
  var referencia = database.ref('productos');

  var productoId = window.name;
  // console.log(productoId);

  var articulo, descripcion, precio, imagen;
  var producto = {};

  // Buscamos el artículo.
  referencia.child(productoId).once('value', function(datos) {
    producto = datos.val();

    articulo = producto.articulo;
    descripcion = producto.descripcion;
    precio = producto.precio;
    imagenEdicion = producto.imagen;

    $('#articulo').val(articulo);
    $('#descripcion').val(descripcion);
    $('#precio').val(precio);
    $('#previsualizacion').attr('src', imagenEdicion);
  });


  $('#imagen').change(function() {
    var descriptor = new FileReader();
    descriptor.readAsDataURL(this.files[0]);

    descriptor.onloadend = function() {
      imagenEdicion = descriptor.result;
      $('#previsualizacion').attr('src', imagenEdicion);
    };
  });

  $('#botonActualizar').click(function() {
    var articulo = $('#articulo').val();
    var descripcion = $('#descripcion').val();
    var precio = $('#precio').val();
    var imagen = imagenEdicion;

    // Guardamos los datos en referencia
    referencia.child(productoId).update(
      {
        articulo: articulo,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen,
      }, alFinalizar);
  });

  function alFinalizar(error) {
    if (error) {
      alert('Ha habido problemas al realizar la operación: ' + error.code);
    } else {
      alert('Operación realizada con éxito !');
      location.assign('administracion.html');
    }
  }
});