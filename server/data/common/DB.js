var knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'hcm',
        database: 'hcm',
        host: 'fscvn.ddns.net',
        password: 'Admin123!@#'
    }
})

module.exports = knex