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

  static async createFood(new_food_data) {
    let created_food = await database.raw(`INSERT INTO foods (name, calories)
                                           VALUES (?, ?)
                                           RETURNING id, name, calories` , [new_food_data.name, new_food_data.calories]);
    return created_food;
  }
}

export default Food;
