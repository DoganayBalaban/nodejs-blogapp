module.exports = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/account/login?returnUrl=" + req.originalUrl);
  }
  if (!req.session.roles.includes("admin")) {
    req.session.message = {
      text: "yetkiniz bulunmamaktadır",
      class: "warning",
    };
    res.redirect("/account/login?returnUrl=" + req.originalUrl);
  }
};
