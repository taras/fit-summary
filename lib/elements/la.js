const get = require('lodash.get');
const assert = require('assert');

module.exports = class La {
  static get name() {
    return 'La';
  }

  value(config) {
    let L3M4 = get(config, 'result.La L3.L3M4', get(config, 'result.La L.L3M4*'));
    let L3M5 = get(config, 'result.La L3.L3M5', get(config, 'result.La L.L3M5*'));

    assert(L3M4, `Could not retrieve La L3M4`);
    assert(L3M5, `Could not retrieve La L4M5`);

    return Number(L3M4.fitarea) + Number(L3M5.fitarea);
  }
}