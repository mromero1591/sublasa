module.exports = {
    login: (req, res,next) => {
        //set cookie for session
        req.session.user = req.user;
        
        res.send({ message: 'Successfully logged in'});
    },
    register: (req,res,next) => {
        //set cookie for session
        req.session.user = req.user;
        res.send({ message: 'Successfully registered'});
    },

    logout: (req,res,next) => {
        req.session.destroy();
        res.status(200).send({message: 'sucessfully logged out'});
    },
    authError: (err, req, res, next) => {
        res.status(500);
        
        if (err != 'System Failure') {
            res.status(401);
        }
    
        res.send({ message: err });
    }
}