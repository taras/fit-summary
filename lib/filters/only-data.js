// funnel is a way to select files from directories
const Funnel = require('broccoli-funnel');

module.exports = function onlyData(node) {
  return new Funnel(node, {
    include: ['**/*.2.fit'] // select only files that have .2.fit extension
  })
}