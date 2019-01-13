const _ = require('lodash');
const httpRequest = require('./lib/http-request');
const config = require('./config');

const apiConfig = config.api.mercadolibre;

const api = {
  items: {},
  item: {},
  itemDescription: {},

  getItems(query) {
    return httpRequest
      .request({
        ...apiConfig,
        endpoint: apiConfig.endpoints.items,
        data: query,
      })
      .then((response) => {
        this.items = response;
      })
      .catch(error => Promise.reject(error));
  },

  getItem(id) {
    return httpRequest
      .request({
        ...apiConfig,
        endpoint: apiConfig.endpoints.item.replace(':id', id),
      })
      .then((response) => {
        this.item = response;
      })
      .catch(error => Promise.reject(error));
  },

  getItemDescription(id) {
    return httpRequest
      .request({
        ...apiConfig,
        endpoint: apiConfig.endpoints.itemDescription.replace(':id', id),
      })
      .then((response) => {
        this.itemDescription = response;
      })
      .catch(error => Promise.reject(error));
  },

  processCategories(filters) {
    const categories = _.find(filters, { id: 'category' });

    return !_.isEmpty(categories) ? categories.values[0].path_from_root : [];
  },

  processItem(item) {
    const price = _.toString(item.price).split('.');

    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id || 'ARS',
        amount: _.toNumber(price[0]),
        decimals: _.toNumber(price[1] || 0),
      },
      picture: (item.thumbnail || '').replace('-I.', '-B.'),
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      state_name: item.address.state_name,
    };
  },

  processItemsResponse(res) {
    let response;
    let statusCode;

    if (this.items.results) {
      statusCode = 200;

      response = {
        categories: this.processCategories(this.items.filters || {}),
        items: [
          ...this.items.results.reduce((all, item) => {
            all.push(this.processItem(item));
            return all;
          }, []),
        ],
      };
    } else {
      statusCode = 404;

      response = {
        error: 'No results',
      };
    }

    res
      .status(statusCode)
      .type('json')
      .send(response);
  },

  processItemResponse(res) {
    let response;
    let statusCode;

    if (this.item.id) {
      const condition = _.find(this.item.attributes, { id: 'ITEM_CONDITION' });
      const price = _.toString(this.item.price).split('.');

      statusCode = 200;

      response = {
        author: {
          name: '',
          lastname: '',
        },
        item: {
          id: this.item.id,
          title: this.item.title,
          price: {
            currency: this.item.currency_id || 'ARS',
            amount: _.toNumber(price[0]),
            decimals: _.toNumber(price[1] || 0),
          },
          picture: (this.item.thumbnail || '').replace('-I.', '-B.'),
          condition: condition ? condition.value_name : this.item.condition,
          free_shipping: this.item.shipping.free_shipping,
          sold_quantity: this.item.sold_quantity,
          description: this.itemDescription.text || this.itemDescription.plain_text,
        },
      };
    } else {
      statusCode = 404;

      response = {
        error: 'No results',
      };
    }

    res
      .status(statusCode)
      .type('json')
      .send(response);
  },
};

module.exports = api;
