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
  return db.query(`SELECT resources.*, comments.*, count(likes.id) as likes FROM resources
                  LEFT JOIN likes ON likes.resource_id = resources.id
                  LEFT JOIN comments ON comments.resource_id = resources.id
                  WHERE resources.id = $1
                  GROUP BY resources.id, comments.id;`, [id])
    .then(data => {
      return data.rows[0];
    });

}
exports.getResources = getResources;
exports.resourceInfo = resourceInfo;



