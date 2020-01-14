const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.getResourcesOrderByCountRating()
      .then(data => {
        const resource = { data: data };
        res.render('index', { resource });
      })
      .catch(err => {
        console.error(err);
      });
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
        res.status(500).send(err.stack)
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

  router.get("/signup", (req, res) => {
    res.render("signup");
  })

  router.get("/:user_id", (req, res) => {
    const id = req.params.user_id;
    if (id) {
      let userId = parseInt(req.params.user_id);
      if (id === userId) {
        db.getResourcesByTopicsForUser(id)
          .then(data => {
            const resource = { data: data, userId: userId };
            res.render('index', { resource });
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

  router.post('/like/resource_id/user_id', (req, res) => {
    //want resource that user liekd to be inserted into likes table with user id and resource id

  });

  return router;
};


