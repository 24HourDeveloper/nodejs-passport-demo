const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

//mongo configuration
const db = require("./config/keys").MongoUrl;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: false }));
//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//Routes
app.use("/user", require("./routes/users"));
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serving running on port ${PORT}`));
