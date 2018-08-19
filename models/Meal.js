const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Meal {
  static async getAllMeals() {
    return await database('meals').select()
  }
}

export default Meal;
