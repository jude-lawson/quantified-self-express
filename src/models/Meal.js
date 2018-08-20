const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
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

  static async getMealAndFoods(meal_id) {
    let result = await database.raw(`SELECT meals.id AS meal_id, meals.name AS meal_name,
                                            foods.id AS food_id, foods.name AS food_name, foods.calories
                                     FROM meal_foods
                                     INNER JOIN meals on meal_foods.meal_id=meals.id
                                     INNER JOIN foods on meal_foods.food_id=foods.id
                                     WHERE meal_foods.meal_id=?`, [meal_id])
    if (!result.rowCount) {
      return { status: 404, data: { error: 'Meal not found' } }
    } else {
      let meal_foods = result.rows.map(row => {
        return {
          id: row.food_id,
          name: row.food_name,
          calories: row.calories
        }
      });

      return { status: 200, data: { id: result.rows[0].meal_id, name: result.rows[0].meal_name, foods: meal_foods } }
    }
  }
}

export default Meal;
