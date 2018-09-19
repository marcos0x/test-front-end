import httpRequest from '../lib/httpRequest';

const getHeaders = params => ({
  ...params.headers,
  ...{
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  }
});

const onSuccess = ({ response, resolve }) => {
  if (response) {
    if (response.json) {
      return resolve(response.json());
    } else {
      return resolve(response);
    }
  }
};

const onFailure = ({ error, reject }) => {
  if (error.response && error.response.json) {
    error.response.json().then((json) => {
      if (json) {
        return reject(json);
      }
      return reject(error);
    });
  } else {
    return reject(error);
  }
};

export const fetchApi = (endPoint = '', payload = {}, method = 'get', headers = {}) => {
  const url = `${process.env.API_HOST || ''}/api`;
  const options = {
    responseAs: 'response',
    headers: getHeaders({ headers })
  };

  return new Promise((resolve, reject) => {
    httpRequest(`${url}${endPoint}`, options)[method.toLowerCase()](payload)
      .then(response => onSuccess({ response, resolve }))
      .catch(error => onFailure({ error, reject }));
  });
};
