const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.get("/:id", (req, res) => {
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
            res.render('../views/resources', { resources })
          })
      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.put('/like/:resourceid', (req, res) => {
    //want resource that user liekd to be inserted into likes table with user id and resource id
    const userId = parseInt(req.session.user_id);
    const resourceId = req.params.resourceid;
    //if already liked, then delete, else add
    db.checkIfLiked(resourceId)
    .then(data => {
      if (data.length !== 0) {
        db.deleteLiked(resourceId)
        .then(data => {
          res.redirect(`/resources/${resourceId}`);
        })
      } else {
        db.insertIntoLikes(userId, resourceId)
        .then(data => {
          res.redirect(`/resources/${resourceId}`);
        })
        .catch(err => {
          console.error(err);
          res.status(500).send(err.stack)
        });
      }
    })

  });

  router.put("/comment/:id", (req, res) => {
    const userId = parseInt(req.session.user_id);
    const text = req.body.comment
    const resourceId = req.params.id

    db.postComment(resourceId, userId, text)
    .then( () => {
      res.redirect(`/resources/${resourceId}`)
    }
    )
  });

  return router;
};

