$(function () {

	var products = [],
		filters = {};
	var checkboxes = $('.all-products input[type=checkbox]');

	checkboxes.click(function () {

		var that = $(this),
			specName = that.attr('name');

		if(that.is(":checked")) {
			if(!(filters[specName] && filters[specName].length)){
				filters[specName] = [];
			}
			filters[specName].push(that.val());
			createQueryHash(filters);

		}
		if(!that.is(":checked")) {

			if(filters[specName] && filters[specName].length && (filters[specName].indexOf(that.val()) != -1)){
				var index = filters[specName].indexOf(that.val());
				filters[specName].splice(index, 1);
				if(!filters[specName].length){
					delete filters[specName];
				}
      }
			createQueryHash(filters);
		}
	});
	$('.filters button').click(function (e) {
		e.preventDefault();
		window.location.hash = '#';
	});

	var singleProductPage = $('.single-product');

	singleProductPage.on('click', function (e) {

		if (singleProductPage.hasClass('visible')) {

			var clicked = $(e.target);
			if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
				createQueryHash(filters);
			}

		}

	});

   $.getJSON( 'https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MPE/search?q=laptops', function( data ) {
				console.log(data.results);
			products = data.results;
			generateAllProductsHTML(products);
			$(window).trigger('hashchange');
           
	});

	// cambiar de tipo de categoria de tecnología : laptops,celulares,

	$('.tecnologia').on('click', function(e) {
	   e.preventDefault();
		let tipo =  $(this).val();
		let list = $('.all-products .products-list');
            
		 console.log(tipo);
		$.getJSON( `https://cors-anywhere.herokuapp.com/https://api.mercadolibre.com/sites/MPE/search?q=${tipo}`, function( data ) {
		console.log(data.results);
		products = data.results;
		console.log(products);   
		generateAllProductsHTML(products);
		$(window).trigger('hashchange');
	 });
				
				
				
	});


	$(window).on('hashchange', function(){
		render(decodeURI(window.location.hash));
	});

	function render(url) {

		var temp = url.split('/')[0];
		$('.main-content .page').removeClass('visible');

		var	map = {
			'': function() {

				filters = {};
				checkboxes.prop('checked',false);

				renderProductsPage(products);
			},

			'#product': function() {
				var index = url.split('#product/')[1].trim();

				renderSingleProductPage(index, products);
			},
			'#filter': function() {
				url = url.split('#filter/')[1].trim();
				try {
					filters = JSON.parse(url);
				}
				catch(err) {
					window.location.hash = '#';
					return;
				}
				renderFilterResults(filters, products);
			}
		};

		if(map[temp]){
			map[temp]();
		}
		else {
			renderErrorPage();
		}

	}

	function generateAllProductsHTML(data){

		var list = $('.all-products .products-list');

		var theTemplateScript = $("#products-template").html();
		var theTemplate = Handlebars.compile(theTemplateScript);
		list.append (theTemplate(data));

		list.find('li').on('click', function (e) {
			e.preventDefault();

			var productIndex = $(this).data('index');

			window.location.hash = 'product/' + productIndex;
		})
	}
	function renderProductsPage(data){

		var page = $('.all-products'),
			allProducts = $('.all-products .products-list > li');

    allProducts.addClass('hidden');
    
		allProducts.each(function () {

			var that = $(this);

			data.forEach(function (item) {
				if(that.data('index') == item.id){
					that.removeClass('hidden');
				}
			});
		});

		page.addClass('visible');

	}

	function renderSingleProductPage(index, data){
	console.log(index);
	console.log(data);
	console.log(data.length);
		var page = $('.single-product'),
			container = $('.preview-large');
		if(data.length){
			data.forEach(function (item) {
      // implementa los atributos y clases al modal del producto  
				if(item.id == index){
					container.find('h3').text(item.title);
          container.find('img').attr('src', item.thumbnail);
          container.find('div').attr('paypal-button');
          container.find('button').text('comprar');
          container.find('button').attr('paypal-button');
          
          
				}
			});
		}
		page.addClass('visible');

	}

	function renderFilterResults(filters, products){

		var criteria = ['manufacturer','storage','os','camera'],
			results = [],
			isFiltered = false;
		checkboxes.prop('checked', false);


		criteria.forEach(function (c) {

			if(filters[c] && filters[c].length){

				if(isFiltered){
					products = results;
					results = [];
        }

				filters[c].forEach(function (filter) {

					products.forEach(function (item){

						if(typeof item.specs[c] == 'number'){
							if(item.specs[c] == filter){
								results.push(item);
								isFiltered = true;
							}
						}

						if(typeof item.specs[c] == 'string'){
							if(item.specs[c].toLowerCase().indexOf(filter) != -1){
								results.push(item);
								isFiltered = true;
							}
						}

          });
          
					if(c && filter){
						$('input[name='+c+'][value='+filter+']').prop('checked',true);
					}
				});
			}

		});

		renderProductsPage(results);
	}

	function renderErrorPage(){
		var page = $('.error');
		page.addClass('visible');
	}

	function createQueryHash(filters){

		if(!$.isEmptyObject(filters)){
			window.location.hash = '#filter/' + JSON.stringify(filters);
		}
		else{
			window.location.hash = '#';
		}

	}

});