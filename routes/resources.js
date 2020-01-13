const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
      db.query(`SELECT * FROM resources WHERE id = ${req.params.id};`)
        .then(data => {
          const resource = data.rows[0]
          res.render('../views/resources', { resource })
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
    return router;
  }


