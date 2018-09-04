import Recipe from '../models/Recipe'

class RecipesController {
  static async show(request, response) {
    return await Recipe.getRecipes(request.params.id)
  }
}

export default RecipesController;
