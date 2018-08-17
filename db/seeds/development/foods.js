
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        {
          "id": 1,
          "name": "Banana",
          "calories": 200
        },
        {
          "id": 2,
          "name": "Cookie",
          "calories": 600
        }
      ]);
    });
};
