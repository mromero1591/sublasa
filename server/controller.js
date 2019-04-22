const gmailController = require('./gmailController');

module.exports = {
    getNewsLetters: function(req,res,next) {
        gmailController.runEmailController(req.app);
        var dbInstance = req.app.get('db');
        dbInstance.get_newsletters()
        .then(newsLetters => {
            res.status(200).send(newsLetters);
        }).catch(err => {
            res.sendStatus(500);
        })
        
    },
    getArticles: function(req,res,next) {
        
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
        var dbInstance = req.app.get('db');

        dbInstance.get_topics()
        .then(articles => {
            res.status(200).send(articles);
        }).catch(err => {
            console.log('error in getting topics:', err);
            res.sendStatus(500);
        })
    }
}