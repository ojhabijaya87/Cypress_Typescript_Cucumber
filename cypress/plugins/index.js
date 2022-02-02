const webpack = require("@cypress/webpack-preprocessor");
const fs = require('fs-extra')
const path = require('path')
const allureWriter = require("@shelex/cypress-allure-plugin/writer");


module.exports = (on,config) => {
  const options = {
    webpackOptions: require("../webpack.config.js")
  };
  on("file:preprocessor", webpack(options));
  require('cypress-mochawesome-reporter/plugin')(on);
  return processConfig(on, config)
};



function processConfig(on, config) {

  const file = config.env.configFile || 'qa'
  return getConfigurationByFile(file).then(function(file) {
    if (config.env.configFile === 'development') {
      if (!process.env.URI_ROOT) {
        throw new Error('URI_ROOT not set - export URI_ROOT=http://yourlocalhost.com');
      }
      // append the URI_ROOT to the baseUrl
      file.baseUrl = file.baseUrl + process.env.URI_ROOT
    }
    // always return the file object
    return file
  })
}

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)
  return fs.readJson(pathToConfigFile)
}
