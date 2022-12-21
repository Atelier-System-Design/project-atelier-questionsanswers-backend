CREATE TABLE product (
	id serial,
  product_name TEXT,
	product_id INT PRIMARY KEY
);

CREATE TABLE question (
	id serial,
  question_id INT PRIMARY KEY,
	product_id INT REFERENCES product(product_id),
  username TEXT,
  email TEXT,
  body TEXT,
  helpfulness INT,
  reported BOOLEAN,
  question_date TIMESTAMPTZ
);

CREATE TABLE answer (
  id serial,
  answer_id INT PRIMARY KEY,
  question_id INT REFERENCES question(question_id),
  username TEXT,
  email TEXT,
  body TEXT,
  helpfulness INT,
  answer_date TIMESTAMPTZ
);

CREATE TABLE picture (
id serial,
picture_url TEXT PRIMARY KEY,
question_id INT REFERENCES question(question_id),
answer_id INT REFERENCES answer(answer_id)
);