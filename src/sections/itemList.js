import React, { Component } from 'react'
import Proptypes from 'prop-types' // Proptypes define que tipo son nuestras props
import {Item} from './item'

export class ItemList extends Component {
  static propTypes = {
  // definimos a items como un array
    items: Proptypes.array 
  }
  render() {
    const { items } = this.props
    return (
      <div className = 'ItemList'>
        {
          items.map(element => {
            return (
              <div key = { element.id } className = 'ItemList-item'>
                <Item 
                  // rescatamos los valores desde la API
                  title = { element.title }  
                  thumbnail = { element.thumbnail }
                  condition = { element.condition }
                  price = { element.price }
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}