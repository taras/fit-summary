// broccoli is a library for applying transformations to files in directories
const broccoli = require('broccoli');
// broccoli-merge-trees (trees are directores) merge-trees means merging directories 
const mergeTrees = require('broccoli-merge-trees');
// a way to copy a directory from one place to another
// derfeerence ensures that you copy original files not links to files
const copyDereferenceSync = require('copy-dereference').sync;
// library for working with file paths
const path = require('path');

// selects only data files
const onlyData = require('./filters/only-data');
// removes directories from directory 
const dropDirectories = require('./filters/drop-directories');
// extracts data from the fit files
const extractFit = require('./filters/extract-fit');
// combines txt files in directory into one csv file
const createCSV = require('./filters/create-csv');

exports.build = function build(options) {

  let { 
    elements, 
    dirs, 
    outputDir,
    extension 
  } = options;

  // dirs is directories with data that you specified
  // fit-summary --elements=Au,La data-dir-1 data-dir-2
  // dirs=[data-dir-1, data-dir-2]
  let directories = dirs
    // for every directory
    .map(inputDir => {
      // choose the data files
      let data = onlyData(inputDir, extension);
      // extract the fit
      let fit = extractFit(data, elements);
      // remove the directories
      let fitWithoutDirectories = dropDirectories(fit);
      // make output file name
      let output = inputDir.split(path.sep).pop();
      // create the CSV file
      return createCSV(fitWithoutDirectories, elements, output);
    });

  // combine all of the directories and build the actual output
  let builder = new broccoli.Builder(mergeTrees(directories));

  // ok, now build the actual directories
  return builder.build()
    .then(function() {
      // built is complete, copy files from built directory to the output directory
      copyDereferenceSync(builder.outputPath, outputDir)
    })
    .finally(function () {
      // cleanup after the build is complete
      return builder.cleanup()
    });
}