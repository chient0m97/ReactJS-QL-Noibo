const pg = require('pg');

const pool = new pg.Pool({
    user: 'hcm',
        database: 'hcm',
        host: 'fscvn.ddns.net',
        password: 'Admin123!@#'
})
module.exports = pool;