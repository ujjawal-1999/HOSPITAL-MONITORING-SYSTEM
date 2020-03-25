var jwt = require('jsonwebtoken');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch1');
  }

const authngo=function(req,res,next){
if(localStorage.getItem("ngotoken")){
    next();
}
else{
    res.redirect("/ngo/");
}
}

module.exports = authngo;