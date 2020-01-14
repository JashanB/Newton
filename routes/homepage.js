const express = require('express');
const router  = express.Router();

module.exports = (db) => {
router.get("/", (req, res) => {
  db.getResourcesOrderByCountRating()
  .then(data => {
    const resource = {data:data};
    res.render('index', { resource });
  })
  .catch(err => {
    console.error(err);
  });
  // res.render('index')
});
router.get("/search", (req, res) => {
  //pass in params inputed from search to db query
  //allow multiple search terms?
  db.getResourcesByTopics()
  .then(data => {
    const users = data.rows;
    // res.render('index', { users });
    res.render('index');
  })
  .catch(err => {
    console.error(err);
  });
  res.render('index');
});

router.get("/mostrecent", (req, res) => {
  db.getResourcesByCreatedAt()
  .then(data => {
    const users = data.rows;
    res.render('index', { users });
    res.render('/mostrecent')
  })
  .catch(err => {
    console.error(err);
  });
});

router.get("/signup", (req,res) => {
  res.render("signup");
})

router.get("/:user_id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  db.getResourcesByTopics(id)
  .then(data => {
    const resource = {data:data};
    res.render('index', { resource });
  })
  .catch(err => {
    console.error(err);
  });
  // res.render('index')
});
return router;
};
