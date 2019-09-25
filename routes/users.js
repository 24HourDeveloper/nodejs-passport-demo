const express = require("express");
const route = express.Router();
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
    console.log(user);
    res.send("User registered");
  }
});

module.exports = route;
