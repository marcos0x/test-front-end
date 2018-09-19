import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <div className="loading" />
    );
  }
}
