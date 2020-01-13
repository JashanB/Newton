const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const getResources = function () {
  return db.query(`SELECT * FROM resources`)
    .then(data => {
      return data.rows;
    });
}

const resourceInfo = (id) => {
  return db.query(`SELECT resources.*, comments.user_id as comment_user, comments.created_at AS comments_date, comments.text AS comment_text, count(likes.*) AS likes, count(ratings.*) AS ratings_count
                  FROM resources
                  LEFT JOIN likes ON likes.resource_id = resources.id
                  LEFT JOIN comments ON comments.resource_id = resources.id
                  LEFT JOIN ratings ON ratings.resource_id = resources.id
                  LEFT JOIN users ON users.id = resources.created_by
                  WHERE resources.id = $1
                  GROUP BY resources.id, comments.id, comment_user;`, [id])
    .then(data => {
      return data.rows;
    });

}
exports.getResources = getResources;
exports.resourceInfo = resourceInfo;
