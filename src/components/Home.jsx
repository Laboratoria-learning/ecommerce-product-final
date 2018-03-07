import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './Home.css';
import * as firebase from 'firebase';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      products: []
    }
  }

  componentWillMount() {
    this.randomize();

  }

  randomize() {
    let promo = ['', '2'];
    fetch(`https://api.mercadolibre.com/sites/MLC/categories`).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        data.forEach(function (promocion, i) {
          promo.push(promocion.name)
        });
      })
      .catch(error => console.log(error))
    let random = Math.floor(Math.random() * 26) + 1;
    // let floor = Math.floor(random) + 0;
    let result = promo;

    fetch(`https://api.mercadolibre.com/sites/MLC/search?q=${result}`).then(function (response) {
      return response.json();
    }).then(data => data.results.map(prod => (
      {
        product: `${prod.title}`,
        thumb: `${prod.thumbnail}`,
        price: `${prod.price}`,
        id: `${prod.id}`
      }

    )))


      .then(products => this.setState({
        products,
        isLoading: false
      }))
      .catch(error => console.log(error))

  }

  render() {
    const { isLoading, products } = this.state;
    return (
      <div className={`content ${isLoading ? 'is-loading' : ''}`} >
        {
          !isLoading && products.length > 0 ? products.map(prod => {
            const { product, id, thumb, price } = prod;
            return <div className="pro" key={id}>
              <h6>{product}</h6>
              <Image src={thumb} thumbnail />
              <p>$ {price}</p>
              <Button href="#" onClick={this.addProduct}> Añadir a Carrito </Button>
            </div>
          }) : null
        }
      </div>
    );
  }
}
