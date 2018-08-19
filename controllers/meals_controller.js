import Meal from '../models/Meal'

class MealsController {
  static async index(request, response) {
    let meals = await Meal.getAllMeals();
    response.status(200).json(meals);
  }
}

export default MealsController;
