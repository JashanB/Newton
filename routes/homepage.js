const express = require('express');
const router  = express.Router();

module.exports = (db) => {
router.get("/", (req, res) => {
  db.getResourcesOrderByAvgRating()
  .then(data => {
    const users = data.rows;
    res.render('index', { users });
  })
  .catch(err => {
    console.error(err);
    // res.redirect('/');
  });
  // res.render("index", { fakeObjectFromDB: {
  //   title: 'Hello World 2.0'
  // }});
  res.render('index')
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
    // res.redirect('/');
  });
  // res.render("index", { fakeObjectFromDB: {
  //   title: 'Hello World 2.0'
  // }});
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
return router;
};
