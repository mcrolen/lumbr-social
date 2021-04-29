const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const connectDB = require('./config/db');

// Bring in routes
// const mainRoutes = require('./routes/main');
// const postRoutes = require('./routes/posts');

dotenv.config({ path: './config/config.env' });
const app = express();
connectDB();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// // Call routes
// app.use('/', mainRoutes);
// app.use('/post', postRoutes);

const PORT = process.env.PORT || 2121;

// Run server
app.listen(PORT, console.log(`Server running on port ${PORT}`));
