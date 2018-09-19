import React, { Component } from 'react';
import _ from 'lodash';

import SearchItem from '../../atoms/SearchItem';

export default class SearchList extends Component {
  render() {
    if (this.props.isLoading || _.isEmpty(this.props.items)) {
      return null;
    }

    return (
      <ul className="SearchList unstyled">
        {this.props.items.map(item => (
          <SearchItem id={`searchItem_${item.id}`} key={item.id} {...item} />
        ))}
      </ul>
    );
  }
}
