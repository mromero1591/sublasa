require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();
app.use(bodyParser.json());

//ENVIORMENT VARIABLES
const {PORT, 
    DATABASE_URI,
    DATABASE_USER,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT
} = process.env;


// massive({
//     host: 'localhost',
//     port: 5432,
//     database: 'appdb',
//     user: 'appuser',
//     password: 'apppwd',
//     ssl: false,
//     poolSize: 10
//   }).then(instance => {...});

//Connect to databse, and set it to app
massive({
    host: DATABASE_URI,
    port: DATABASE_PORT,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD
})
.then(db => {
    app.set('db', db);
})

app.listen(PORT, function() {
    console.log('listening on Port:', PORT);
})