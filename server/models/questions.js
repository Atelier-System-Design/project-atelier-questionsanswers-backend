const db = require('../database/db');

module.exports = {
  getQuestions: (queries, callback) => {
    console.log('queries are: ', queries);
    db.query('SELECT * FROM question LIMIT 15;', (err, data) => callback(err, data));
  },

  getOneAnswers: (question_id, queries, callback) => {
    db.query(`SELECT * FROM answer WHERE question_id=${question_id}`, (err, data) => callback(err, data));
  },

  addQuestion: (body, callback) => {
    db.query(`INSERT INTO question (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES(${body.product_id}, '${body.body}', ${new Date().getTime()}, '${body.asker_name}', '${body.asker_email}', '0', 0)`, (err, data) => callback(err, data));
  },

  addAnswer: (question_id , body, callback) => {
    db.query(`INSERT INTO answer (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES(${question_id}, '${body.body}', ${new Date().getTime()}, '${body.answerer_name}', '${body.answerer_email}', '0', 0)`, (err, data) => callback(err, data));
  },

  addQuestionHelpful: (question_id, callback) => {
    db.query(`UPDATE question SET helpful = helpful + 1 WHERE id=${question_id}`, (err, data) => callback(err, data));
  },

  addAnswerHelpful: (answer_id, callback) => {
    db.query(`UPDATE answer SET helpful = helpful + 1 WHERE id=${answer_id}`, (err, data) => callback(err, data));
  },

  reportQuestion: (question_id, callback) => {
    db.query(`UPDATE question SET reported = 't' WHERE id=${question_id}`, (err, data) => callback(err, data));
  },

  reportAnswer: (answer_id, callback) => {
    db.query(`UPDATE answer SET reported = 't' WHERE id=${answer_id}`, (err, data) => callback(err, data));
  }
};

// CREATE TABLE answer (
//   id SERIAL PRIMARY KEY,
//   placeholder INT,
//   question_id INT REFERENCES question(id),
//   body TEXT,
//   date_written BIGINT,
//   answerer_name TEXT,
//   answerer_email TEXT,
//   reported BOOLEAN,
//   helpful INT
// );