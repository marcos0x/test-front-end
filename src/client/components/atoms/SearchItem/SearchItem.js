import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import util from '../../../lib/util';
import shippingIcon from '../../../assets/images/ic_shipping.png';

import './SearchItem.scss';

export default class SearchItem extends Component {
  render() {
    if (!this.props.id) {
      return null;
    }

    return (
      <li className="SearchItem clearfix">
        <Link
          to={`/items/${this.props.id}`}
          className="pic"
          style={{ backgroundImage: `url('${this.props.picture}')` }}
        />
        <div className="content">
          <Link to={`/items/${this.props.id}`}>
            <span className="price">
              {util.number(`${this.props.price.amount}.${this.props.price.decimals}`).format('$ 0,0')}
              {this.props.free_shipping && (
                <img src={shippingIcon} alt="Envio gratis" className="freeShipping" />
              )}
            </span>
            <span className="title">
              {this.props.title}
            </span>
          </Link>
        </div>
        <div className="location">
          <p>{this.props.state_name}</p>
        </div>
      </li>
    );
  }
}
