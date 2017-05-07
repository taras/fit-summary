const get = require('lodash.get');
const assert = require('assert');

module.exports = class Base {
  value(config) {
    let value = get(config, this.path);

    assert(value, `Could not retrieve ${this.path}`);

    return Number(value.fitarea);
  }
}