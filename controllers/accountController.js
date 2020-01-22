const authGuard = require("../services/authGuard");

module.exports = function(app, passport, users) {
  app.get("/account", authGuard.checkAuthenticated, (req, res) => {
    res.render("account", {
      user: req.user
    });
  });
};
