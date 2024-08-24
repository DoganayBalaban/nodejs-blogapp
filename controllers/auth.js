const User = require("../models/user");
const bcrypt = require("bcrypt");
const emailService = require("../helpers/send-mail");
const config = require("../config");
const crypto = require("crypto");
const { Op } = require("sequelize");
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
      from: config.email.username,
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
      const userRoles = await user.getRoles({
        attributes: ["rolename"],
        raw: true,
      });
      req.session.roles = userRoles.map((role) => role["rolename"]);
      req.session.isAuth = true;
      req.session.fullname = user.fullname;
      req.session.userid = user.id;
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

exports.get_reset = async function (req, res) {
  try {
    return res.render("auth/reset-password", {
      title: "Reset Password",
    });
  } catch (err) {
    console.log(err);
  }
};
exports.post_reset = async function (req, res) {
  const email = req.body.email;
  try {
    var token = crypto.randomBytes(32).toString("hex");
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.render("auth/reset-password", {
        title: "Reset Password",
        message: { text: "Email bulunamadı", class: "danger" },
      });
    }
    user.resetToken = token;

    user.resetTokenExpiration = Date.now() + 1000 * 60 * 60;
    await user.save();
    emailService.sendMail({
      from: config.email.username,
      to: email,
      subject: "Reset Parola",
      text: `
      Parolanızı güncellemek için tıkla
      <a href="http://localhost:3000/account/new-password/${token}">Reset Parola
      
      `,
    });
    req.session.message = { text: "Mail gönderildi", class: "success" };
    res.redirect("login");
  } catch (err) {
    console.log(err);
  }
};
exports.get_newPassword = async function (req, res) {
  const token = req.params.token;
  try {
    const user = User.findOne({
      resetToken: token,
      resetTokenExpiration: {
        [Op.gt]: Date.now(),
      },
    });
    return res.render("auth/new-password", {
      title: "New Password",
      token,
      userId: user.userId,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.post_newPassword = async function (req, res) {
  const token = req.body.token;
  const userId = req.body.userId;
  const newPassword = req.body.password;
  try {
    const user = await User.findOne({
      // Buraya await eklendi
      where: {
        resetToken: token,
        resetTokenExpiration: {
          [Op.gt]: Date.now(),
        },
        id: userId,
      },
    });

    if (!user) {
      req.session.message = {
        text: "Geçersiz veya süresi dolmuş token",
        class: "danger",
      };
      return res.redirect("login");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();
    req.session.message = { text: "Parolanız güncellendi", class: "success" };
    return res.redirect("login");
  } catch (err) {
    console.log(err);
  }
};
