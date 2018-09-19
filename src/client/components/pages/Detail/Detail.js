import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Row, Col } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

import util from '../../../lib/util';

import * as detailActions from '../../../data/detail/actions';

import Breadcrumbs from '../../atoms/Breadcrumbs';
import Loading from '../../atoms/Loading';

import './Detail.scss';

bootstrapUtils.addStyle(Button, 'primary-2');

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.tryFetch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.data.detail.isLoading && prevProps.data.detail.id !== this.props.data.detail.id) {
      this.tryFetch();
    }
  }

  tryFetch() {
    this.props.actions.detail.get(this.state.id);
  }

  render() {
    const { item, isLoading } = this.props.data.detail;

    return (
      <div className="Detail">
        <Breadcrumbs items={this.props.data.searchResults.categories} />
        <div className="main-content">
          <Loading visible={isLoading || !item.id} />
          {(!isLoading && item.id) && (
            <Row>
              <Col md={9}>
                <div className="pic">
                  <img id="pic" src={item.picture} alt="" />
                </div>
                <div id="description" className="description">
                  <h3>Descripción del producto</h3>
                  {`${item.description}\n`
                    .split('\n')
                    .map((_item, i) => {
                      const key = i;
                      return (
                        <p key={key}>
                          {`${_item}`}
                          &nbsp;
                        </p>
                      );
                    })}
                </div>
              </Col>
              <Col md={3}>
                <div id="content" className="content">
                  <p className="condition">
                    {`${item.condition} - ${item.sold_quantity} vendidos`}
                  </p>
                  <h2>{item.title}</h2>
                  <p className="price">
                    {util.number(`${item.price.amount}.${item.price.decimals}`).format('$ 0,0')}
                  </p>
                  <Button bsStyle="primary-2" bsSize="large" onClick={() => {}} block>
                    Comprar
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    data: {
      searchResults: state.data.searchResults,
      detail: state.data.detail,
    },
  }),
  dispatch => ({
    actions: {
      detail: bindActionCreators(detailActions, dispatch),
    },
  })
)(Detail);
