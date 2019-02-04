import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb } from 'react-bootstrap';

import './Breadcrumbs.scss';

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    if (!this.props.items.length) {
      return null;
    }

    return (
      <Breadcrumb>
        {this.props.items.map((item, index) => (
          <Breadcrumb.Item
            key={item.id}
            href={`/items?search=${this.props.data.search.query}`}
            active={index === this.props.items.length - 1}
          >
            {item.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }
}

export default connect(
  state => ({
    data: {
      search: state.data.search,
    },
  }),
)(Breadcrumbs);
