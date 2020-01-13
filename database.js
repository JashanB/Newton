const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const getResources = function () {
  return db.query(`SELECT * FROM resources WHERE resources.id = 1;`)
    .then(data => {
      return data.rows;
    });
}

const getResourcesOrderByCountRating = function() {
  return db.query(`SELECT * FROM resources
  JOIN ratings ON ratings.resource_id = resources.id
  GROUP BY resources.id, ratings.id
  ORDER BY count(ratings.id)
  LIMIT 40;`)
  .then(data => {
    return data.rows;
  });
}

const getResourcesByTopics = function() {
  return db.query(`SELECT * FROM resources WHERE topics.name LIKE $1 ORDER BY avg(ratings.id);`)
  .then(data => {
    return data.rows;
  });
}

const getResourcesByCreatedAt = function() {
  return db.query(`SELECT * FROM resources ORDER BY created_at DESC;`)
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
exports.getResourcesOrderByCountRating = getResourcesOrderByCountRating;
exports.getResourcesByTopics = getResourcesByTopics;
exports.getResourcesByCreatedAt = getResourcesByCreatedAt;
