const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

class MealFood {
  static async addFoodToMeal(meal_id, food_id) {
    let food = await database.raw('SELECT * FROM foods WHERE foods.id=? LIMIT 1', [food_id]);
    let meal = await database.raw('SELECT * FROM meals WHERE meals.id=? LIMIT 1', [meal_id]);

    if (!food.rowCount) {
      return { status: 404, data: { error: 'Food could not be found' } };
    } else if (!meal.rowCount) {
      return { status: 404, data: {error: 'Meal could not be found' } };
    } else {
      let result = await database.raw(`INSERT INTO meal_foods (meal_id, food_id)
                                       VALUES (?, ?)`, [meal_id, food_id]);
      return { status: 201, data: { message: `Successfully added ${food.rows[0].name} to ${meal.rows[0].name }` } };
    }
  }
}

export default MealFood;
