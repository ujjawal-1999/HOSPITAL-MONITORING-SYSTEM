var jwt = require('jsonwebtoken');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

const auth=function(req,res,next){
if(localStorage.getItem("token")){
    next();
}
else{
    res.redirect("/gov/signin");
}
}

module.exports = auth;