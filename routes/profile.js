
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    let id = req.session.user_id;
    console.log(id);
    if (id) {
      let userId = parseInt(req.params.user_id);
      if (id === userId) {
        return db.getTopicsByUserId(id)
        .then(topics => {
          let templateVars = { topics };
          res.render("profile", templateVars);
        })
      } else {
        res.redirect(`/${id}`)
      }

    } else {
      res.redirect("/login");
    }

  });

  //need to add the update stuff

  router.post("/email", (req, res) => {
    let id = req.session.user_id;
    let newEmail = req.body.email;
    return db.getUserWithEmail(newEmail)
    .then(user => {
      if (user) {
        res.status(404).send('Status Code 404: Sorry that email is already in use');
      } else {
        return db.updateUserEmail(id, newEmail)
        .then( data => {
          if (data) {
            res.status(200)
          }
        })
      }
    })
  });

  // router.post("/:topicid", (req, res) => {

  // });
  return router;
};
