const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/db");

// Bring in routes
const mainRoutes = require("./routes/main.js");
const postRoutes = require("./routes/posts.js");

// Use the .env file in config folder
require("dotenv").config({ path: "./config/config.env" });

// Passport
require("./config/passport.js")(passport);

// Connect to the database using db string in config folder
connectDB();

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static
app.use(express.static("public"));

// Use EJS for the contents of views folder
app.set("view engine", "ejs");

// Using express built in magic for body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging with Morgan
app.use(logger("dev"));

// Put and delete requests directly in forms
app.use(methodOverride("_method"));

// Sessions stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Use flash for errors
app.use(flash());

// Call routes
app.use("/", mainRoutes);
app.use("/post", postRoutes);

const PORT = process.env.PORT || 2121;

// Run server
app.listen(PORT, console.log(`Server running on port ${PORT}`));
