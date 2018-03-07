import React, { Component } from 'react';
import PropTypes from 'prop-types'


export default class Carousel extends Component {
  static propTypes = {
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    condition: PropTypes.string,
    price: PropTypes.string
  }
  render() {
    const { thumbnail, title, condition, price } = this.props
    return(
      <div className = "Img-product">
				<img className = "img-responsive" src = { thumbnail } alt = { title } />
			</div>
		);
	}
}
