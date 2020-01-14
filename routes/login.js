
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let id = req.session.user_id;
    if (id) {
      res.redirect(`/${id}`);
    } else {
      res.render("login");
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
          req.session.user_id = user.id;
          //const templateVars = { user };
          //want to send to home/userid
          res.redirect(`/${user.id}`);
        }
      })

    }
  })

  return router;
};
