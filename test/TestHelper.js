import { database } from '../src/config'
import foods from '../fixtures/for_seeds/foods';
import meals from '../fixtures/for_seeds/meals';
import meal_foods from '../fixtures/for_seeds/meal_foods';

class TestHelper {
  static async testSeed() {
    return Promise.all([
      await database.raw('DELETE FROM meal_foods'),
      await database.raw('ALTER SEQUENCE meal_foods_id_seq RESTART WITH 1'),
      await database.raw('DELETE FROM foods'),
      await database.raw('ALTER SEQUENCE foods_id_seq RESTART WITH 1'),
      await database.raw('DELETE FROM meals'),
      await database.raw('ALTER SEQUENCE meals_id_seq RESTART WITH 1'),
    
      // Create foods
      await database.raw(`INSERT INTO foods (name, calories)
                          VALUES (?,?)
                          RETURNING id`, [foods[0].name, foods[0].calories]),
      await database.raw(`INSERT INTO foods (name, calories)
                          VALUES (?,?)
                          RETURNING id`, [foods[1].name, foods[1].calories]),
      await database.raw(`INSERT INTO foods (name, calories)
                          VALUES (?,?)
                          RETURNING id`, [foods[2].name, foods[2].calories]),
      await database.raw(`INSERT INTO foods (name, calories)
                          VALUES (?,?)
                          RETURNING id`, [foods[3].name, foods[3].calories]),

      // Create meals
      await database.raw(`INSERT INTO meals (name)
                      VALUES (?)`, [meals[0].name]),
      await database.raw(`INSERT INTO meals (name)
                      VALUES (?)`, [meals[1].name]),
      await database.raw(`INSERT INTO meals (name)
                      VALUES (?)`, [meals[2].name]),
      await database.raw(`INSERT INTO meals (name)
                      VALUES (?)`, [meals[3].name]),

      // Create meal_foods
      await database.raw(`INSERT INTO meal_foods (meal_id, food_id)
                      VALUES (?,?)`, [meal_foods[0].meal_id, meal_foods[0].food_id]),
      await database.raw(`INSERT INTO meal_foods (meal_id, food_id)
                      VALUES (?,?)`, [meal_foods[1].meal_id, meal_foods[1].food_id]),
      await database.raw(`INSERT INTO meal_foods (meal_id, food_id)
                      VALUES (?,?)`, [meal_foods[2].meal_id, meal_foods[2].food_id]),
      await database.raw(`INSERT INTO meal_foods (meal_id, food_id)
                      VALUES (?,?)`, [meal_foods[3].meal_id, meal_foods[3].food_id])
    ]);
  }
}

export default TestHelper;
