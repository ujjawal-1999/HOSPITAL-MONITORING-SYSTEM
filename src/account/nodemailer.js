var nodemailer = require('nodemailer')

const keys = require('../auth/keys')

const sendEmailToGovt = ({permission}) => {
console.log("permission",permission);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: keys.auth.email,           //email id
      pass: keys.auth.pass           //my gmail password
    },
    pool: true
  });
 
  var mailOptions = {
    from: permission.emailid,
    to: keys.auth.govtemail,
    subject:`Responses of NGO for ${permission.category}`,
    html:`<p>Registration Id : ${permission.registrationid}</p>
          <p>Name of the NGO : ${permission.name}</p>
          <p>Project Proposals : ${permission.reason}</p>
          <p>Organize : ${permission.organize}</p>
          <p>Email Id : ${permission.emailid}</p>
          <p>Board of Director Name : ${permission.directorname}</p>
          <p>Gender : ${permission.gender}</p>
          <p>Address of office : ${permission.address}</p>
          <p>State : ${permission.state}</p>
          <p>Years Operated : ${permission.years}</p>
          <p>No. of people associated : ${permission.people}</p>
          <p>Date : ${permission.date}</p>`
  };
  console.log("mailOptions : " ,mailOptions);
 
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendEmailToNgoForAcceptance = ({data}) => {  
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: keys.auth.email,           //email id
        pass: keys.auth.pass           //my gmail password
      },
      pool: true
    });
   
    var mailOptions = {
      from: keys.auth.govtemail,
      to: data.emailid,
      subject:`Acceptance for the request of NGO for ${data.oraganize}`,
      html:`<p>Dear, ${data.directorname},<br>Board of Director of ${data.name},Registration Id : ${data.registrationid}. Your request for organizing a ${data.organize}
            on  ${data.date} has been accepted.</p>
            <br>
            <p> Thank you</p>`};
 
    console.log("mailOptions : " ,mailOptions);
   
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

const sendEmailToNgoForRejection = ({data}) => {  
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: keys.auth.email,           //email id
        pass: keys.auth.pass           //my gmail password
      },
      pool: true
    });
   
    var mailOptions = {
      from: keys.auth.govtemail,
      to: data.emailid,
      subject:`Rejection of the request of NGO for ${data.organize}`,
      html:`<p>Dear, ${data.directorname},<br>Board of Director of ${data.name},Registration Id : ${data.registrationid}. Your request for organizing a ${data.organize}
            on  ${data.date} cannot be accepted as the reason stated is not appropriate.</p>
            <br>
            <p> Thank you</p>`};
 
    console.log("mailOptions : " ,mailOptions);
   
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

// const sendByeEmail = (applicationNo, visitorName , PhoneNumber , checkInTime, checkOutTime, hostName,visitorEmail,hostAddress) => {
//   var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: keys.auth.email,           //email id
//         pass: keys.auth.pass           //my gmail password
//       },
//       pool: true
//     });
   
//     var mailOptions = {
//       from: 'ankitsrivastava21345@gmail.com',
//       to: `${visitorEmail}`,
//       subject:`Innovacer Meeting`,
//       html:`<p>Application Number : ${applicationNo}</p> <p>Visitor Name : ${visitorName}</p> <p>Visitor Phone Number : ${PhoneNumber}</p> <p>Check-in Time : ${checkInTime}</p>  <p>Check-out Time : ${checkOutTime}</p> <p>Host Name : ${hostName}</p>  <p>Address Visited : ${hostAddress}</p>`
//     };
//     console.log("mailOptions : " ,mailOptions);
   
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });
//   }

module.exports = {
    sendEmailToGovt,
    sendEmailToNgoForAcceptance,
    sendEmailToNgoForRejection
}