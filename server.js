const express = require("express");
const app = express();
const port = 3000;
const passport = require("passport");
const users = [];
const flash = require("express-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const initializePassport = require("./config/passport-config");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
//controllers
require("./controllers/indexController.js")(app, passport, users);
require("./controllers/accountController.js")(app, passport, users);
require("./controllers/authController.js")(app, passport, users);
require("./controllers/expenseController.js")(app, passport, users);
initializePassport(passport);
app.listen(process.env.PORT || 5000, () =>
  console.log(`A app está a correr no porto ${port}!`)
);
