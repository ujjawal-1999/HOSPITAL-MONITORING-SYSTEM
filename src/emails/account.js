const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

var generatedOtp = function generateOTP() {  
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
  } 

const sendWelcomeEmail = (email) => {
    try {
        var otp = generatedOtp()
        sgMail.send({
            to: email,
            from: 'sameershrivastava46@gmail.com',
            subject: 'One Time Password',
            text: `${otp} is your one time password.`  
        })
        
    } catch (e) {
        res.status(400).send(e)
    }
  
}


module.exports = sendWelcomeEmail