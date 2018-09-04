import { database } from '../config';

class QueryService {
  // Food Related Queries
  static async allFoods() {
    return await database('foods').select()
  }

  static async aFood(food_id) {
    return await database.raw(`SELECT foods.* FROM foods WHERE foods.id=?`, [food_id]);
  }

  static async createFood(new_food_data) {
    return await database.raw(`INSERT INTO foods (name, calories) VALUES (?, ?)
                               RETURNING id, name, calories` , 
                               [new_food_data.name, new_food_data.calories])
  }

  static async updateFood(updated_food_data, food_id) {
    return await database.raw(`UPDATE foods SET name=?, calories=?
                               WHERE foods.id=? RETURNING id, name, calories`,
                               [updated_food_data.name, updated_food_data.calories, food_id])
  }

  static async getFoodCounts() {
    return await database.raw(`SELECT foods.*, COUNT(foods.id) AS food_count FROM meal_foods
                               INNER JOIN foods ON meal_foods.food_id = foods.id
                               GROUP BY foods.id
                               ORDER BY food_count DESC
                               LIMIT 5`)
  }

  static async deleteFoodToMealAssociation(food_id) {
    return await database.raw('DELETE FROM meal_foods WHERE meal_foods.food_id=?', [food_id])
  }

  static async deleteFood(food_id) {
    return await database.raw('DELETE FROM foods WHERE foods.id=?', [food_id])
  }

  // Meal Queries

  static async aMeal(meal_id) {
    return await database.raw('SELECT * FROM meals WHERE meals.id=? LIMIT 1', [meal_id])
  }

  static async allMeals() {
    return await database.raw(`SELECT meals.id, meals.name, json_agg(foods.*) AS foods FROM meal_foods
                               INNER JOIN meals ON meal_foods.meal_id=meals.id
                               INNER JOIN foods ON meal_foods.food_id=foods.id
                               GROUP BY meals.id`)
  }

  static async distinctMealsThatHaveFoods() {
    return await database.raw(`SELECT DISTINCT meals.* from meal_foods
                               INNER JOIN meals on meal_foods.meal_id=meals.id`)
  }

  static async aMealsFoods(meal_id) {
    return await database.raw(`SELECT foods.* from meal_foods
                               INNER JOIN foods on meal_foods.food_id=foods.id
                               WHERE meal_foods.meal_id=?`, [meal_id])
  }

  static async aMealAndAllItsFoods(meal_id) {
    return await database.raw(`SELECT meals.id AS meal_id, meals.name AS meal_name,
                                foods.id AS food_id, foods.name AS food_name, foods.calories
                              FROM meal_foods
                              INNER JOIN meals on meal_foods.meal_id=meals.id
                              INNER JOIN foods on meal_foods.food_id=foods.id
                              WHERE meal_foods.meal_id=?`, [meal_id])
  }

  // Meal Food Queries

  static async createMealFood(meal_id, food_id) {
    return await database.raw(`INSERT INTO meal_foods (meal_id, food_id)
                               VALUES (?, ?)`, [meal_id, food_id])
  }

  static async removeMealFood(meal_id, food_id) {
    return await database.raw(`DELETE FROM meal_foods
                               WHERE meal_foods.meal_id=?
                               AND meal_foods.food_id=?`, [meal_id, food_id])
  }
}

export default QueryService;

