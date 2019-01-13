/* eslint-disable */
(function(window) {
  function defaults(target, obj) {
    for (let prop in obj) target[prop] = target[prop] || obj[prop];
  }

  function getQuery(queryParams) {
    let arr = Object.keys(queryParams).map(k => {
      return k + '=' + encodeURIComponent(queryParams[k]);
    });
    return `?${arr.join('&')}`;
  }

  function _fetch(method, url, opts, data, queryParams) {
    opts.method = method;
    opts.headers = opts.headers || {};
    opts.responseAs = opts.responseAs && ['json', 'text', 'response'].indexOf(opts.responseAs) >= 0 ? opts.responseAs : 'json';

    defaults(opts.headers, {
      // Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    if (queryParams) {
      url += getQuery(queryParams);
    }

    if (data) {
      if (opts.headers['Content-Type'] === 'application/json') {
        opts.body = JSON.stringify(data);
      } else {
        opts.body = data;
      }
    } else {
      delete opts.body;
    }

    return httpRequest.fetch(url, opts).then(response => {
      if (response.status >= 200 && response.status < 300) {
        if (opts.responseAs === 'response') return response;
        if (response.status === 204) return null;
        return response[opts.responseAs]();
      }
      var err = new Error(response.statusText);
      err.response = response;
      throw err;
    });
  }

  function httpRequest(url, opts) {
    opts = opts || {};

    let _ = (u, o) => {
      // Extend parameters with previous ones
      u = `${url}/${u}`;
      o = o || {};
      defaults(o, opts);
      return httpRequest(u, o);
    };

    _.get = queryParams => {
      return _fetch('GET', url, opts, null, queryParams);
    };

    _.post = data => {
      return _fetch('POST', url, opts, data);
    };

    _.put = data => {
      return _fetch('PUT', url, opts, data);
    };

    _.patch = data => {
      return _fetch('PATCH', url, opts, data);
    };

    _.delete = () => {
      return _fetch('DELETE', url, opts);
    };

    return _;
  }

  // Expose fetch so that other polyfills can be used
  // Bind fetch to window to avoid TypeError: Illegal invocation
  httpRequest.fetch = typeof fetch !== 'undefined' ? fetch.bind(window) : null;

  // Support CommonJS, AMD & browser
  if (typeof exports === 'object') {
    module.exports = httpRequest;
  } else if (typeof define === 'function' && define.amd) {
    // eslint-disable-line
    define(() => {
      return httpRequest;
    }); // eslint-disable-line
  } else {
    window.httpRequest = httpRequest;
  }
})(typeof window !== 'undefined' ? window : undefined);
