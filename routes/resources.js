const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.get("/:id", (req, res) => {
    console.log(req.params.id)
    db.resourceInfo(req.params.id)
      .then(data => {
        const resource = data[0]
        const comments = data
        console.log('COMENTS', comments)
        res.render('../views/resources', { resource, comments })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

