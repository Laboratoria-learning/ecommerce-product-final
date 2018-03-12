


paypal.Button.render({
  env: 'sandbox', // Or 'sandbox',
    // Show a 'Pay Now' button
  style: {
    label: 'checkout',
    size:  'small',    // small | medium | large | responsive
    shape: 'pill',     // pill | rect
    color: 'gold',
    },
  client: {
    sandbox:    'ARL-eQYBzFelnDr4mu2Le-1CjFZAKS61enOp4paJEwl8UKpgzbLHYvXkvPN2xlbPEm3iNyp2gSnhABPd',
    production: 'ARL-eQYBzFelnDr4mu2Le-1CjFZAKS61enOp4paJEwl8UKpgzbLHYvXkvPN2xlbPEm3iNyp2gSnhABPd'
    },
  commit: true, 
  payment: function(data, actions) {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: '0.01', currency: 'USD' }
                    }
                ]
            }
        });
    },
  onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function(payment) {
            window.alert('Payment Complete!');
        });
    
    }
  }, '#paypal-button'   );

