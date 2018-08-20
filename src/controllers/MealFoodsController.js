import MealFood from '../models/MealFood'

class MealFoodsController {
  static async create(request, response) {
    let result = await MealFood.addFoodToMeal(request.params.meal_id, request.params.id);
    response.status(result.status).json(result.data);
  }

  static async destroy(request, response) {
    let result = await MealFood.removeFoodFromMeal(request.params.meal_id, request.params.id);
    response.status(result.status).json(result.data);
  }
}

export default MealFoodsController;
