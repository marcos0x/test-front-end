import numeral from 'numeral';

export class Util {
  constructor() {
    if (numeral.locale() !== 'ar') {
      numeral.register('locale', 'ar', {
        delimiters: {
          thousands: '.',
          decimal: ','
        },
        abbreviations: {
          thousand: 'k',
          million: 'm',
          billion: 'b',
          trillion: 't'
        },
        ordinal: number => (number === 1 ? 'er' : 'eros'),
        currency: {
          symbol: '$'
        }
      });

      numeral.locale('ar');
    }
  }

  number = value => numeral(value.toString().replace('.', ','));

  getQueryString(location) {
    const pairs = location.search.slice(1).split('&');
    const result = {};

    pairs.forEach((pair) => {
      pair = pair.split('='); // eslint-disable-line
      result[pair[0]] = decodeURIComponent((pair[1] || '').replace('+', ' '));
    });

    return result;
  }
}

export default new Util();
