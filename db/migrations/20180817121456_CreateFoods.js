
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('foods', table => {
      table.increments('id').primary();
      table.string('name')
      table.integer('calories').unsigned();
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('foods')
  ]);
};
