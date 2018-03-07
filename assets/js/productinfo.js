const accessToken = 'APP_USR-8189733489067517-022707-815285de0a64dbe771d33f0539e5cf43__J_H__-239442426';

// añadir evento a elemento creado mediante dom + template
document.addEventListener('click', function(e) {
  if (e.target.id === 'view_product') {
    // pasar el atributo data id que contiene el id del producto seleccionado para ingresarlo
    // como campo dentro del fetch
    let dataID = $(e.target).data('id');
    // función para llamar el objeto del producto seleccionado
    getProductInfo(dataID);
  }
});

function getProductInfo(productID) {
  fetch(`https://api.mercadolibre.com/items/${productID}?access_token=${accessToken}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // función para rellenar la template
      fillTemplate(data);
      // se abre el modal
      $('#productModal').modal();
    });
}

function fillTemplate(data) {
  // se guarda el contenido del template dentro de una variable
  let rawTemplate = document.getElementById('product-template').innerHTML;
  // dentro de otra variable se compila el contenido 
  let compiledTemplate = Handlebars.compile(rawTemplate);
  // la variable donde se compiló el contenido se usa como función y se le pasa la data
  // obtenida del fecth como argumento
  let generatedHTML = compiledTemplate(data);

  // se recupera el contenedor del html
  const modal = document.getElementById('here');
  // y se inserta la template
  modal.innerHTML = generatedHTML;
}