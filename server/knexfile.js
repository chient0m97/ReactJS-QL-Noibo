// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'hcm',
      database: 'hcm',
      host: '103.74.123.193',
      password: 'Admin123!@#',
      port: 5432,
      max: 10
  },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: 'migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      user: 'hcm',
      database: 'hcm',
      host: '103.74.123.193',
      password: 'Admin123!@#',
      port: 5432,
      max: 10
  },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations',
      tableName: 'knex_migrations'
    }
  }

};
