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
    let result = await Food.createFood(new_food_data); 
    response.status(result.status).json(result.data);
  }

  static async update(request, response) {
    let updated_food_data = request.body.food;
    let result = await Food.updateFood(updated_food_data, request.params.id);
    response.status(result.status).json(result.data);
  }
}

export default FoodsController;
