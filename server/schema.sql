CREATE TABLE product (
	id SERIAL PRIMARY KEY,
  placeholder INT,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INT
);

CREATE TABLE question (
  id SERIAL PRIMARY KEY,
  placeholder INT,
	product_id INT REFERENCES product(id),
  body TEXT,
  date_written BIGINT,
  asker_name TEXT,
  asker_email TEXT,
  reported BOOLEAN,
  helpful INT
);

CREATE TABLE answer (
  id SERIAL PRIMARY KEY,
  placeholder INT,
  question_id INT REFERENCES question(id),
  body TEXT,
  date_written BIGINT,
  answerer_name TEXT,
  answerer_email TEXT,
  reported BOOLEAN,
  helpful INT
);

CREATE TABLE photo (
id SERIAL PRIMARY KEY,
placeholder INT,
answer_id INT REFERENCES answer(id),
url TEXT
);
