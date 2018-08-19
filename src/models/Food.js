const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

class Food  {
  static async getAllFoods(request, response) {
    return await database('foods').select();
  }

  static async getSingleFood(food_id) {
    try {
      let food = await database.raw(`SELECT foods.* FROM foods
                                     WHERE foods.id=?`, [food_id]);
      return food.rows[0];
    } catch(error) {
      return error;
    }
  }
}

export default Food;
