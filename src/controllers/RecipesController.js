import Recipe from '../models/Recipe'

class RecipesController {
  static async show(request, response) {
    let result = await Recipe.getRecipes(request.params.id)
    response.status(result.status).json(result.data)
  }
}

export default RecipesController;
