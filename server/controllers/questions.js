const models = require('../models');

module.exports = {
  getQuestions: (req, res) => {
    models.getQuestions(req.params.product_id, req.query, (err, data) => {
      res.status(err ? 404 : 200).send(data);
    });
  },

  getAnswers: (req, res) => {
    models.getAnswers(req.params.question_id, req.query, (err, data) => {
      res.status(err ? 400 : 200).send(data);
    });
  },

  addQuestion: (req, res) => {
    models.addQuestion(req.params.product_id, req.body, (err, data) => {
      res.status(err ? 400 : 201).send();
    });
  },

  addAnswer: (req, res) => {
    models.addAnswer(req.params.question_id, req.body, (err, data) => {
      res.status(err ? 400 : 201).send();
    });
  },

  addQuestionHelpful: (req, res) => {
    models.addQuestionHelpful(req.params.question_id, (err, data) => {
      res.status(err ? 400 : 204).send();
    });
  },

  addAnswerHelpful: (req, res) => {
    models.addAnswerHelpful(req.params.answer_id, (err, data) => {
      res.status(err ? 400 : 204).send();
    });
  },

  reportQuestion: (req, res) => {
    models.reportQuestion(req.params.question_id, (err, data) => {
      res.status(err ? 400 : 204).send();
    });
  },

  reportAnswer: (req, res) => {
    models.reportAnswer(req.params.answer_id, (err, data) => {
      res.status(err ? 400 : 204).send();
    });
  }
};