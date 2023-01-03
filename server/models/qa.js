const db = require('../database/db');

module.exports = {
  getQuestions: (product_id, page, count) => {
    const queryString = `
    SELECT ${product_id} AS product_id,
      COALESCE(json_agg(
        json_build_object(
          'question_id', q.id,
          'question_body', q.body,
          'question_date', to_timestamp(q.date_written / 1000),
          'asker_name', q.asker_name,
          'question_helpfulness', q.helpful,
          'reported', q.reported,
          'answers', (
            SELECT COALESCE(json_object_agg(
              a.id,
              json_build_object(
                'id', a.id,
                'body', a.body,
                'date', to_timestamp(a.date_written / 1000),
                'answerer_name', a.answerer_name,
                'helpfulness', a.helpful,
                'photos', (
                  SELECT COALESCE(json_agg(
                    json_build_object(
                      'id', p.id,
                      'url', p.url
                    )
                  ), '[]'::json)
                  FROM photos AS p
                  WHERE p.answer_id = a.id
                )
              )
            ), '{}'::json)
            FROM answers AS a
            WHERE a.question_id = q.id AND a.reported = false
          )
        )
      ), '[]') AS results
        FROM questions AS q
        WHERE q.product_id = $1 AND q.reported = false
      `;

    return db.query(queryString, [product_id])
      .then(data => data.rows[0])
      .catch(err => err);
  },

  getAnswers: (question_id, page, count) => {
    const queryString = `
    SELECT
      a.id AS answer_id,
      a.body AS body,
      to_timestamp(a.date_written / 1000) AS date,
      a.answerer_name AS answerer_name,
      a.helpful AS helpfulness,
      (SELECT
        COALESCE(json_agg(
          json_build_object(
            'id', p.id,
            'url', p.url
          )), '[]')
          FROM photos AS p
          WHERE p.answer_id = a.id
      ) AS photos
      FROM answers AS a
      WHERE a.question_id = $1 AND reported = false
      LIMIT $2 OFFSET $3
    `;

    return db.query(queryString, [question_id, count, count * page - count])
      .then(data => data.rows)
      .catch(err => err);
  },

  addQuestion: (product_id, body, name, email) => {
    const queryString = `
    INSERT INTO questions
    (product_id, body, date_written, asker_name, asker_email, reported, helpful)
    VALUES($1, $2, $3, $4, $5, 'f', 0)
    `;

    return db.query(queryString, [product_id, body, Date.now(), name, email]);
  },

  addAnswer: (question_id , body, name, email, photos) => {
    const queryString = `
    with answer as (
      INSERT INTO answers
      (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
      VALUES($1, $2, $3, $4, $5, 'f', 0)
      returning id
    )
    INSERT INTO photos
    (answer_id, url)
    VALUES((SELECT id from answer), unnest($6::varchar[]))
    `;

    return db.query(queryString, [question_id, body, Date.now(), name, email, photos]);
  },

  addQuestionHelpful: (question_id) => {
    return db.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = $1`, [question_id])
  },

  addAnswerHelpful: (answer_id) => {
    return db.query(`UPDATE answers SET helpful = helpful + 1 WHERE id = $1`, [answer_id]);
  },

  reportQuestion: (question_id, callback) => {
    return db.query(`UPDATE questions SET reported = 't' WHERE id = $1`, [question_id]);
  },

  reportAnswer: (answer_id, callback) => {
    return db.query(`UPDATE answers SET reported = 't' WHERE id = $1`, [answer_id]);
  }
};