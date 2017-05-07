const Funnel = require('broccoli-funnel');
const path = require('path');

module.exports = function dropDirectories(node) {
  return new Funnel(node, {
    include: ['**/*.txt'], // select all text files

    // getDestinationPath returns path for new file
    getDestinationPath(relativePath) {
      // path.basename returns just the name of the file (without directory)
      // by returning filename without directory, the file structure is flattened
      return path.basename(relativePath);
    }
  })
}