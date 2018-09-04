import RecipeService from '../services/RecipeService';
import QueryService from '../services/QueryService';

class Recipe {
  static async getRecipes(food_id) {
    let food = await QueryService.aFood(food_id)
    let food_name = food.rows[0].name.toLowerCase();
    let search_results = await RecipeService.searchRecipes(food_name);
    debugger
    let recipes = search_results.matches.map((recipe) => {
      return { name: recipe.recipeName, url: `https://www.yummly.com/recipe/${recipe.id}`}
    });

    return { status: 200, data: { recipes: recipes } }
  }
}

export default Recipe;
