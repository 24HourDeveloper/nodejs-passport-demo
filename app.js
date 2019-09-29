const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

//Passport config
require("./config/passport")(passport);

//mongo configuration
const db = require("./config/keys").MongoUrl;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

//body parser
app.use(express.urlencoded({ extended: false }));

//flash redirect
app.use(flash());

//express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Routes
app.use("/user", require("./routes/users"));
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serving running on port ${PORT}`));
