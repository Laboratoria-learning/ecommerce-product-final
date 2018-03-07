import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import CardProduct from './product'

export class Item extends Component {
  static propTypes = {
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    condition: PropTypes.string,
    price: PropTypes.string
  }

  render() {
    const { thumbnail, title, condition, price } = this.props
    return (
    // <CardProduct/>
      <div className ="thumbnail">
        <img className ="img-responsive" src = { thumbnail } alt = { title } />
        <div className = "caption">
          <h4> { title } </h4>
          <h5>Estado: { condition }</h5>
          <h3>${ price }</h3>
        </div>
        <div className="Buy"><div className="label">+ Agregar al carro</div></div>
        <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_s-xclick"></input>
          <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----MIIHoQYJKoZIhvcNAQcEoIIHkjCCB44CAQExggE6MIIBNgIBADCBnjCBmDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFNhbiBKb3NlMRUwEwYDVQQKEwxQYXlQYWwsIEluYy4xFjAUBgNVBAsUDXNhbmRib3hfY2VydHMxFDASBgNVBAMUC3NhbmRib3hfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tAgEAMA0GCSqGSIb3DQEBAQUABIGAiezw3bN4Jj8JYTGpYXwhc4nP74RvmuWzeAjxbjxicD/milI1wi39CO/6BnbDpiyjFh4ZhzYvmYL0GJNcaciFt/ZqV9G1s8YghPsGhyFlbazIIaK4eJKBb8YTkbp/Lcfr01aA3r0BRqhYL/FXt5kWB7WYKx5ESb2j7vPYlcU8sLcxCzAJBgUrDgMCGgUAMIHsBgkqhkiG9w0BBwEwFAYIKoZIhvcNAwcECMqKG1YX92OUgIHIfe53k89DESyuWX5hg452gK/Xpocs/oT6YEkJPvXw4HyTIsN+cr9rEQVERLNfFMBY3VUoA1lNzsJwCfxGx+gvkDTpl0NawSKpCSo42+MGQ4NE7/PIaWEnpF0gRz3DR7QrYGdaYNn2QsRETi6FlLdPuRW8XApdG84AcWNRdmzOnhRT40A76zJhViUT52PDi3yGdGQ2+pRwuIbFrtZJlKfpAH3oFfdIqml3u1BN+eo5/W+mIXeyTz1xS8bC8s/QAh+L/U0InctkUhegggOlMIIDoTCCAwqgAwIBAgIBADANBgkqhkiG9w0BAQUFADCBmDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExETAPBgNVBAcTCFNhbiBKb3NlMRUwEwYDVQQKEwxQYXlQYWwsIEluYy4xFjAUBgNVBAsUDXNhbmRib3hfY2VydHMxFDASBgNVBAMUC3NhbmRib3hfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMB4XDTA0MDQxOTA3MDI1NFoXDTM1MDQxOTA3MDI1NFowgZgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMREwDwYDVQQHEwhTYW4gSm9zZTEVMBMGA1UEChMMUGF5UGFsLCBJbmMuMRYwFAYDVQQLFA1zYW5kYm94X2NlcnRzMRQwEgYDVQQDFAtzYW5kYm94X2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAt5bjv/0N0qN3TiBL+1+L/EjpO1jeqPaJC1fDi+cC6t6tTbQ55Od4poT8xjSzNH5S48iHdZh0C7EqfE1MPCc2coJqCSpDqxmOrO+9QXsjHWAnx6sb6foHHpsPm7WgQyUmDsNwTWT3OGR398ERmBzzcoL5owf3zBSpRP0NlTWonPMCAwEAAaOB+DCB9TAdBgNVHQ4EFgQUgy4i2asqiC1rp5Ms81Dx8nfVqdIwgcUGA1UdIwSBvTCBuoAUgy4i2asqiC1rp5Ms81Dx8nfVqdKhgZ6kgZswgZgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMREwDwYDVQQHEwhTYW4gSm9zZTEVMBMGA1UEChMMUGF5UGFsLCBJbmMuMRYwFAYDVQQLFA1zYW5kYm94X2NlcnRzMRQwEgYDVQQDFAtzYW5kYm94X2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbYIBADAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBBQUAA4GBAFc288DYGX+GX2+WP/dwdXwficf+rlG+0V9GBPJZYKZJQ069W/ZRkUuWFQ+Opd2yhPpneGezmw3aU222CGrdKhOrBJRRcpoO3FjHHmXWkqgbQqDWdG7S+/l8n1QfDPp+jpULOrcnGEUY41ImjZJTylbJQ1b5PBBjGiP0PpK48cdFMYIBpDCCAaACAQEwgZ4wgZgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMREwDwYDVQQHEwhTYW4gSm9zZTEVMBMGA1UEChMMUGF5UGFsLCBJbmMuMRYwFAYDVQQLFA1zYW5kYm94X2NlcnRzMRQwEgYDVQQDFAtzYW5kYm94X2FwaTEcMBoGCSqGSIb3DQEJARYNcmVAcGF5cGFsLmNvbQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTgwMjI3MTMyODQyWjAjBgkqhkiG9w0BCQQxFgQUpecKl+ujH+zFf5jv16IRyd6MjoMwDQYJKoZIhvcNAQEBBQAEgYChRqmY6YejMVxppuYGsjknbIIcXgJEAqjHbCSyOrrliuK3pPp0CD2BnEOGwnwd6RcGTZcgTdAkV4SDNQkMapqMwlRFpsABBMAIVRRccejb7cff3agFDcNlUyntK82Gvkqi7rfuahZAl6iNPfifYNclylfZvZlwANsfel4d6I78mQ==-----END PKCS7-----
          "></input>
          <input type="image" src="https://www.sandbox.paypal.com/es_XC/i/btn/btn_buynow_LG.gif" border="0" name="submit" alt="PayPal, la forma más segura y rápida de pagar en línea."></input>
          <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
        </form>
      </div>
    )
  }
}
/* API PAYPAL
const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AWZ9gU2XO7zkNBTNBNnzOEcxhLEo485rCdhdGVhP-kTr7CWc4MGP3fLV9WESjlMNZDbz--Vdw126Y66u',
  'client_secret': 'EH94XV4hjLWIHAbTeSnfW-RsH9LVeVnqFKgeJnIea8jtSI7R_Lljwu0nuIiYB911Q36aUgKjYoBbBLB8'
});

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Red Sox Hat",
                "sku": "001",
                "price": "25.00",
                "currency": "USD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "USD",
            "total": "25.00"
        },
        "description": "Hat for the best team ever"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});

app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "25.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
});
});

app.get('/cancel', (req, res) => res.send('Cancelled'));

app.listen(3000, () => console.log('Server Started'));
*/
