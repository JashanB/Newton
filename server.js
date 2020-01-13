// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
<<<<<<< HEAD
const resourceRoutes = require("./routes/resources");
=======
>>>>>>> c82f6eb0e0e13680965e145ea7cd4f8b2efd82f8

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/resources", resourceRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

<<<<<<< HEAD
=======
// app.get("/resource/:id", (req, res) => {
//   db.query(`SELECT * FROM resources WHERE resource.id = ${example};`)
//     .then(data => {
//       const users = data.rows;
//       res.render('resources', { users });
//     })
//     .catch(err => {
//       console.error(err);
//       res.redirect('/');
//     });
// });
>>>>>>> c82f6eb0e0e13680965e145ea7cd4f8b2efd82f8

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
