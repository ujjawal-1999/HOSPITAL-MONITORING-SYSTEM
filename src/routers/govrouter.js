const express = require('express');
const moment = require('moment');
// const passport = require('passport');
const govrouter = express.Router();
const auth = require('../middleware/auth');
const {sendEmailToNgoForAcceptance} = require('../account/nodemailer');
//const {sendWelcomeMessage} = require('../account/send_sms');
const NGOPERMISSION = require('../models/ngopermission');
const jwt = require('jsonwebtoken');
const GOVFUND = require('../models/govfund');


govrouter.get('',auth,(req,res)=> {
    res.render("index.ejs");
})

govrouter.get('/requests',auth, (req,res)=> {
    NGOPERMISSION.find((err,data)=>{        
        res.render('response.ejs',{
            data
        })
    })
})



govrouter.get('/funds',auth,(req,res)=>{
    NGOPERMISSION.find((err,data)=>{        
        res.render('funds.ejs',{
            data
        })
    })
})

    

govrouter.get('/invite',auth,(req,res)=>{
    NGOPERMISSION.find((err,data)=>{        
        res.render('invite.ejs',{
            data
        })
    })
})

govrouter.get('/acceptrequest/:id',auth, (req,res)=>{
    const id = req.params.id;
    NGOPERMISSION.findByIdAndUpdate(id, {$set: { 'message': 'The Proposal has been accepted.'}}, (err,data)=>{
        console.log("data for work",data)
        if(!err){
            sendEmailToNgoForAcceptance({data})
            // res.render('portfolio.hbs',{
            //     ngo:data
            // });
            res.redirect("/gov/requests");
        }
    })
})

govrouter.get('/declinerequest/:id',auth, (req,res)=>{
    const id = req.params.id;
    NGOPERMISSION.findByIdAndUpdate(id, {$set: { 'message': 'The Proposal has been accepted.'}}, (err,data)=>{
        console.log("data for work",data)
        if(!err){
            sendEmailToNgoForRejection({data})
            // res.render('portfolio.hbs',{
            //     ngo:data
            // });
            res.redirect("/gov/requests");
        }
    })
})



govrouter.get('/funds/:id',auth,(req,res)=> {
    const id = req.params.id; 
    NGOPERMISSION.findOne({registrationid:id}, (err,data)=>{
        res.render('fForm.ejs',{
            data
        })
    })
})

govrouter.get('/invite/:id',auth,(req,res)=> {
    const id = req.params.id; 
    NGOPERMISSION.findOne({registrationid:id}, (err,data)=>{
        res.render('iForm.ejs',{
            data
        })
    })
})

govrouter.get('/ngo/all',auth,(req,res)=>{
    NGOPERMISSION.find((err,data)=>{        
        res.render('allNgo.ejs',{
            data
        })
    })
})

govrouter.get("/logout",(req,res)=>{
    localStorage.removeItem("token");
    res.redirect("/gov/signin");
})

govrouter.get("/signin",(req,res)=>{
    res.render("signIn");
})

govrouter.post("/signin",(req,res)=>{
    let email="ankitsrivastava21598@gmail.com";
    let password="password";
    var token = jwt.sign({ password: password}, 'shhhhh');
   if(req.body.email==email&&req.body.password==password){    
      localStorage.setItem('token',token);
          res.render('index.ejs')
    }
    else{
        res.redirect("/gov/signin");
    }
})



module.exports = govrouter;