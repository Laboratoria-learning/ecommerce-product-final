import React, {Component} from 'react';
import './css/Mercado.css';

class MercadoInicio extends Component {
  constructor() {
    super();
    this.state = { pictures: [],
  	};
  }

  componentDidMount() {
    fetch('https://api.mercadolibre.com/sites/MLU/search?q=Computación')
      .then(response => {
        return response.json();
      })
      .then(data => {
  	   // se muestran todos los productos en results
  		console.log(data);
  		let pictures = data.results.map((pic) => {
          return (
            <div className="product" key = {pic.results}>
              <img className = "imgProduct" src = {pic.thumbnail} alt = "products" />
              <p className="titleProduct">{pic.title}</p>
              <p>${pic.price}</p>
              <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="TKQLJ4VXZNKJ2" />
                <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
              </form>
  			     </div>
          );
  			});
        this.setState({ pictures: pictures });
  			// se muestran solo las imagenes contenidas en thumbnail
        // console.log("state", this.state.pictures);
        console.log(this.state.pictures[0]);
      });
  		}
  render() {
	  return (
	    <div className="PicturesContainer">
        {this.state.pictures[0]}
        {this.state.pictures[1]}
        {this.state.pictures[2]}
        {this.state.pictures[3]}
        {this.state.pictures[4]}
        {this.state.pictures[5]}
        {this.state.pictures[6]}
        {this.state.pictures[7]}
        {this.state.pictures[8]}
	    </div>
    );
	    }
}
export default MercadoInicio;
