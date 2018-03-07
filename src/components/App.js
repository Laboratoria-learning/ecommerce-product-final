// Dependencias
import React, { Component } from 'react';

// componentes
import Header from './Global/Header'
import Content from './Global/Content'
import Footer from './Global/Footer'

// Data (importar data)
import items from '../data/menu';

class App extends Component {
  render() {
    return (
      <div className = "App">
      <Header title = "Ecommerce" items = {items} />
      <Content />
      <Footer />
      </div>
    );
  }


}

export default App;
