// allow to apply changes to a file with a specific entension
const Filter = require('broccoli-filter');
// library for parsing config files
const ini = require('ini');
const path = require('path');

class FitFilter extends Filter {
  
  get extensions() {
    return ['fit'] // apply this filter to fit files
  }

  get targetExtension() {
    return 'txt'; // resulting file will be a txt file
  }

  constructor(node, options) {
    super(...arguments);

    // creates rules for extracting data from fit files
    this.elements = options.elements.map(element => {
      return new element();
    });
  }

  // processString is called for each file and receives content of the file
  processString(content, relativePath) {
    // content is text from fit file
    // a fit file is a type of a config file
    // parsing the content of fit file with ini parser
    let config = ini.parse(content);

    // pass the config to value method
    let result = this.elements
                  // for every element that we're extracting
                  // get the value from config
                  .map(element => element.value(config));

    let line = path.basename(relativePath, path.extname(relativePath));
    
    // [123, 123] (array)
    // join the results with a comma
    // "123,123" (string)
    return [line].concat(result).join(',');
  }
}

// receives a directory, applies filter, returns filtered directory
module.exports = function extractFit(dir, elements) {
  return new FitFilter(dir, {
    elements
  });
}