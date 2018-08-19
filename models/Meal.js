const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Meal {
  static async getAllMeals() {
    try {
    let meals = await database.raw(`SELECT DISTINCT meals.* from meal_foods
                                    INNER JOIN meals on meal_foods.meal_id=meals.id`);

    let meal_foods = await Promise.all(meals.rows.map(async (meal) => {
      let result = await database.raw(`SELECT foods.* from meal_foods
                    INNER JOIN foods on meal_foods.food_id=foods.id
                    WHERE meal_foods.meal_id=?`, [meal.id])
      return {
        id: meal.id,
        name: meal.name,
        foods: result.rows
      }
    }));

    return meal_foods.sort((a,b) => {
      return a.id - b.id;
    });
    } catch(error) {
      return error;
    }
  }
}

export default Meal;
