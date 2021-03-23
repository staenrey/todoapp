const pgp = require("pg-promise")() // require('pg-promise') returns a function that we immediately call, and store the result in a pgp var

// database connection object
const connection = {
    host: 'localhost', // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database: 'todolist',
    user: 'staenrey',
    password: '12345'
};

const db = pgp(connection)
module.exports = db