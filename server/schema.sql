DROP DATABASE IF EXISTS qa;

CREATE DATABASE qa;

\c qa

DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
	product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  asker_name VARCHAR(50) NOT NULL,
  asker_email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES questions(id) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR(50) NOT NULL,
  answerer_email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL
);

CREATE TABLE IF NOT EXISTS photos (
id SERIAL PRIMARY KEY,
answer_id INT REFERENCES answers(id) NOT NULL,
url VARCHAR(500) NOT NULL
);

COPY questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/Users/justinchong/project-atelier-backend-QnA/server/data/questions.csv' DELIMITER ',' CSV HEADER;

COPY answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/justinchong/project-atelier-backend-QnA/server/data/answers.csv' DELIMITER ',' CSV HEADER;

COPY photos (answer_id, url) FROM '/Users/justinchong/project-atelier-backend-QnA/server/data/answers_photos.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX idx_question ON questions(product_id);
CREATE INDEX idx_answer ON answers(question_id);
CREATE INDEX idx_photo ON photos(answer_id);

-- \i '/Users/justinchong/project-atelier-backend-QnA/server/schema.sql'