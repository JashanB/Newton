
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let id = req.session.user_id;
    if (id) {
      //want to redirect to homepage if already logged in
      return db.getUserWithId(id)
      .then ( user => {
        templateVars = { user }
        res.render("index", templateVars);
      });
    } else {
      let user = '';
      const templateVars = { user }
      res.render("login", templateVars);
    }
  });

  router.post("/", (req, res) => {
    let email = req.body.email;
    if (email.length === 0) {
      //later change to error on template ejs
      res.status(404).send('Status Code 404: Error: No email inputed.');
    } else {
      return db.getUserWithEmail(email)
      .then( user => {
        if (!user) {
          //will add an error
          res.render("signup");
        } else {
          console.log(user);
          req.session.user_id = user.id;
          const templateVars = { user };
          //want to send to home but now logged in
          res.render("index", templateVars);
        }
      })

    }
  })

  return router;
};
