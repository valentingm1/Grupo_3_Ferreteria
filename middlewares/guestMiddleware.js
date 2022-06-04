function guestMiddlware(req,res,next){
     if(req.session.userLogged){
         return res.redirect("index")
     }
     next()
}

module.exports = guestMiddlware; 