// import ApplicationModel from './ApplicationModel';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Food  {
  static async getAllFoods() {
    return await database('foods').select()
  }
}

export default Food;
