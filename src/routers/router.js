const express = require('express');
const moment = require('moment');
const messagebird = require('messagebird')('vxlgI5zRxrvM9UZXApHdAvrjF');
// const passport = require('passport');
const router = express.Router();
const auth = require('../middleware/auth');
const {sendEmailToGovt} = require('../account/nodemailer');
//const {sendWelcomeMessage} = require('../account/send_sms');
const NGO = require('../models/ngo');
const NGODETAILS = require('../models/ngodetails');
const NGOPERMISSION = require('../models/ngopermission');
const authngo = require('../middleware/authngo');
const jwt=require("jsonwebtoken");

// const initializePassport = require('./passport-config')

// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )
router.post('/signup', async(req,res)=> {
    console.log(req.body);
    const ngo = new NGO(req.body);
    try {
      var token = jwt.sign({ password: req.body.password}, 'shhhhh');
      localStorage.setItem('ngotoken',token);
            await ngo.save();
            console.log("list",ngo);
            res.render("portfolio",{
              ngo
            });
    } catch (error) {
        // res.render("error.hbs");
    }
})
router.get("/logout",(req,res)=>{
  localStorage.removeItem("token");
  res.redirect("/");
})


router.post('/details',authngo,async(req,res)=>{
  console.log("modal: ",req.body);
  const details = new NGODETAILS(req.body);
  console.log("details-b4",details);
  
  try {
    await details.save();

    console.log("detail ",details);
    res.render("portfolio",{
      ngo:details
    })
    
  } catch (error) {
    res.send(error)
  }
})
router.get('/search', (req,res)=> {
  NGOPERMISSION.find((err,data)=>{
    console.log(data);        
      res.render('search',{
          data
      })
  })
  // res.render('search');
})

router.post('/permission',authngo,async(req,res)=> {
  const permission = new NGOPERMISSION(req.body);
  // permission.registrationid = 'REG'+Date.now();
  // permission.date = moment().format("MMM Do YYYY");
  console.log(permission);
  try {
    await permission.save();

    //sendEmailToGovt({permission})       //mail sent to host
    //sendWelcomeMessage(docs.applicationNo,docs.visitorName,docs.visitorEmail,docs.visitorPhnNo,docs.hostPhnNo,docs.checkInTime)
    res.render("portfolio",{
      ngo:permission
    })
  } catch (error) {
    res.send(error);
  }
})
// router.get('/permission/acceptproposal/:id',async(req,res)=>{
//   const id = req.params.id; 
//   NGOPERMISSION.findOne({registrationid:id}, (err,data)=>{
//       res.render('portfolio',{
//           data
//       })
//   })
// })

router.post('/login', async (req, res) => {
  var id = req.body.patient_id
    const patient = await NGOPERMISSION.find({patient_id: id})
    res.render('patient', {
      name : patient[0].patient_name,
      id : patient[0].patient_id,
      phone : patient[0].patient_phone,
      gender : patient[0].patient_gender,
      address : patient[0].patient_address,
      state : patient[0].patient_state,
    })
 
})
router.post('/hospital_login',async (req, res)=>{
  var id = req.body.emailid

  const hospital = await NGO.find({emailid: id})

  res.render('portfolio', {ngo : hospital[0]
    // name : hospital[0].name
    // id : hospital[0].patient_id,
    // phone : hospital[0].patient_phone,
    // gender : hospital[0].patient_gender,
    // address : hospital[0].patient_address,
    // state : hospital[0].patient_state,
  })
})

// router.post('/step2', (req, res) => {
//   var number = req.body.number
//   messagebird.verify.create(number, {
//     template : "Your verification code is %token."
//   }, function(err, response) {
//     if(err){
//       console.log(err)
//       res.render('search')
//     } else {
//       res.render('step2',{
//         id : response.id
//       })
//     }
//   })
// })

// router.post('/step3', (req, res) => {
//   var id = req.body.id
//   var token = req.body.token

//   messagebird.verify.verify(id,token, function(err, response) {
//     if(err){
//       res.render('step2')
//     }
//     else{
//        res.render('step3')
//     }
//   })

// })


module.exports = router