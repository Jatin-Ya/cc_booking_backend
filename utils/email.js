const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "cc20e635b7555a",
      pass: "b2e14d6bf5742b"
    }
  });

  const mailOptions = {
    from: 'admin <donot@reply.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;