/* Categoría accesorios para celulares */
let xhr = $.get('https://api.mercadolibre.com/sites/MPE/search?q=carcasses&condition=new');
xhr.done(function(data) {
  console.log(data);
});