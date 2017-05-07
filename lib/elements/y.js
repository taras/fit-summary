let Base = require('./base');

module.exports = class Y extends Base {
  static get name() {
    return 'Y';
  }

  get path() {
    return `result.Y Ka`;
  }
}