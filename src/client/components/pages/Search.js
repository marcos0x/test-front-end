import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as searchResultsActions from '../../data/search/results/actions';

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
    this.props.searchResults({ q: encodeURIComponent(this.props.data.search.query) });
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
  ...searchResultsActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
