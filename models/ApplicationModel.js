class ApplicationModel {
  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    const configuration = require('../knexfile')[environment];
    this.database =  require('knex')(configuration);  
    console.log(this.database)
  }
  // static database() {
  //   const environment = process.env.NODE_ENV || 'development';
  //   const configuration = require('../knexfile')[environment];
  //   return require('knex')(configuration);
  // }
}

export default ApplicationModel;
