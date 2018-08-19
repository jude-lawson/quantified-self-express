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

  static async create(request, response) {
    let new_food_data = request.body.food;
    let new_food = await Food.createFood(new_food_data); 
    response.status(200).json(new_food.rows[0]);
  }
}

export default FoodsController;
