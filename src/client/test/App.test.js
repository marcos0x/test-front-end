import _ from 'lodash';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import 'isomorphic-fetch';

import store from '../config/store';
import * as routeHistory from '../services/routeHistory';
import * as routeHistoryActions from '../services/routeHistory/actions';
import * as searchResultsApi from '../data/search/results/api';
import * as detailApi from '../data/detail/api';

import App from '../App';
import Home from '../components/pages/Home';
import Search from '../components/pages/Search';
import SearchBox from '../components/molecules/SearchBox';
import SearchList from '../components/molecules/SearchList';
import Detail from '../components/pages/Detail';
import NotFound from '../components/pages/NotFound';

const dispatch = sinon.spy();

describe('App', () => {
  let app;
  let home;
  let search;
  let detail;
  let notFound;

  beforeEach(() => {
    app = shallow(<App />);
    home = shallow(<Home />);
    search = shallow(<Search />, { context: { dispatch, store } });
    detail = shallow(<Detail />, { context: { dispatch, store } });
    notFound = shallow(<NotFound />);
  });

  it('tests works', () => {
    expect(1).to.equal(1);
  });

  it('should renders correctly', () => {
    expect(app.length).to.equal(1);
    expect(home.length).to.equal(1);
    expect(search.length).to.equal(1);
    expect(detail.length).to.equal(1);
    expect(notFound.length).to.equal(1);
  });
});

describe('Store', () => {
  it('should create store, get the state and dispatch actions', () => {
    const currentRoute = store.getState().services.routeHistory;
    store.dispatch(routeHistoryActions.push('test'));
    const newRoute = store.getState().services.routeHistory;

    expect(currentRoute).to.not.deep.equal(newRoute);
  });
});

describe('API', () => {
  it('should get: search results, product detail', () => {
    const getSearchResults = () => new Promise((resolve, reject) => {
      searchResultsApi
        .get({ q: 'iPhone' })
        .then((response) => {
          console.debug('Search Results', { items: response.items.slice(0, 4) });
          const { items } = response;
          expect(items[0]).have.property('id');
          expect(items[0]).have.property('title');
          expect(items[0]).have.property('price');
          expect(items[0]).have.property('picture');
          expect(items[0]).have.property('condition');
          expect(items[0]).have.property('free_shipping');
          expect(items[0]).have.property('state_name');
          resolve(items);
        })
        .catch((exception) => {
          console.debug('Error: ', exception);
          reject(exception);
        });
    });

    const getDetail = id => new Promise((resolve, reject) => {
      if (!id) {
        resolve({});
        return;
      }

      detailApi
        .get(id)
        .then((response) => {
          if (_.isEmpty(response)) {
            resolve(response);
            return true;
          }
          // console.debug('Detail: ', response.item);
          expect(response.item).have.property('id');
          expect(response.item).have.property('title');
          expect(response.item).have.property('price');
          expect(response.item).have.property('picture');
          expect(response.item).have.property('condition');
          expect(response.item).have.property('free_shipping');
          resolve(response);
        })
        .catch((exception) => {
          console.debug('Error: ', exception);
          reject(exception);
        });
    });

    getSearchResults()
      .then(items => getDetail(items[0] ? items[0].id : null))
      .catch((exception) => {
        console.debug('Error: ', exception);
      });
  });
});

describe('Home', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<App />);
    instance = wrapper.instance();
  });

  it('should display the logo', () => {
    expect(wrapper.find('#logo')).to.have.lengthOf(1);
  });

  it('should display the search box', () => {
    expect(wrapper.find(SearchBox)).to.have.lengthOf(1);
  });
});

describe('Search', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<Search />, { context: { dispatch, store } }).dive();
    instance = wrapper.instance();
  });

  it('should display the search results', () => {
    expect(wrapper.find(SearchList)).to.have.lengthOf(1);
  });
});

describe('Detail', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<Detail match={{ params: { id: 'MLA682627325' } }} />, { context: { dispatch, store } }).dive();
    instance = wrapper.instance();
  });

  it('should display the product detail', () => {
    expect(wrapper.find('.Detail')).to.have.lengthOf(1);
  });
});
