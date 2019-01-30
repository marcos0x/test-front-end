import React, { Component } from 'react';
import { connect } from 'react-redux';
import { call } from 'redux-saga/effects';
import _ from 'lodash';

import * as searchActions from '../../data/search/actions';
import * as searchResultsActions from '../../data/search/results/actions';
import * as searchPaginationActions from '../../data/search/pagination/actions';
import * as detailActions from '../../data/detail/actions';

import Breadcrumbs from '../atoms/Breadcrumbs';
import Loading from '../atoms/Loading';
import SearchList from '../molecules/SearchList';
import SearchEmpty from '../atoms/SearchEmpty';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.tryFetch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.search.query !== this.props.data.search.query) {
      this.tryFetch();
    }
  }

  tryFetch() {
    const sagas = [
      () => this.props.detailEmpty(),
      () => this.props.searchResultsGet({ q: encodeURIComponent(this.props.data.search.query) }),
      () => this.props.searchPaginationGetPage(1)
    ];
  }

  render() {
    const searchListProps = {
      isLoading: this.props.data.searchResults.isLoading,
      items: this.props.data.searchPagination.items,
    };

    return (
      <div className="Search">
        <Breadcrumbs items={this.props.data.searchResults.categories} />
        <div className="main-content">
          <Loading visible={this.props.data.searchResults.isLoading} />
          <SearchList id="searchList" {...searchListProps} />
          <SearchEmpty hidden={this.props.data.searchResults.isLoading || !_.isEmpty(this.props.data.searchResults.items)} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: {
      search: state.data.search,
      searchResults: state.data.searchResults,
      searchPagination: state.data.searchPagination,
    }
  };
}

const mapDispatchToProps = {
  ...searchActions,
  ...searchResultsActions,
  ...searchPaginationActions,
  ...detailActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
