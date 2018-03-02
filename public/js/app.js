$(document).ready(function() {
  $.ajax({
    url: 'https://api.mercadolibre.com/categories/MPE1430', // cambiar el
    success: function(data) {
      let categories = data.children_categories;
      console.log(categories);
      categories.forEach(element => {
        let template = `<div data-id="${element.id}"  class="card" style="width: 18rem;">
       <img class="card-img-top" src="" alt="Card image cap">
       <div class="card-body">
         <p class="card-text">${element.name}</p>
       </div>
     </div>`;
        $('#container').append(template);
      });
    }
  });


  /*  $.ajax({
    url: 'https://api.mercadolibre.com/sites/MLA/search?category=MLA5726', // cambiar el
    success: function(data){
      console.log(data.results)
    }
  }); */
});