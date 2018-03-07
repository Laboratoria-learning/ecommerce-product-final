// dependencias
import React, { Component } from 'react';
import firebase from 'firebase';
// import PropTypes from 'prop-types';
// assets
import logo from './images/logo.png';
import cart from './images/carrito.png';
import './css/Header.css';

class Header extends Component {
  constructor() {
    super();// heredando de otra clase,  super llama al  header hereda de component, // state definir el estado de nuestro componente
    this.state = {
      user: null
    };
    // Al utilizar el objeto this realizar un bindeo
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
  }

  componentWillMount() { // este metodo es un ciclo de vida, se dispara una vez en componente ha sifo renderizado
    firebase.auth().onAuthStateChanged(user => {
      // devuelve un objeto usuario  , cada evz que salgamos o entramos tendra la info el usuario
      this.setState({ user });
    });
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // proveedor de google

    firebase.auth().signInWithPopup(provider)
    // este sgning devuelve una promesa
      .then(result => console.log(`${result.user.email} ha iniciado sesión `))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout() {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha salido `))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderLoginButton() {
    if (this.state.user) {
      return (
        <div className = "User">
          <img width="50" src={this.state.user.photoURL} alt={this.state.displayName} className='UserImg' />
          Welcome, {this.state.user.displayName}
          <button onClick={this.handleLogout} className="Logout-btn">Log-out</button>
        </div>
      );
    } else {
      // si no lo esta
      return (
        <button className = "Login-btn" onClick = {this.handleAuth}> Log In with Google </button>
      );
    }
  }

  // static propTypes = {
  //   title: PropTypes.string.isRequired,
  //   items: PropTypes.array.isRequired
  // };
  render() {
    // this.prop contiene las propiedades que enviamos a los componentes
    // const { title, items } = this.props;
    // lo anterior equivale a esto:
    // const title = this.prop.title;
    // const items = this.prop.items;
    return (
      <div className = "Header">
        <div className = "Logo">
          <img src = {logo} alt = "logo" className = "Logo-img" />
          {/* <ul className = "menu">
            {items && items.map((item, key) => <li key= {key}>{item.title}</li>)}
          </ul> */}
        </div>
        <div className = "ShoppingCart">
          <img src = {cart} art = 'cart' className = 'ShopCart' alt = ""/>
        </div>
        <p className = "App-intro">
          {this.renderLoginButton()}
        </p>
      </div>
    );
  }
}

export default Header;
