
$(document).ready(function () {
  var $amountProduct = $('.amount-product');
  var productId = getParameterByName('product_id');

  // contador de items
  $('.quantity').each(function () {
    const spinner = $(this);
    const input = spinner.find('input[type="number"]');
    const btnUp = spinner.find('.quantity-up');
    const btnDown = spinner.find('.quantity-down');
    const min = input.attr('min');
    const max = input.attr('max');

    btnUp.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }

      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

    btnDown.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });
  });

  // Evento para guardar la cantidad de productos seleccionados en el local storage
  // y mostrando en el carrito
  $('#add-cart').on('click', function () {
    let quantityPicked = $('.quantity').find('input').val();
    localStorage.setItem('quantity-item', quantityPicked);
    $('#cart-quatity').text(quantityPicked);
  });

});