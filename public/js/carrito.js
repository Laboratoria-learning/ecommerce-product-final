$(document).ready(function () {

  let eachQuantityBox = $('.row-product');

  // obteniendo lo guardado en el localStorage
  $('#quantity-selected').text(localStorage.getItem('quantity-item'));

  // Recorriendo todos los productos que se han colocado en la cesta de
  $.each(eachQuantityBox, function (i, val) {
    let $inputChange = $(val).find('.quantity input');
    let $unitPriceProduct = $(val).find('.unit-price b').text();

    $inputChange.on('change', function () {
      $(val).find('.unit-price b').text(Math.floor($unitPriceProduct * $(this).val()))
    });

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