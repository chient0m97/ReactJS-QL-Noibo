var knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'hcm',
        database: 'hcm',
        // host: '103.74.123.193',
        host: 'fscvn.ddns.net',
        password: 'admin',
        port: 5432,
        max: 10
    }
})

module.exports = knex