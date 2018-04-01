'use strict';

(function() {
  function init() {
    let router = new Router([
      new Route('home', 'home.html', true),
      new Route('deco', 'deco.html'),
      new Route('art', 'art.html'),
      new Route('productinfo', 'productinfo.html')
    ]);
  }
  init();
}());


// $('#lol').click(function() {
//   $('p').css('color', 'red');
// });