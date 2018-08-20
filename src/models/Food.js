import QueryService from '../services/QueryService';

class Food {
  static async getAllFoods(request, response) {
    return await QueryService.allFoods();
  }

  static async getSingleFood(food_id) {
    try {
      let food = await QueryService.aFood(food_id);
      return food.rows[0];
    } catch(error) {
      return error;
    }
  }

  static async createFood(new_food_data) {
    if (!new_food_data.name) {
      return { status: 400, data: { error: 'Name attribute is required' } };
    } else if (!new_food_data.calories) {
      return { status: 400, data: { error: 'Calories attribute is required' } };
    } else {
      try {
        let created_food = await QueryService.createFood(new_food_data);
        return { status: 200, data: created_food.rows[0] };
      } catch(error) {
        return { status: 400, data: { error: error } };
      }
    }
  }

  static async updateFood(updated_food_data, food_id) {
    try {
      let updated_food = await QueryService.updateFood(updated_food_data, food_id);
      return { status: 200, data: updated_food.rows[0] };
    } catch(error) {
      return { status: 400, data: { error: error } };
    }
  }

  static async destroyFood(food_id) {
    await QueryService.deleteFoodToMealAssociation(food_id);
    let result = await QueryService.deleteFood(food_id);
    if (!result.rowCount) {
      return { status: 404, data: { error: 'Food not found' } } 
    } else {
      return { status: 204 }
    }
    
  }
}

export default Food;
