const nodeMailer = require("nodemailer");
const config = require("../config");
var transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: config.email.username,
    pass: config.email.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
module.exports = transporter;
