const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const getResources = function() {
  return db.query(`SELECT * FROM resources;`)
  .then(data => {
    return data.rows;
  });
}

const getResourcesOrderByAvgRating = function() {
  return db.query(`SELECT * FROM resources ORDER BY avg(ratings.id);`)
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

exports.getResources = getResources;
exports.getResourcesOrderByAvgRating = getResourcesOrderByAvgRating;
exports.getResourcesByTopics = getResourcesByTopics;
exports.getResourcesByCreatedAt = getResourcesByCreatedAt;



