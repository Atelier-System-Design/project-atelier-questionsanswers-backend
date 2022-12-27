const models = require('../models');

module.exports = {
  getQuestions: (req, res) => {
    models.getQuestions(req.query, (err, data) => {
      res.status(err ? 404 : 200).send(data);
    });
  },

  getOneAnswers: (req, res) => {
    models.getOneAnswers(req.params.question_id, req.query, (err, data) => {
      res.status(err ? 404 : 200).send(data);
    });
  },

  addQuestion: (req, res) => {
    models.addQuestion(req.body, (err, data) => {
      err ? res.status(400).send(err) : res.status(200).send('success');
    });
  },

  addAnswer: (req, res) => {

  },

  addQuestionHelpful: (req, res) => {

  },

  addAnswerHelpful: (req, res) => {

  },

  reportQuestion: (req, res) => {

  },

  reportAnswer: (req, res) => {

  }
};