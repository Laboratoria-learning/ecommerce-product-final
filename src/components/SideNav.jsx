import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap';
import './SideNav.css';

export default class SideNav extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: true,
      category: []
    }
  }

  componentWillMount() {
    this.fetchData();
  }

  submitCategory(event) {
    console.log(this)
    fetch(`https://api.mercadolibre.com/categories/${this}`, {
        type: 'GET',
        datatype: 'json'
      }).then(response => response.json())
          .then(data => data.children_categories.map(sub=>(
           {
            subCategories: `{sub.name}`,
            subId: `{sub.id}`,
           }

         )))
        .then(subCategory => this.setState({
              subCategory,
              isLoading: false
            }) )
            .catch(error => console.log(error))
  }

  fetchData(){
    fetch('https://api.mercadolibre.com/sites/MLC', {
      type: 'GET',
      datatype: 'json'
    })
      .then(response => response.json())
        .then(data => data.categories.map(cat => (
          {
            categories: `${cat.name}`,
            id: `${cat.id}`

          }

        )))
          .then(category => this.setState({
            category,
            isLoading: false
          }) )
          .catch(error => console.log(error))
  }

  render() {
    const {isLoading, category} = this.state;
    return (
          <div className={`content ${isLoading ? 'is-loading' : ''} sidenav`} onSubmit={this.submitCategory}>
          {
                              !isLoading && category.length > 0 ? category.map(cat => {
                                  const {categories, id} = cat;
                                  return <div key={id}>
                                      <a href="#" onClick={this.submitCategory.bind(id)} value={id}>{categories}</a>
                                  </div>
                              }) : null
                          }
          </div>        
        // <Col sm={3} md={3}>
        // </Col>
    );
  }
}
