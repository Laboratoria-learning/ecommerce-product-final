
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


  $('.add-cart').on('click', function () {
    console.log($amountProduct.text());
    // console.log($amountProduct.text() * $('.quantity').find('input').val());
    console.log($('.quantity').find('input').val());
    console.log($(this));
    localStorage.setItem('quantity-item', $('.quantity').find('input').val());
    $('#cart-quatity').text($('.quantity').find('input').val());
  });
  // // API Google Pay
  // $('.to-pay').on('click', function () {
  //   console.log(this);
  //     const payMethod = [
  //       {
  //         supportedMethods: ['visa', 'pay-pal','mastercard']
  //       }
  //     ];

  //     const payDetail = {
  //       total: {
  //         label: 'total de los productos',
  //         amount : {
  //           currency: 'PEN',
  //           value: `${$amountProduct.text()*$('.quantity').find('input').val()}`
  //         }
  //       }
  //     };
  //     const payRequest = new PaymentRequest(payMethod, payDetail);
  //     payRequest.show();
  // });

});