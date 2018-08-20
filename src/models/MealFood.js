// const environment = process.env.NODE_ENV || 'development';
// const configuration = require('../../knexfile')[environment];
// const database = require('knex')(configuration);
import { database } from '../config';

import QueryService from '../services/QueryService';

class MealFood {
  static async addFoodToMeal(meal_id, food_id) {
    let meal = await QueryService.aMeal(meal_id);
    let food = await QueryService.aFood(food_id);

    if (!food.rowCount) {
      return { status: 404, data: { error: 'Food could not be found' } };
    } else if (!meal.rowCount) {
      return { status: 404, data: {error: 'Meal could not be found' } };
    } else {
      let result = await QueryService.createMealFood(meal_id, food_id)
      return { status: 201, data: { message: `Successfully added ${food.rows[0].name} to ${meal.rows[0].name }` } };
    }
  }

  static async removeFoodFromMeal(meal_id, food_id) {
    let meal = await QueryService.aMeal(meal_id);
    let food = await QueryService.aFood(food_id);

    if (!food.rowCount) {
      return { status: 404, data: { error: 'Food could not be found' } };
    } else if (!meal.rowCount) {
      return { status: 404, data: {error: 'Meal could not be found' } };
    } else {
      let result = await QueryService.removeMealFood(meal_id, food_id)
      return { status: 200, data: { message: `Successfully removed ${food.rows[0].name} from ${meal.rows[0].name}` } };
    }
  }
}

export default MealFood;
