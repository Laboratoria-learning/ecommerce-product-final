// dependencias
import React, {Component} from 'react';
import './css/Mercado.css';

class MercadoLibreApp extends Component {
  constructor() {
    super();
    this.state = { pictures: [],
      inputValue: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    const {inputValue} = this.state;
    fetch(`https://api.mercadolibre.com/sites/MLU/search?q=${inputValue}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // se muestran todos los productos en results
        console.log(data);
        let pictures = data.results.map((pic) => {
          return (
            <div className = "product" key = {pic.id}>
              <img className = "imgProduct" src = {pic.thumbnail} alt = "" />
              <p className = "titleProduct">{pic.title}</p>
              <p>${pic.price}</p>
              <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method = "post" target = "_top">
                <input type = "hidden" name = "cmd" value = "_xclick" />
                <input type="hidden" name="business" value="asd@asdasd.cl" />
                <input type = "image" src = "http://www.paypalobjects.com/en_US/i/btn/btn_buynow_LG.gif" border = "0" name = "submit" alt = "Make payments with PayPal - it's fast, free and secure!" />
              </form>
            </div>
          );
        });
        this.setState({ pictures: pictures });
        // se muestran solo las imagenes contenidas en thumbnail
        console.log(this.state.pictures);
      });
  };
  render() {
	  return (
	    <div className = "container">
        <form onSubmit = {this.handleSubmit}>
          <label>
            <input class="searchInput" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Find your product..." />
          </label>
          <input class="searchButton" type="submit" value="Submit" />
        </form>
        {this.state.pictures}
      </div>
    );
  }
}
export default MercadoLibreApp;
