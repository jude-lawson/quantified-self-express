// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection:  'postgres://localhost/quantified_self_express_development',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/development'
    },
    userNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/quantified_self_express_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/development'
    },
    userNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    userNullAsDefault: true
  }
};
