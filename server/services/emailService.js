const nodemailer = require('nodemailer');

const sendEmail = async ({from , to , subject, text ,html }) => {

    let transporter = nodemailer.createTransport({
      service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
    });


     transporter.sendMail({
        from: `iShare <${from}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html
      } , (err,info) => {
        if(err) return false;
        else return true;
      });
}

module.exports = sendEmail;