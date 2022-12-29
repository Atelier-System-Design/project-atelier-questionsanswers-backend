const db = require('../database/db');

module.exports = {
  getQuestions: (product_id, queries, callback) => {
    db.query(`SELECT * FROM question WHERE product_id=${product_id} AND reported='f';`, (err, data) => {
      const page = queries.page ? Number(queries.page) : 1;
      const count = queries.count ? Number(queries.count) : 5;
      const start = (page - 1) * count;
      const paginationData = data.rows.slice(start, start + count);
      callback(err, paginationData);
    });
  },

  getAnswers: (question_id, queries, callback) => {
    db.query(`SELECT * FROM answer WHERE question_id=${question_id};`, (err, data) => {
      const page = queries.page ? Number(queries.page) : 1;
      const count = queries.count ? Number(queries.count) : 5;
      const start = (page - 1) * count;
      const paginationData = data.rows.slice(start, start + count);
      callback(err, paginationData);
    });
  },

  addQuestion: (product_id, body, callback) => {
    db.query(`INSERT INTO question (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES(${product_id}, '${body.body}', ${new Date().getTime()}, '${body.asker_name}', '${body.asker_email}', '0', 0);`, (err, data) => callback(err, data));
  },

  addAnswer: (question_id , body, callback) => {
    //  db.query(`INSERT INTO answer (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES(${question_id}, '${body.body}', ${new Date().getTime()}, '${body.answerer_name}', '${body.answerer_email}', '0', 0) RETURNING id INTO last_id FOREACH thing IN ARRAY ARRAY${body.photos}`, (err, data) => callback(err, data));


    //  db.query(`DO $$
    //  DECLARE last_id INT;
    //  BEGIN
    //   INSERT INTO answer (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES(${question_id}, '${body.body}', ${new Date().getTime()}, '${body.answerer_name}', '${body.answerer_email}', '0', 0) RETURNING id INTO last_id;

    //  `)

    db.query(`INSERT INTO answer (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES(${question_id}, '${body.body}', ${new Date().getTime()}, '${body.answerer_name}', '${body.answerer_email}', '0', 0) RETURNING id`)
    .then(res => {
      const answerId = res.rows[0].id;
      for(let i = 0; i < body.photos.length; i++) {
        db.query(`INSERT INTO photo (answer_id, url) VALUES(${answerId}, '${body.photos[i]}')`)
      }
      callback(null);
    })
    .catch(err => callback(err))
  },

  addQuestionHelpful: (question_id, callback) => {
    db.query(`UPDATE question SET helpful = helpful + 1 WHERE id=${question_id};`, (err, data) => callback(err, data));
  },

  addAnswerHelpful: (answer_id, callback) => {
    db.query(`UPDATE answer SET helpful = helpful + 1 WHERE id=${answer_id};`, (err, data) => callback(err, data));
  },

  reportQuestion: (question_id, callback) => {
    db.query(`UPDATE question SET reported = 't' WHERE id=${question_id};`, (err, data) => callback(err, data));
  },

  reportAnswer: (answer_id, callback) => {
    db.query(`UPDATE answer SET reported = 't' WHERE id=${answer_id};`, (err, data) => callback(err, data));
  }
};