'use strict';

var environment = process.env.NODE_ENV || 'development';
var configuration = require('../knexfile')[environment];

module.exports = {
  environment: environment,
  configuration: configuration,
  database: require('knex')(configuration)
};
//# sourceMappingURL=config.js.map