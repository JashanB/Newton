const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
    const id = req.session.user_id;
    if (id) {
      let userId = parseInt(req.session.user_id);
      if (id === userId) {
        db.getAllMyLikedResources(id)
          .then(data => {
            const liked = data;
            db.getAllMyUploadedResources(id)
            .then(data => {
              const uploaded = data;
              const resource = { liked: liked, uploaded: uploaded };
            res.render('myResources', { resource });
            })
            .catch(err => {
              console.error(err);
            });
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        res.redirect("/")
      }
    } else {
      res.redirect("/")
    }
  });

  return router;
};
