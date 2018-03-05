function begin() {
  let $products = $('#products');
  let $button = $('#navbarDropdown');
  
  laptops();
 
  $button.on('click', function() {
    $products.html('');
    laptops();
  });
};

$(document).ready(begin);