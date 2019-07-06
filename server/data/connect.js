const pg = require('pg');

const pool = new pg.Pool({
    user: 'hcm',
    database: 'hcm',
    host: '103.74.123.193',
    password: 'Admin123!@#',
    port: 5432,
    max: 10
})
module.exports = pool;