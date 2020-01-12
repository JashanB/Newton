const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/", (req, res) => {
      db.query(`SELECT * FROM users;`)
        .then(data => {
          const users = data.rows;
          res.render('../views/resources', {users})
          console.log(users)

        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    });
    return router;
  }


