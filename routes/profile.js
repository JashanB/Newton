
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    let id = req.session.user_id;
    console.log(id);
    if (id) {
      let userId = parseInt(req.params.user_id);
      if (id === userId) {
        res.render("profile")
      } else {
        res.redirect(`/${id}`)
      }

    } else {
      res.redirect("/login");
    }

  });

  //need to add the update stuff
  //use method override
  router.put("/", (req, res) => {
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
            res.redirect("/");
          }
        })
      }
    })


  });

  return router;
};
