
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meal_foods', table => {
      table.increments('id').primary();
      table.integer('meal_id').unsigned();
      table.foreign('meal_id').references('meals.id');
      table.integer('food_id').unsigned();
      table.foreign('food_id').references('foods.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('meal_foods')
  ]);
};
