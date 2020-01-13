const express = require('express');
const router = express.Router();

module.exports = (db) => {


  // router.get("/", (req, res) => {
  //   let resource = {
  //     img_url: 'https://i.picsum.photos/id/926/200/200.jpg',
  //     rating: 54,
  //     like: 1,
  //     description: `Lorem ipsum dolor amet unicorn tumblr lo-fi bespoke. Tumeric locavore cronut roof party fam venmo put a bird on it subway tile hell of sustainable single-origin coffee snackwave pitchfork 90's ethical. Twee shaman raclette man braid art party. Farm-to-table cliche street art blog sartorial, godard fingerstache gentrify sustainable trust fund meh taiyaki mustache flannel. Tumblr health goth authentic crucifix craft beer plaid. Narwhal cornhole organic kickstarter prism pop-up. Green juice pug flannel forage, 90's cardigan narwhal helvetica bespoke leggings sartorial microdosing four dollar toast.`,
  //   }
  //   res.render('../views/resources', { resource })
  // })

  router.get("/:id", (req, res) => {
    console.log(req.params.id)
    db.query(`SELECT resources.*, comments.*, count(likes.id) as likes FROM resources
              LEFT JOIN likes ON likes.resource_id = resources.id
              LEFT JOIN comments ON comments.resource_id = resources.id
              WHERE resources.id = $1
              GROUP BY resources.id, comments.id;`, [req.params.id])
      .then(data => {
        console.log('DATATATATA',data.rows[0])
        const resource = data.rows[0]
        res.render('../views/resources', { resource })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
