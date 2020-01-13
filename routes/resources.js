const express = require('express');
const router = express.Router();

module.exports = (db) => {


  router.get("/", (req, res) => {
  let resource = {
    img_url : 'https://i.picsum.photos/id/926/200/200.jpg',
    rating: 54,
    like: 1,
    description: `Lorem ipsum dolor amet unicorn tumblr lo-fi bespoke. Tumeric locavore cronut roof party fam venmo put a bird on it subway tile hell of sustainable single-origin coffee snackwave pitchfork 90's ethical. Twee shaman raclette man braid art party. Farm-to-table cliche street art blog sartorial, godard fingerstache gentrify sustainable trust fund meh taiyaki mustache flannel. Tumblr health goth authentic crucifix craft beer plaid. Narwhal cornhole organic kickstarter prism pop-up. Green juice pug flannel forage, 90's cardigan narwhal helvetica bespoke leggings sartorial microdosing four dollar toast.` ,
  }
    res.render('../views/resources', { resource })
  })






  //  ------ Waiting for DB    ------  //
  // router.get("/:id", (req, res) => {
  //   db.query(`SELECT
  //               resources.*,
  //               comments.*,
  //               count(likes) as likes_count
  //             FROM
  //               resources
  //               JOIN comments ON comments.resource_id = resources.id
  //               JOIN likes ON likes.resource_id = resources.id
  //             WHERE
  //               id = $1;`, [req.params.id])
  //     .then(data => {
  //       const resource = data.rows[0]
  //       res.render('../views/resources', { resource })
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });
  return router;
}


