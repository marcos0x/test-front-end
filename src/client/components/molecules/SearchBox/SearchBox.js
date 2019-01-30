import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import * as persist from '../../../services/persist';
import * as routeHistoryActions from '../../../services/routeHistory/actions';
import * as searchActions from '../../../data/search/actions';

import util from '../../../lib/util';
import searchIcon from '../../../assets/images/ic_Search.png';

import './SearchBox.scss';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    let query = this.props.query || '';

    const searchQuery = util.getQueryString(this.props.location).search || '';
    if (searchQuery) {
      query = searchQuery;
    }

    this.state = {
      query,
      changed: false,
    };

    this.props.history.listen((location) => {
      persist.getStore().dispatch(routeHistoryActions.push(location.pathname + location.search));

      if (location.pathname === '/' && this.props.data.search.query) {
        this.props.actions.search.setQuery('');
        this.setState({ query: '' });
      }
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log({ state: this.state });
    persist.isHydrated().then((state) => {
      console.log({ appState: state });
      console.log({ pathname: this.props.location.pathname });
      if (this.props.location.pathname !== '/') {
        if (!this.state.query.length && !this.state.changed && state.data.search.query !== this.state.query) {
          this.setState(() => ({ query: state.data.search.query }));
        } else if (state.data.search.query !== this.state.query) {
          this.props.searchSetQuery(this.state.query);
        }
      }
    });
  }

  handleChange(event) {
    this.setState({ query: event.target.value, changed: true });
  }

  validateForm() {
    return this.state.query.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validateForm()) {
      this.props.actions.search.setQuery(this.state.query);
      this.props.history.push(`/items?search=${encodeURIComponent(this.state.query)}`);
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="SearchBox">
        <form onSubmit={this.handleSubmit}>
          <InputGroup>
            <FormControl id="searchInput" type="text" onChange={this.handleChange} value={this.state.query} placeholder="Nunca dejes de buscar" />
            <InputGroup.Button>
              <Button id="searchSubmit" type="submit" bsStyle="default">
                <img src={searchIcon} alt="" />
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: {
      search: state.data.search,
    },
  };
}

const mapDispatchToProps = {
  ...searchActions,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBox));
