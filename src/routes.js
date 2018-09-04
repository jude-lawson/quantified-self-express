import FoodsController from './controllers/foods_controller';
import MealsController from './controllers/meals_controller';
import MealFoodsController from './controllers/MealFoodsController';
import FavoriteFoodsController from './controllers/FavoriteFoodsController';

import express from 'express';
const router = express.Router();

//Root
router.get('/', (request, response) => { response.send('Quantified Self Express API'); });

// Foods & Favorite Foods
router.get('/api/v1/foods', (request, response) => { FoodsController.index(request, response) });
router.get('/api/v1/foods/:id', (request, response) => { FoodsController.show(request, response) });
router.post('/api/v1/foods', (request, response) => { FoodsController.create(request, response) });
router.patch('/api/v1/foods/:id', (request, response) => { FoodsController.update(request, response) });
router.delete('/api/v1/foods/:id', (request, response) => { FoodsController.destroy(request, response) });

router.get('/api/v1/favorite_foods', (request, response) => { FavoriteFoodsController.index(request, response) });

// Meals
router.get('/api/v1/meals', (request, response) => { MealsController.index(request, response); });
router.get('/api/v1/meals/:meal_id/foods', (request, response) => { MealsController.show(request, response) });

//MealFoods
router.post('/api/v1/meals/:meal_id/foods/:id', (request, response) => { MealFoodsController.create(request, response) });
router.delete('/api/v1/meals/:meal_id/foods/:id', (request,response) => { MealFoodsController.destroy(request, response) });

export default router;
