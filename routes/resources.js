const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.get("/:id", (req, res) => {
    console.log(req.params.id)
    db.getResourceByID(req.params.id)
      .then(data => {
        const resourceInfo = data;
        return db.getCommentsByID(req.params.id)
          .then(comments => {
            return {
              resourceInfo: resourceInfo,
              comments: comments.rows
            }
          })

      })
      .then(data => {
        return db.getRatingByID(req.params.id)
          .then(ratings => {
            return {
              resourceInfo: data.resourceInfo,
              comments: data.comments,
              ratings: ratings.rows
            }
          })
          .then(data => {
            return db.getLikesByID(req.params.id)
              .then(likes => {
                return {
                  resourceInfo: data.resourceInfo,
                  comments: data.comments,
                  ratings: data.ratings,
                  likes: likes.rows
                }
              })
          })
          // .then(data => {
          //   return db.getTopicsByID(req.params.id)
          //     .then(topics => {
          //       return {
          //         resourceInfo: data.resourceInfo,
          //         comments: data.comments,
          //         ratings: data.ratings,
          //         likes: data.likes,
          //         topics: topics.rows
          //       }
          //     })
          // })
          .then(data => {
            const resources = data
            console.log('CONSOLE.log', data)
            res.render('../views/resources', { resources })
          })
      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/comment/:id", (req, res) => {
    db.query(`INSERT INTO comments (resource_id, user_id, text, created_at) values (235, 239, 'mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer', '1/25/2012'`);

  });


  return router;
};

