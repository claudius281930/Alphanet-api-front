function auth(req,res,next){
    if(typeof(req.session.user) != "undefined"){
        return next();
    }else{
        return res.send("O usuário não tem privilegios para acessar está página!");
    }
};

module.exports = auth;