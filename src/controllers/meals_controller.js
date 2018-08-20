import Meal from '../models/Meal'

class MealsController {
  static async index(request, response) {
    let meals = await Meal.getAllMeals();
    response.status(200).json(meals);
  }

  static async show(request, response) {
    let result = await Meal.getMealAndFoods(request.params.meal_id);
    response.status(result.status).json(result.data);
  }
}

export default MealsController;
