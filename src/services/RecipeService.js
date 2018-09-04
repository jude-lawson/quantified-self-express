import fetch from 'node-fetch';
import { yummly_app_id, yummly_app_key } from '../../secrets';

class RecipeService {
  static async searchRecipes(food_name) {
    // return await fetch(`http://api.yummly.com/v1/api/recipes?_app_id=${yummly_app_id}&_app_key=${yummly_app_key}&q=${food_name}`)
    let response = await fetch(`http://backend.turing.io/module4`);
    let parsedResponse = await response.text();
    debugger
    return await parsedResponse;
  }
}

export default RecipeService;
