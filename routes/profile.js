
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    let id = req.session.user_id;
    if (id) {
      let userId = parseInt(req.params.user_id);
      console.log(id, userId);
      if (id === userId) {
        res.render("profile")
      } else {
        res.redirect("/")
      }

    } else {
      res.redirect("/login");
    }

  });
  //need to add the update stuff
  //use method override
  // router.post("/:user.id", (req, res) => {

  // });

  return router;
};
