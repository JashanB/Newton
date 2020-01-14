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

const getResourcesByTopicsForUser = function(id) {
  return db.query(`SELECT resources.*
  FROM topics
  LEFT JOIN user_topics ON topics.id = user_topics.topic_id
  JOIN users ON user_topics.user_id = users.id
  JOIN topics_resources ON topics_resources.topic_id = topics.id
  JOIN resources ON resources.id = topics_resources.resource_id
  JOIN likes ON resources.id = likes.resource_id
  WHERE users.id = 1 AND (SELECT resources.*
    FROM resources
    JOIN likes ON resources.id = likes.resource_id
    WHERE users.id <> likes.user_id;`)
  .then(data => {
    console.log(data.rows)
    return data.rows;
  });
}

const getResourcesByCreatedAt = function() {
  return db.query(`SELECT * FROM resources ORDER BY created_at DESC;`)
  .then(data => {
    return data.rows;
  });
}

//populate resource page
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




//grabbing topic choices for sign up and upload page
const getAllTopics = function() {
  return db.query(
    `SELECT topics.id, topics.name
    FROM topics`)
  .then(res => {
    return res.rows;
  })
}


//connecting topics to user upon signin
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

const getAllMyLikedResources = function(userId) {
  return db.query(
    `SELECT resources.*
    FROM resources
    JOIN likes ON likes.resource_id = resources.id
    WHERE likes.user_id = $1
     `, [userId])
     .then( res => {
    return res.rows;
    });
}

const getAllMyUploadedResources = function(userId) {
  return db.query(
    `SELECT resources.*
    FROM resources
    WHERE resources.created_by = $1`, [userId])
    .then( res => {
      return res.rows;
      });
}



//  ------  Resource id page functions  ------  //
const getResourceByID = (id) => {
  return db.query(`SELECT resources.* FROM resources WHERE resources.id = $1`, [id])
    .then(function(data) {
      return data.rows;
    })
}
exports.getResourceByID = getResourceByID;

const getCommentsByID = (id) => {
  return db.query(`SELECT comments.* FROM comments WHERE comments.resource_id = $1`, [id])
}

exports.getCommentsByID = getCommentsByID;

const getRatingByID = (id) => {
  return db.query(`SELECT ratings.* , (SELECT count(ratings.id) FROM ratings WHERE ratings.resource_id = 2)FROM ratings WHERE ratings.resource_id = $1
                  GROUP BY ratings.id`, [id])
}

exports.getRatingByID  = getRatingByID;

const getLikesByID = (id) => {
  return db.query(`SELECT likes.* , (SELECT count(likes.id) FROM likes WHERE likes.resource_id = 2)FROM likes WHERE likes.resource_id = $1
                  GROUP BY likes.id`, [id])
}

exports.getLikesByID  = getLikesByID;

// const getTopicsByID = (id) => {
//   return db.query(`SELECT likes.* FROM likes WHERE likes.resource_id = $1
//                   GROUP BY likes.id`, [id])
// }

// exports.getTopicsByID = getTopicsByID;




exports.addTopicsToUser = addTopicsToUser;
exports.resourceInfo = resourceInfo;
exports.getResourcesOrderByCountRating = getResourcesOrderByCountRating;
exports.getResourcesByTopicsForUser = getResourcesByTopicsForUser;
exports.getResourcesByCreatedAt = getResourcesByCreatedAt;
exports.addUser = addUser;
exports.getAllTopics = getAllTopics;
exports.getUserWithId = getUserWithId;
exports.getUserWithEmail = getUserWithEmail;
exports.getAllMyLikedResources = getAllMyLikedResources;
exports.getAllMyUploadedResources = getAllMyUploadedResources
exports.resourceInfo = resourceInfo;
exports.getResourcesOrderByCountRating = getResourcesOrderByCountRating;
exports.getResourcesByTopicsForUser = getResourcesByTopicsForUser;
exports.getResourcesByCreatedAt = getResourcesByCreatedAt;
