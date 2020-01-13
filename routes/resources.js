const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.get("/:id", (req, res) => {
    console.log(req.params.id)
    db.resourceInfo(req.params.id)
      .then(data => {
        const resource = data
        console.log('DATA', data)
        res.render('../views/resources', { resource })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
