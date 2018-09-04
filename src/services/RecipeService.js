import fetch from 'node-fetch';

var yummly_app_id;
var yummly_app_key;
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === undefined) {
  yummly_app_id = require('../../secrets').yummly_app_id;
  yummly_app_key =  require('../../secrets').yummly_app_key;
} else {
  yummly_app_id = ENV['YUMMLY_APP_ID'];
  yummly_app_id = ENV['YUMMLY_APP_KEY'];
}

const banana_search_yummly = require('../../fixtures/for_tests/banana_search_yummly');
const onion_soup_search_yummly = require('../../fixtures/for_tests/onion_soup_search_yummly');

class RecipeService {
  static async searchRecipes(food_name) {
    if (process.env.NODE_ENV === 'test' && food_name === "banana") {
      var parsedResponse = banana_search_yummly
    } else if (process.env.NODE_ENV === "test" && food_name === "onion+soup") {
      var parsedResponse = onion_soup_search_yummly
    } else {
      let response = await fetch(`http://api.yummly.com/v1/api/recipes?_app_id=${yummly_app_id || process.env.YUMMLY_APP_ID}&_app_key=${yummly_app_key || process.env.YUMMLY_APP_KEY}&q=${food_name}`)
      var parsedResponse = await response.json();
    }
    return await parsedResponse;
  }
}

export default RecipeService;
