const User = require("../models/user");
const bcrypt = require("bcrypt");
const emailService = require("../helpers/send-mail");
const config = require("../config");
exports.get_register = async function (req, res) {
  try {
    return res.render("auth/register", {
      title: "register",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.post_register = async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      req.session.message = {
        text: "Böyle bir email sistemde mevcut",
        class: "warning",
      };
      return res.redirect("login");
    }
    const newUser = await User.create({
      fullname: name,
      email: email,
      password: hashedPassword,
    });
    emailService.sendMail({
      from: config.email.from,
      to: newUser.email,
      subject: "Hesabınız oluştuurldu",
      text: `Merhaba ${newUser.fullname} hesabınız oluşturuldu
      `,
    });
    req.session.message = { text: "Kayıt Başarılı", class: "success" };
    return res.redirect("login");
  } catch (err) {
    console.log(err);
  }
};

exports.get_login = async function (req, res) {
  const message = req.session.message;
  delete req.session.message;
  try {
    return res.render("auth/login", {
      title: "login",
      message,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.get_logout = async function (req, res) {
  try {
    await req.session.destroy();
    return res.redirect("/account/login");
  } catch (err) {
    console.log(err);
  }
};

exports.post_login = async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.render("auth/login", {
        title: "login",
        message: { text: "Email Hatalı", class: "danger" },
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.isAuth = true;
      req.session.fullname = user.fullname;
      return req.session.save(() => {
        const url = req.query.returnUrl || "/";
        res.redirect(url);
      });
    }

    return res.render("auth/login", {
      title: "login",
      message: { text: "Parola Hatalı", class: "danger" },
    });
  } catch (err) {
    console.log(err);
  }
};
