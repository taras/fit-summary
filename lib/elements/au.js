// get function receives an object and path.
// return value from the object on given path
// Example:
//  let obj = { name: 'gabby' }
//  let value = get(obj, 'name');
//  console.log(value) // => 'gabby'
const get = require('lodash.get');
const assert = require('assert');

module.exports = class Au {
  static get name() {
    return 'Au';
  }

  value(config) {
    // extract value of L3M4 from config at "result.Au L3.L3M4"
    let L3M4 = get(config, 'result.Au L3.L3M4');
    // extract value from L3M5 from config at "result.Au L3.L3M5"
    let L3M5 = get(config, 'result.Au L3.L3M5');

    // checking that value was retrived, otherwise show an error
    assert(L3M4, `Could not retrieve Au L3M4`);
    assert(L3M5, `Could not retrieve Au L4M5`);

    return Number(L3M4.fitarea) + Number(L3M5.fitarea);
  }
}