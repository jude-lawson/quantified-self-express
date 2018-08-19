import Food from '../models/Food';

class FoodsController {
  static async index(request, response) {
    let foods = await Food.getAllFoods();
    response.status(200).json(foods);
  }
}

export default FoodsController;
