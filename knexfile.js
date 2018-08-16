// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection:  'postgres://localhost/quantified_self_express_development',
    migrations: {
      directory: './db/migrations'
    },
    userNullAsDefault: true
  },
};
