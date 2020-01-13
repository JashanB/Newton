DROP TABLE IF EXISTS user_topics CASCADE;

CREATE TABLE user_topics(
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, topic_id)
);


-- How to query such a table
-- SELECT users.id, users.name, topics.name FROM topics
-- JOIN user_topics ON user_topics.topic_id = topics.id
-- JOIN users ON user_topics.user_id = users.id
-- WHERE topics.id = 2;

-- 1 | John | Super Cool Thing
-- 2 | Joe  | Super Cool Thing
-- 3 | Jill | Super Cool Thing
