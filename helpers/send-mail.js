const nodeMailer = require("nodemailer");
const config = require("../config");
var transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});
module.exports = transporter;
