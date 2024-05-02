const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  //host: 'smtp.gmail.com',
  host: 'smtp.mail.yahoo.com',
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
      user: 'hackconda9@ymail.com',
      pass: 'scwtofqnemqcyfuu'
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'hackconda9@ymail.com', // sender address
    to: 'paulo.vivarnif@gmail.com', // list of receivers
    subject: 'Hola amigo✔', // Subject line
    text: 'Hola Mundo mail?', // plain text body
    html: '<b>Que tal en mi primer correo</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);
