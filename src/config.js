const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]

module.exports = {
  environment: environment,
  configuration: configuration,
  database: require('knex')(configuration)
}
