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

router.post("/search", (req, res) => {
  const topicName = req.body.search;
  console.log(req.body)
  db.getResourcesByTopicName(topicName)
  .then(data => {
    const resource = {data:data};
    res.render('index', { resource });
  })
  .catch(err => {
    console.error(err);
  });
});

// router.get("/mostrecent", (req, res) => {
//   db.getResourcesByCreatedAt()
//   .then(data => {
//     const resource = {data:data};
//     res.render('mostrecent', { resource });
//   })
//   .catch(err => {
//     console.error(err);
//   });
// });

router.get("/signup", (req,res) => {
  res.render("signup");
})

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.getResourcesByTopicsForUser(id)
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

router.post('/like/resource_id/user_id', (req, res) => {
  //want resource that user liekd to be inserted into likes table with user id and resource id

});
