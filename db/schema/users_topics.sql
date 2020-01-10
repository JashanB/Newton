DROP TABLE IF EXISTS user_topics CASCADE;

CREATE TABLE users_topics(
   user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
   topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
   PRIMARY KEY (user_id, resource_id);
