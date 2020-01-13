const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

const getResources = function() {
  return db.query(`SELECT * FROM resources`)
  .then(data => {
    return data.rows;
  });
}
exports.getResources = getResources;



