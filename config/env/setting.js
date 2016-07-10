'use strict';

var _ = require('lodash');
var env = process.env.NODE_ENV || 'development';

try {
  var config = require(`./${env}.js`);
}
catch (err) {
  console.log(`Error!! Unable to read file ${env}.js!`);
  console.log(`Please set the file by taking reference to ${env}.js.sample file.`);
  throw new Error(err);
}

function setEnvironmentVariable(config) {
  _.keys(config).forEach(function (configKey) {
    if (typeof(config[configKey]) === 'object') {
      setEnvironmentVariable(config[configKey]);
    }
    else {
      process.env[configKey] = config[configKey];
    }
  });
}

setEnvironmentVariable(config);