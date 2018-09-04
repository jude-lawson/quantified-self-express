import fetch from 'node-fetch';
import { yummly_app_id, yummly_app_key } from '../../secrets';
const banana_search_yummly = require('../../fixtures/for_tests/banana_search_yummly');
const onion_soup_search_yummly = require('../../fixtures/for_tests/onion_soup_search_yummly');

class RecipeService {
  static async searchRecipes(food_name) {
    if (process.env.NODE_ENV === 'test' && food_name === "banana") {
      var parsedResponse = banana_search_yummly
    } else if (process.env.NODE_ENV === "test" && food_name === "onion+soup") {
      var parsedResponse = onion_soup_search_yummly
    } else {
      let response = await fetch(`http://api.yummly.com/v1/api/recipes?_app_id=${yummly_app_id}&_app_key=${yummly_app_key}&q=${food_name}`)
      var parsedResponse = await response.json();
    }
    return await parsedResponse;
  }
}

export default RecipeService;
