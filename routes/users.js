const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const route = express.Router();

const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/Users");

route.get("/login", (req, res) => res.render("login"));

route.get("/register", (req, res) => res.render("register"));

route.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  const error = [];

  if (!name || !email || !password || !password2) {
    error.push({ msg: "All fields must be filled" });
  }

  if (password !== password2) {
    error.push({ msg: "Passwords must match" });
  }

  if (password.length < 6) {
    error.push({ msg: "Password must be 6 characters long" });
  }

  if (error.length > 0) {
    console.log(user);
    res.render("register", { error, name, email, password, password2 });
  } else {
    const user = new User({
      name,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt
        .hash(user.password, salt)
        .then(hash => {
          user.password = hash;
          user
            .save()
            .then(user => {
              req.flash("success_msg", "You are now registered and can log in");
              res.redirect("/user/login");
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
  }
});

route.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard");
});

route.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are successfully logged out!");
  res.redirect("login");
});

route.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "dashboard",
    failureRedirect: "login",
    failureFlash: true
  })(req, res, next);
});

module.exports = route;
