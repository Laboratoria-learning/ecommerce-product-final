import React, { Component } from 'react'
import Header from './product-header.js'
import Information from './product-info.js'
import Img from './product-img.js'

export default class CardProduct extends Component {
  render() {
    return(
      <div className = 'Product'>
        <Header />
        <div className = 'Content'>
          <Information />
          <Img />
        </div>
      </div>
    )
  }
}
