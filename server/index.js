require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const localStratagy = require('passport-local');
const bcrypt = require('bcrypt');
const articlesController = require('./Controllers/controller');
const authController = require('./Controllers/authController');
const app = express();
app.use(bodyParser.json());

app.use( express.static( `${__dirname}/../build` ));


//ENVIORMENT VARIABLES
const {SERVER_PORT, 
    DATABASE_URI,
    DATABASE_USER,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    SESSION_SECRET
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


//Authentication
passport.use('register', new localStratagy({
    passReqToCallback: true},
    (req,username,password,done) => {
        const dbInstance = app.get('db');
        var email = req.body.email;
        dbInstance.find_user([email])
        .then(users => {
            if(users.length > 0) {
                return done('User already exist');
            }

            bcrypt.hash(password, 15, (err, hashedPassword) => {
                if(err) {
                    return done('System Failure');
                }

                var {email} = req.body;

                dbInstance.create_user([email, hashedPassword])
                .then( ([user]) => {
                    delete user.password;
                    done(null, user);
                }).catch(err => {
                    console.warn(err);
                    done('System Failure');
                })
            });
    
        }).catch(err => {
            console.warn('error in getting user:', err);
            done('system Faliure');
        })
    }));

passport.use('login', new localStratagy({ usernameField: 'email' }, (email, password, done) => {
    const db = app.get('db');
    
    db.users.find({ email })
        .then(users => {
            if (users.length == 0) {
                return done('Username or password is incorrect');
            }

            const user = users[0];

            bcrypt.compare(password, user.password, (err, isSame) => {
                if (err) {
                    return done('System failure');
                }

                if (!isSame) {
                    return done('Username or password is incorrect');
                }

                delete user.password;

                done(null, user);
            });
        })
        .catch(err => {
            console.warn(err);
            done('System failure');
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const dbInstance = app.get('db');

    dbInstance.users.find(id)
        .then(user => {
            if (!user) return done(null, undefined);

            delete user.password;

            return done(null, user);
        })
        .catch(err => {
            console.warn(err);
            done('System Failure');
        });
});

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/auth/register', passport.authenticate('register'), authController.register,authController.authError);
app.post('/auth/login', passport.authenticate('login'), authController.login,authController.authError);
app.get('/auth/logout', authController.logout);

app.get('/api/newsletters', articlesController.getNewsLetters);
app.get('/api/newletters/:id', articlesController.getNewsLettersByTopic);
app.get('/api/articles', articlesController.getArticles);
app.get('/api/topics', articlesController.getTopics);
app.get('/api/newsletter/:id', articlesController.getAllNewsLetterArticles);
app.get('/api/newsletter/:id/articles', articlesController.getArticlesByNewsletter);
app.get('/api/articles/:id', articlesController.getArticleById);
app.get('/api/subscribed/newsletters', articlesController.getSubscribedNewsLetters);
app.post('/api/subscribe/:id', articlesController.subscribeToNewsLetter);

app.listen(SERVER_PORT, function() {
    console.log('listening on Port:', SERVER_PORT);
});