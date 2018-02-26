$(document).ready(function() {

  $('.add-cart').on('click', function() {
    
    console.log($amountProduct.text());
      // console.log($amountProduct.text()*$('.quantity').find('input').val());
      console.log($(this));
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