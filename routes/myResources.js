const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {
  res.render("myResources");
  });

  return router;
};
