const concat = require('broccoli-concat');

module.exports = function createCSV(node, elements, output) {
  let columns = elements.map(element => element.name).join(',');
  let header = ['Filename'].concat(columns);
  
  return concat(node, {
    outputFile: `/${output}.csv`,
    header: `${header}\n`,
    inputFiles: ['**/*.txt']
  });
}