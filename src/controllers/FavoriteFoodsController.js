import Food from '../models/Food'

class FavoriteFoodsController {
  static async index(request, response) {
    let result = await Food.getFavorites();
    debugger
    response.status(result.status).json(result.data)
  }
}

export default FavoriteFoodsController;
