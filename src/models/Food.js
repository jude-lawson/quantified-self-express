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
    if (!new_food_data.name) {
      return { status: 400, data: { error: 'Name attribute is required' } };
    } else if (!new_food_data.calories) {
      return { status: 400, data: { error: 'Calories attribute is required' } };
    } else {
      try {
        let created_food = await database.raw(`INSERT INTO foods (name, calories)
                                               VALUES (?, ?)
                                               RETURNING id, name, calories` , [new_food_data.name, new_food_data.calories]);
        return { status: 200, data: created_food.rows[0] };
      } catch(error) {
        return { status: 400, data: { error: error } };
      }
    }
  }

  static async updateFood(updated_food_data, food_id) {
    try {
      let updated_food = await database.raw(`UPDATE foods
                                             SET name=?, calories=?
                                             WHERE foods.id=?
                                             RETURNING id, name, calories`, [updated_food_data.name, updated_food_data.calories, food_id])
      return { status: 200, data: updated_food };
    } catch(error) {
      return { status: 400, data: { error: error } };
    }
  }
}

export default Food;
