
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //upload form
  router.get("/", (req, res) => {
    let id = req.session.user_id;
    if (id) {
      return db.getAllTopics()
      .then(topics => {
        console.log(topics);
        let resource = { topics, id }
        res.render("upload", { resource });
      })
    } else {
      res.redirect("login");
    }

  });

  //upload post
  router.post("/", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    const resourceURL = req.body.resourceURL;
    const topic = req.body.topic;
    let userId = req.session.user_id;

    return db.addNewResource(title, description, imageURL, resourceURL, userId)
    .then(data => {
      const resourceId = data.id
      db.linkTopicToResource(topic, resourceId);
    })
    .then(data => {
      res.json({user_id: userId})
    });

  })
  return router;
};
