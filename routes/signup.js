
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let id = req.session.user_id;
    if (id) {
      res.redirect("/")
    } else {
      res.render("signup");
    }
  });


  // router.post("/", (req, res) => {
  // })


  return router;
};

//QUESTIONS
//How would I redirect to actual homepage
