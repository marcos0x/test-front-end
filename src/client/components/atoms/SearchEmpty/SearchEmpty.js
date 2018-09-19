import React, { Component } from 'react';

export default class Empty extends Component {
  render() {
    if (this.props.hidden) {
      return null;
    }

    return (
      <div className="empty">No hay resultados</div>
    );
  }
}
