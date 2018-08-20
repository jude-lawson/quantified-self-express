import QueryService from '../services/QueryService';


class Meal {
  static async getAllMeals() {
    let meals = await QueryService.distinctMealsThatHaveFoods();

    let meal_foods = await Promise.all(meals.rows.map(async (meal) => {
      let result = await QueryService.aMealsFoods(meal.id);
      return { id: meal.id, name: meal.name, foods: result.rows }
    }));

    return meal_foods.sort((a,b) => {
      return a.id - b.id;
    });
  }

  static async getMealAndFoods(meal_id) {
    let result = await QueryService.aMealAndAllItsFoods(meal_id)
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
