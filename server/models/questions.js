const db = require('../database/db');

module.exports = {
  getQuestions: (queries, callback) => {
    console.log('queries are: ', queries);
    db.query('SELECT * FROM question LIMIT 15;', (err, data) => callback(err, data));
  },

  getOneAnswers: (question_id, queries, callback) => {
    console.log('id is : ', question_id);
    console.log('queries are: ', queries);
    db.query(`SELECT * FROM answer WHERE question_id=${question_id}`, (err, data) => callback(err, data));
  },

  addQuestion: (body, callback) => {
    console.log('body in models: ', body);
    // db.query(`INSERT INTO question (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES(${body.product_id}, ${body.body}, ${new Date().getTime()}, ${body.asker_name}, ${body.asker_email}, 0, 0)`, (err, data) => callback(err, data));

    db.query(`INSERT INTO question (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES(1, "is this still available?", ${new Date().getTime()}, "Justin", "justin@gmail.com", '0', 0)`, (err, data) => callback(err, data));
  }
};

// CREATE TABLE question (
//   id SERIAL PRIMARY KEY,
// 	product_id INT REFERENCES product(id),
//   body TEXT,
//   date_written BIGINT,
//   asker_name TEXT,
//   asker_email TEXT,
//   reported BOOLEAN,
//   helpful INT
// );