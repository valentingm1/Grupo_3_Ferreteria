function guestMiddlware(req,res,next){
<<<<<<< HEAD
    if(req.session.userLogged){
         return res.redirect("/")
    }
    next()
=======
     if(req.session.userLogged){
         return res.redirect("/")
     }
     next()
>>>>>>> ad8cf7b966917410cc09fe1caa426938664a3745
}

module.exports = guestMiddlware;