const User = require("../models/user");
const bcrypt = require("bcrypt");
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
    await User.create({
      fullname: name,
      email: email,
      password: hashedPassword,
    });
    return res.redirect("login");
  } catch (err) {
    console.log(err);
  }
};

exports.get_login = async function (req, res) {
  try {
    return res.render("auth/login", {
      title: "login",
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
        message: "email hatalı",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      req.session.isAuth = true;
      req.session.fullname = user.fullname;
      return res.redirect("/");
    }

    return res.render("auth/login", {
      title: "login",
      message: "parola hatalı",
    });
  } catch (err) {
    console.log(err);
  }
};
