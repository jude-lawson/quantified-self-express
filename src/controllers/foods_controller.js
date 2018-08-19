import Food from '../models/Food';

class FoodsController {
  static async index(request, response) {
    let foods = await Food.getAllFoods();
    response.status(200).json(foods);
  }

  static async show(request, response) {
    let food_id = request.params.id;
    let food = await Food.getSingleFood(food_id);
    response.status(200).json(food);
  }
}

export default FoodsController;
