// funnel is a way to select files from directories
const Funnel = require('broccoli-funnel');

module.exports = function onlyData(node, extension) {
  return new Funnel(node, {
    include: [`**/*.${extension}`] // select only files that have .2.fit extension
  })
}