const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();


//searching database for users
const getUserWithEmail = function(email) {
  return db.query(
  `SELECT id, email
  FROM users
  WHERE email = $1`, [email])
  .then(function(res) {
    if (res) {
      user = res.rows[0];
    } else {
      user = null;
    }
    return user;
  })
}
exports.getUserWithEmail = getUserWithEmail;


const getUserWithId = function(id) {
  return db.query(
    `SELECT id, email
    FROM users
    WHERE id = $1`, [id])
    .then(function(res) {
     if (res) {
       user = res.rows[0];
     } else {
       user = null;
     }
     return user;
   })
 }
exports.getUserWithId = getUserWithId;


//adding a user to database

const addUser =  function(email) {
  return db.query(
    ` INSERT INTO users (email)
     VALUES ($1)
     RETURNING *`, [email])
     .then(function(res) {
      console.log(res.rows);
      return res.rows[0];
     })
 }
 exports.addUser = addUser;
const getResources = function () {
  return db.query(`SELECT * FROM resources`)
    .then(data => {
      return data.rows;
    });
}

//populate resource page
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
exports.resourceInfo = resourceInfo;


//grabbing topic choices for sign up and upload page

const getAllTopics = function() {
  return db.query(
    `SELECT topics.id, topics.name
    FROM topics`)
  .then(res => {
    return res.rows;
  })
}
exports.getAllTopics = getAllTopics;


const addTopicsToUser = function(user_id, topic1, topic2, topic3) {
  return db.query(
    ` INSERT INTO user_topics (user_id, topic_id)
     VALUES ($1, $2)
     VALUES ($1, $3)
     VALUES ($1, $4)
     RETURNING *`, [user_id, topic1, topic2, topic3])
     .then(function(res) {
      console.log(res.rows);
     })
}

exports.addTopicsToUser = addTopicsToUser;



