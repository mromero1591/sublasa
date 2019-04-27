const gmailController = require('../gmailController');

module.exports = {
    getNewsLetters: function(req,res,next) {
        //Purpose: Get all the newsletters in the database
        //Params: req: the request from the front end
        //Returns: all newsletters from the database as an array.
        //Outcome: none
        gmailController.runEmailController(req.app);
        
        var currentUser;
        if(req.session && req.session.user) {
            currentUser = req.session.user;
        }
        
        var dbInstance = req.app.get('db');
        
        dbInstance.get_newsletters()
        .then(newsLetters => {
            var loggedIn = currentUser ? true : false;
            res.status(200).send({newsletters: newsLetters, loggedIn: loggedIn});
        }).catch(err => {
            res.sendStatus(500);
        })        
    },

    getSubscribedNewsLetters: function(req,res,next) {
        var currentUser;
        if(req.session && req.session.user) {
            currentUser = req.session.user;
        }
        var dbInstance = req.app.get('db');

        dbInstance.get_newsletters_by_user([currentUser.id])
        .then( newsLetters => {
            console.log(newsLetters);
            res.status(200).send(newsLetters);
        }).catch( err => {
            console.log(err);
            res.status(500).send({errorMessage: 'error in gett newsletter by user'});
        })
        
    },

    getArticles: function(req,res,next) {
        //Purpose: Get all the articles in the database.
        //Params: req: the request from the front end.
        //Returns: all articles from the database as an array.
        //Outcome: none.
        var dbInstance = req.app.get('db');
        
        dbInstance.get_articles()
        .then(function(articles) {
            var convertedArticles = articles.map(function(article) {
                var content = article.content;
                var buff = new Buffer.from(content, 'base64');  
                var convertedContent = buff.toString();

                return {
                    ...article,
                    content: convertedContent
                }
            })
            res.status(200).send(convertedArticles);
        }).catch( function(err) {
            console.log('error in getting articles:', err);
            res.sendStatus(500);
        })
    },
    getTopics: function(req,res,next) {
        //Purpose: Get all the topics in the database
        //Params: req: the request from the front end
        //Returns: all topics from the database as an array.
        //Outcome: none
        var dbInstance = req.app.get('db');

        dbInstance.get_topics()
        .then(articles => {
            res.status(200).send(articles);
        }).catch(err => {
            console.log('error in getting topics:', err);
            res.sendStatus(500);
        })
    },
    getNewsLettersByTopic: function(req,res,next) {
        //Purpose: Get all the newsletters in the database, by topic.
        //Params: req: the request from the front end
        //Returns: all newsletters by topic from the database as an array.
        //Outcome: none
        var dbInstance = req.app.get('db');
        var {id} = req.params;
        dbInstance.get_newsLetters_by_topic(id)
        .then(newsLetters => {
            res.status(200).send(newsLetters);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    },
    getArticlesByNewsletter: function(req,res,next) {
        //Purpose: Get all the articles in the database by newsletter
        //Params: req: the request from the front end
        //Returns: 4 of the most recent newsletters from the database as an array.
        //Outcome: none
        var dbInstance = req.app.get('db');
        var id = parseInt(req.params.id);
        dbInstance.get_articles_by_newsletter(id)
        .then(function(articles) {
            var convertedArticles = articles.map(function(article) {
                var content = article.content;
                var buff = new Buffer.from(content, 'base64');  
                var convertedContent = buff.toString();

                return {
                    ...article,
                    content: convertedContent
                }
            })
            res.status(200).send(convertedArticles);
        }).catch( function(err) {
            console.log('error in getting articles:', err);
            res.sendStatus(500);
        })
    },
    getArticleById: function(req,res,next) {
        //Purpose: Get one article from the databse, by id
        //Params: req: the request from the front end
        //Returns: one article from the databse as an object.
        //Outcome: none
        var dbInstance = req.app.get('db');
        var { id } = req.params;
        dbInstance.get_article(id)
        .then(article => {
            var content = article[0].content;
            var buff = new Buffer.from(content, 'base64');  
            var convertedContent = buff.toString();
            var convertedArticle = {
                ...article[0],
                content: convertedContent
            }
            res.status(200).send(convertedArticle);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    }
}