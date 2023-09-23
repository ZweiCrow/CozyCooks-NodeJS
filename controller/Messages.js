const { response } = require("express");

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'squall.flamme@gmail.com',
    pass: 'tbhvfjpbhiydhafy'
  },
  tls: {
    rejectUnauthorized: false
  }
});


// POST
const sendMessage = async (request, response, next) => {
  try {
    var mailOptions = {
      from: 'squall.flamme@gmail.com',
      to: 'squall.flamme@gmail.com',
      subject: `Cozy Cooks - Message from ${request.body.nom} ${request.body.prenom}`,
      text: `Contact at ${request.body.mail} : 
${request.body.message}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    response.send("Sended!")
  } catch (error) {}
}


module.exports = { sendMessage }