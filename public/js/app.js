$(document).ready(function () {
  $('.button-collapse').sideNav({
    closeOnClick: true,
    draggable: true
  });

var section;

  $('a', '.side-nav').click(function(){
  		if( ! $(this).hasClass('shown') ) {
  			section = this;
  			// Desaparecer todas las secciones con efecto fade
  			$('.section:visible').fadeOut( 1000, function() {
  				$('a', '.side-nav').removeClass( 'shown' );
  				$(section).addClass( 'shown' );
  				// Añadir seccion elegida
  				var newSection = $( $(section).attr('href') );
  				newSection.fadeIn( 1000 );
  			} );
  		}
  	});




});
