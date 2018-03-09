(function($) {

  var app = $.sammy('#main', function() {
    // todos los productos
    this.get('#/', function(context) {
      $.ajax({
        url: 'https://api.mercadolibre.com/sites/MLC/search?',
        data: {
          q: '',
          limit: '48'
        },
        dataType: 'json',
        
        success: function(response) {
          context.log('the page was loaded', response);
          let items = response.results;
          // Grab the template script:
          const source = $('#allproducts-template').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(items);
          // Add the compiled html to the page:
          $('#main').html(html);

          $.each(items, function(i, item) {
            id = item.id;
          });
        }
      });
    });

    // vista producto
    this.get('#/items/:id', function(context) {
      $.ajax({
        url: `https://api.mercadolibre.com/items/${context}`,
        dataType: 'json',

        success: function(response) {
          context.log('the page was loaded', response);
          let item = response;

          // Grab the template script:
          const source = $('#product-template').html();
          // Compile the template:
          const template = Handlebars.compile(source);
          // Pass our data to the template:
          let html = template(item);
          // Add the compiled html to the page:
          $('#main').html(html);
        }
      });
    });

    $(function() {
      app.run('#/');
    });

    // busqueda 
    let keyword = '';
    $('#searchBtn').click(function() {
      keyword = $('#searchText').val();
      console.log(keyword);
      // Grab the template script:
      const source = $('#search-template').html();
      // Compile the template:
      const template = Handlebars.compile(source);

      // Define our data object
      let context = '';
      $.get(`https://api.mercadolibre.com/sites/MLC/search?q=${keyword}`, function(data) {
        context = data.results;
        console.log(context);

        // Pass our data to the template:
        let html = template(context);

        // Add the compiled html to the page:
        $('#main').html(html);

        // Manually trigger a hashchange to start the app.
        $(window).trigger('hashchange');
      });
    });
  });
})(jQuery);


/*
// PAGE HOME
function getAllProducts() {
  // Grab the template script:
  const source = $('#allproducts-template').html();

  // Compile the template:
  const template = Handlebars.compile(source);

  // Define our data object
  let products = '';
  $.get('https://api.mercadolibre.com/sites/MLC/search?q=celular&limit=48', function(data) {
    products = data.results;
    console.log(products);

    // Pass our data to the template:
    let html = template(context);

    // Add the compiled html to the page:
    $('#main').html(html);

    // Manually trigger a hashchange to start the app.
    $(window).trigger('hashchange');
  });
}

// SEARCH RESULTS:
$('#searchBtn').click(function() {
  let keyword = $('#searchText').val();
  console.log(keyword);
  $(function(keyword) {
    // Grab the template script:
    const source = $('#search-template').html();
    // Compile the template:
    const template = Handlebars.compile(source);

    // Define our data object
    let context = '';
    $.get(`https://api.mercadolibre.com/sites/MLC/search?q=${keyword}`, function(data) {
      context = data.results;
      console.log(context);

      // Pass our data to the template:
      let html = template(context);

      // Add the compiled html to the page:
      $('#main').html(html);

      // Manually trigger a hashchange to start the app.
      $(window).trigger('hashchange');
    });
  });
});

// VISTA PRODUCTO:
function getProductDetail(productID) {
  // Grab the template script:
  const source = $('#product-template').html();
  // Compile the template:
  const template = Handlebars.compile(source);

  // Define our data object
  let context = '';
  $.get(`https://api.mercadolibre.com/items/${productID}`, function(data) {
    context = data.results;
    console.log(context);

    // Pass our data to the template:
    let html = template(context);

    // Add the compiled html to the page:
    $('#main').html(html);

    // Manually trigger a hashchange to start the app.
    $(window).trigger('hashchange');
  });
} */