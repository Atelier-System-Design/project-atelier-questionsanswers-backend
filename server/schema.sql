CREATE TABLE product (
	id INT PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INT
);

CREATE TABLE question (
  question_id INT PRIMARY KEY,
	product_id INT REFERENCES product(id),
  username TEXT,
  email TEXT,
  body TEXT,
  helpfulness INT,
  reported BOOLEAN,
  question_date TIMESTAMPTZ
);

CREATE TABLE answer (
  answer_id INT PRIMARY KEY,
  question_id INT REFERENCES question(question_id),
  username TEXT,
  email TEXT,
  body TEXT,
  helpfulness INT,
  answer_date TIMESTAMPTZ
);

CREATE TABLE photo (
photo_id INT PRIMARY KEY,
photo_url TEXT,
answer_id INT REFERENCES answer(answer_id)
);