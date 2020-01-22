const authGuard = require("../services/authGuard");
const User = require("../dtos/user.js");
const postRequest = require("../services/postRequest");
module.exports = function(app, passport, users) {
  //public
  //POST
  //Auth

  app.post(
    "/login",
    authGuard.checkNotAuthenticated,
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })
  );
  app.post("/register", async (req, res) => {
    function resolve(data) {
      res.redirect("/login");
    }
    function reject(data) {
      var response = "Username já se encontra em uso, Por favor escolha outro";
      if (
        data.response.data.message[0].messages[0].message ==
        "Email is already taken."
      ) {
        response = "Email já se encontra em uso, Por favor escolha outro";
      }

      res.render("register", { errorMessage: response });
    }
    let user = new User(req.body);
    users.push(user);
    postRequest.postService("auth/local/register", user, resolve, reject);
  });
  //GET
  //Auth
  app.get("/register", authGuard.checkNotAuthenticated, (req, res) => {
    res.render("register", { errorMessage: "" });
  });
  app.get("/login", authGuard.checkNotAuthenticated, (req, res) => {
    res.render("login");
  });
  app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
  });
};
