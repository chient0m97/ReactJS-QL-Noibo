var knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'hcm',
        database: 'hcm',
        //host: '103.74.123.193',
        host: 'fscvn.ddns.net',
        password: 'admin',
<<<<<<< HEAD
        //password: 'Admin123!@#',
=======
>>>>>>> 73bcd386d2174757e8877c4007d6b9ad2487c7ad
        port: 5432,
        max: 10
    }
})

module.exports = knex