import React, { Component } from 'react'

export default class MenuSection extends Component {
  render() {
    return(
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="">Mercado Lab</a>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="">Más populares <span className="sr-only">(current)</span></a></li>
              <li><a href="">Ofertas Relámpago</a></li>
              <li className="dropdown">
                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categorías <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="">Tecnología</a></li>
                  <li><a href="">Libros</a></li>
                  <li><a href="">Deporte</a></li>
                  <li><a href="">Moda</a></li>
                  <li><a href="">Hogar</a></li>
                  <li><a href="">Juguetes</a></li>
                  <li><a href="">Inmuebles</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="">Tus compras</a></li>
              <li className="dropdown">
                <a href="" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tiendas Oficiales <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="">HP</a></li>
                  <li><a href="">Casa Royal</a></li>
                  <li><a href="">Unilever</a></li>
                  <li><a href="">Adidas</a></li>
                  <li><a href="">Alcatel</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
