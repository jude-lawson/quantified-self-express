import QueryService from '../services/QueryService';


class Meal {
  static async getAllMeals() {
      let result = await QueryService.allMeals();
      return result.rows
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
