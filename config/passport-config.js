const LocalStrategy = require("passport-local").Strategy;
const postRequest = require("../services/postRequest");
const getRequest = require("../services/getRequest");
function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    function callbackSucess(data) {
      return done(null, data.data.user);
    }
    function callbackError(data) {
      return done(null, false, { message: "Dados inválidos" });
    }
    let formData = { identifier: email, password: password };
    console.log(formData);
    postRequest.postService(
      "auth/local",
      formData,
      callbackSucess,
      callbackError
    );
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    function success(data) {
      return done(null, data);
    }

    function reject(data) {
      console.log(data);
    }

    getRequest.findAll(`users/${id}`, "", success, reject);
  });
}

module.exports = initialize;
