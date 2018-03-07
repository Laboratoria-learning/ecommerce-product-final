var quoteInfo = document.getElementById('quote-template').innerHTML;
var template = Handlebars.compile(quoteInfo);


// ---------------------------- BOTONES PARA CARGAR PRODUCTOS SEGUN CATEGORIA
var vintageBtn = document.getElementById('vintageBtn');
vintageBtn.addEventListener('click', showVintage);

var homeDecoBtn = document.getElementById('homeDecoBtn');
homeDecoBtn.addEventListener('click', showDeco);

var artBtn = document.getElementById('artBtn');
artBtn.addEventListener('click', showArt);

var techBtn = document.getElementById('techBtn');
techBtn.addEventListener('click', showTech);

var booksBtn = document.getElementById('booksBtn');
booksBtn.addEventListener('click', showBooks);

var adultsBtn = document.getElementById('adultsBtn');
adultsBtn.addEventListener('click', showAdults);

// ---------------------------- FUNCIONES QUE CARGAN CONTENIDO
function showVintage() {
  document.getElementById('app').innerHTML = '';
  var data = fetch('https://api.mercadolibre.com/sites/MLC/search?q=vintage')
    .then(response => response.json())
  
    .then(data => {
      let quoteData;
      
      for (let i = 0; i < data.results.length; i++) {
        quoteData = template({
          decoHome: [
            {decoHome: data.results[i].title}],
          thumb: [
            {thumbnail: data.results[i].thumbnail}],
          price: [
            {price: data.results[i].price}],
          id: [
            {id: data.results[i].id}] 
        });
        document.getElementById('app').innerHTML += quoteData;
        // $('#app').append(
        //   `<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
        //     <input type="hidden" name="cmd" value="_s-xclick">
        //     <input type="hidden" name="hosted_button_id" value="YY6S8TYQ48FGU">
        //     <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
        //     <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">
        //   </form>`
        // );
      };
    });
}

function showDeco() {
  document.getElementById('app').innerHTML = '';
  var data = fetch('https://api.mercadolibre.com/sites/MLC/search?q=hogar')
    .then(response => response.json())
  
    .then(data => {
      let quoteData;
      for (let i = 0; i < data.results.length; i++) {
        quoteData = template({
          decoHome: [
            {decoHome: data.results[i].title}],
          thumb: [
            {thumbnail: data.results[i].thumbnail}],
          available: [
            {available: data.results[i].available_quantity}],
          price: [
            {price: data.results[i].price}],
          id: [
            {id: data.results[i].id}] 
        });
        document.getElementById('app').innerHTML += quoteData;
      };
    });
}

function showArt() {
  document.getElementById('app').innerHTML = '';
  var data = fetch('https://api.mercadolibre.com/sites/MLC/search?q=arte')
    .then(response => response.json())
  
    .then(data => {
      let quoteData;
      for (let i = 0; i < data.results.length; i++) {
        quoteData = template({
          decoHome: [
            {decoHome: data.results[i].title}],
          thumb: [
            {thumbnail: data.results[i].thumbnail}],
          available: [
            {available: data.results[i].available_quantity}],
          price: [
            {price: data.results[i].price}],
          id: [
            {id: data.results[i].id}] 
        });
        document.getElementById('app').innerHTML += quoteData;
      };
    });
}

function showTech() {
  document.getElementById('app').innerHTML = '';
  var data = fetch('https://api.mercadolibre.com/sites/MLC/search?q=tecnologia')
    .then(response => response.json())
  
    .then(data => {
      let quoteData;
      for (let i = 0; i < data.results.length; i++) {
        quoteData = template({
          decoHome: [
            {decoHome: data.results[i].title}],
          thumb: [
            {thumbnail: data.results[i].thumbnail}],
          available: [
            {available: data.results[i].available_quantity}],
          price: [
            {price: data.results[i].price}],
          id: [
            {id: data.results[i].id}] 
        });
        document.getElementById('app').innerHTML += quoteData;
      };
    });
}

function showBooks() {
  document.getElementById('app').innerHTML = '';
  var data = fetch('https://api.mercadolibre.com/sites/MLC/search?q=books')
    .then(response => response.json())
  
    .then(data => {
      let quoteData;
      for (let i = 0; i < data.results.length; i++) {
        quoteData = template({
          decoHome: [
            {decoHome: data.results[i].title}],
          thumb: [
            {thumbnail: data.results[i].thumbnail}],
          available: [
            {available: data.results[i].available_quantity}],
          price: [
            {price: data.results[i].price}],
          id: [
            {id: data.results[i].id}]          
        });
        document.getElementById('app').innerHTML += quoteData;
      };
    });
}

function showAdults() {
  document.getElementById('app').innerHTML = '';
  var data = fetch('https://api.mercadolibre.com/sites/MLC/search?q=31%20minutos')
    .then(response => response.json())
  
    .then(data => {
      let quoteData;
      for (let i = 0; i < data.results.length; i++) {
        quoteData = template({
          decoHome: [
            {decoHome: data.results[i].title}],
          thumb: [
            {thumbnail: data.results[i].thumbnail}],
          available: [
            {available: data.results[i].available_quantity}],
          price: [
            {price: data.results[i].price}],
          id: [
            {id: data.results[i].id}]          
        });
        document.getElementById('app').innerHTML += quoteData;
      };
    });
}