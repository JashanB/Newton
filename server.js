// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const database   = require("./database");

// PG database client/connection setup
// const { Pool } = require('pg');
// const dbParams = require('./lib/db.js');
// const db = new Pool(dbParams);
// db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  secret: 'midterm',
  // Cookie Options
  maxAge: 5 * 60 * 1000 // 5 minutes
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const resourceRoutes = require("./routes/resources");
const signUpRoutes = require("./routes/signup");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(database));
app.use("/resources", resourceRoutes(database));
app.use("/signup", signUpRoutes(database));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  db.query(`SELECT * FROM resources ORDER BY avg(ratings.id);`)
  .then(data => {
    const users = data.rows;
    res.render('index', { users });
  })
  .catch(err => {
    console.error(err);
    // res.redirect('/');
  });
  // res.render("index", { fakeObjectFromDB: {
  //   title: 'Hello World 2.0'
  // }});
  res.render('index')
});
app.get("/search", (req, res) => {
  //pass in params inputed from search to db query
  //allow multiple search terms?
  db.query(`SELECT * FROM resources WHERE topics.name LIKE $1 ORDER BY avg(ratings.id);`)
  .then(data => {
    const users = data.rows;
    // res.render('index', { users });
    res.render('index');
  })
  .catch(err => {
    console.error(err);
    // res.redirect('/');
  });
  // res.render("index", { fakeObjectFromDB: {
  //   title: 'Hello World 2.0'
  // }});
});

app.get("/mostrecent", (req, res) => {
  db.query(`SELECT * FROM resources ORDER BY created_at DESC;`)
  .then(data => {
    const users = data.rows;
    res.render('index', { users });
    res.render('/mostrecent')
  })
  .catch(err => {
    console.error(err);
  });
});


// res.render('_register', templateVars);

//for most pop most recent, either add new page for most recent or load home page with params and set default to false so it loads on demand
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
