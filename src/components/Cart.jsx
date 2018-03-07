import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button, FormControl, FormGroup, Form } from 'react-bootstrap';
import './Cart.css';
import * as firebase from 'firebase';


export default class Cart extends Component {


   products = [
       {
           nameProduct: 'Notebook Acer Nvidia 2gb',
           price: 543
       },
       {
           nameProduct: 'Reloj Inteligente DZ09',
           price: 18.68
       }
   ]
   constructor(props) {
       super(props);
   }

   render() {
       return (

           <form target="paypal" action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
               <table class="table table-condesend">
                   <tr class="tblTitle">
                       <th>Descripción</th>
                       <th>Precio USD</th>
                       <th><img src="http://www.directoryislamabad.com/wp-content/uploads/2017/07/Retail-shoping.png" alt="" class="imgCart" /></th>
                   </tr>
               </table>
               <input type="hidden" name="cmd" value="_cart" />
               <input type="hidden" name="business" value="mercury@gmail.com" />
               <input type="hidden" name="lc" value="US" />
               {this.products.map(function (name, i) {
                   return ([<input type="text" name="item_name" class="labelCart titulo breadcrumb" key={i} value={name.nameProduct} />,
                   <input type="text" name="amount" class="labelCart breadcrumb" value={name.price} />, <br />])
               })}
               <input type="hidden" name="currency_code" value="USD" />
               <input type="hidden" name="button_subtype" value="products" />
               <input type="hidden" name="no_note" value="0" />
               <input type="hidden" name="add" value="1" />
               <input type="hidden" name="bn" value="PP-ShopCartBF:btn_cart_LG.gif:NonHostedGuest" />
               <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_cart_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
               <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
           </form>
       );
   }

}