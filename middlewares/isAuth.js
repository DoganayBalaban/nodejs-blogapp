module.exports = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/account/login?returnUrl=" + req.originalUrl);
  }
};
