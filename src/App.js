//Dependence
import React, { Component } from 'react';
import MenuSection from './sections/menu';
//Components
import CatalogueSection from './sections/catalogue';
import {SearchForm} from './sections/SearchForm';
import {ItemList} from './sections/itemList';
import './App.css';

// data
// Importar el json
import Category from './assets/js/data'

class App extends Component {
  state = { results : [] } // Guardamos los resultados del llamado a la API

  _handleResults = (results) => { // monitorea los cambios en los resultados
    this.setState({ results })
}

  render() {
    return (
      <div className = "App">
        <MenuSection />
        
        <div className = 'SearchForm-wrapper'>
          <SearchForm onResults = { this._handleResults } />
        </div>
          {this.state.results.length === 0 // si el array de los resultado es 0 ->true
            // Items que le pasaremos a CatalogueSection
          ? <CatalogueSection Category = { Category } /> 
          : <ItemList items = {this.state.results} /> 

        }
      </div>
    );
  }

}

export default App;


