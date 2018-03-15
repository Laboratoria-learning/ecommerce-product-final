// Dependece
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CatalogueSection extends Component {
	// datos que vamos a solicitar del data
  static propTypes = {
  	name: PropTypes.string.isRequired,
    Category: PropTypes.array.isRequired

	}
	render() {
	// obtener las categorias
	// primero pregunto si category esta inicializado, recorro category para obtener los datos
    const { title, Category } = this.props;
    console.log(this.props);
    return(
    	<div className = 'cat'>
        { Category && Category.map((Category, key) => 
        	<div className = 'cont-cat' key = { key }> 
            <img className = 'img-data' src = { Category.img }/>
            <h3 className= 'title-data'> { Category.name } </h3>
            <p className = 'text-center'> { Category.info } </p>
            <p className = 'text-center'> { Category.precio } </p>
          </div>)}
      </div>
    	


    	)
	}
}