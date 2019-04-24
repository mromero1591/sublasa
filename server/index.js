require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const articlesController = require('./controller');

const app = express();
app.use(bodyParser.json());

//ENVIORMENT VARIABLES
const {SERVER_PORT, 
    DATABASE_URI,
    DATABASE_USER,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT
} = process.env;

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
}).catch(err => {
    console.log('There was an erorr in connecting to the db:', err);
});

app.get('/api/newsletters', articlesController.getNewsLetters);
app.get('/api/articles', articlesController.getArticles);
app.get('/api/topics', articlesController.getTopics);
app.get('/api/newletters/:id', articlesController.getNewsLettersByTopic);
app.get('/api/newsletter/:id/articles', articlesController.getArticlesByNewsletter);

app.listen(SERVER_PORT, function() {
    console.log('listening on Port:', SERVER_PORT);
});