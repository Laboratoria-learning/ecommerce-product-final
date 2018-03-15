import React, { Component } from 'react'

export class SearchForm extends Component {
  state = {
    // lo que el usuario pone en el input
    inputCatalogue:'' 
  }

  _handleChange = (e) => {
    // actualiza el estado , toma el valor del input
    this.setState({inputCatalogue: e.target.value}) 
  }
  _handleSubmit = (e) => {
    // previene el evento nativo del submit
    e.preventDefault() 
    // guardamos en la variable el valor del input
    const { inputCatalogue } = this.state 
    // hacemos llamado a la API con la variable
    fetch(`https://api.mercadolibre.com/sites/MLC/search?q=${ inputCatalogue }`) 
    .then(res => res.json())
    .then(hola => {
      const { results } = hola 
      console.log(results)
      this.props.onResults(results)
    })
  }
  render() {
    //onchange a input para monitoriar los cambios y pasamos el evento handlechange
    return( 
      // a traves de onSubmit pasamos el evento handleSubmit (se ejecuta cada vez que hacemos submit un llamado a la API)
      <form onSubmit = { this._handleSubmit }> 
        <div className ="input-append"> 
          <input onChange ={ this._handleChange } type="text" className="span2"  size="120"placeholder="¿Qué andas buscando?" />
          <button className ="btn">Buscar</button>
        </div>
      </form>
    )
  }
}