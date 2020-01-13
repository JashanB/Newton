const express = require('express');
const router = express.Router();

module.exports = (db) => {


  router.get("/:id", (req, res) => {
    console.log(req.params.id)
    db.query(`SELECT resources.*, comments.*, count(likes.id) as likes FROM resources
              LEFT JOIN likes ON likes.resource_id = resources.id
              LEFT JOIN comments ON comments.resource_id = resources.id
              WHERE resources.id = $1
              GROUP BY resources.id, comments.id;`, [req.params.id])
      .then(data => {
        console.log('DATATATATA',data.rows[0])
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
};
