const models = require('../models');

module.exports = {
  getQuestions: (req, res) => {
    models.getQuestions(req.query.product_id, req.query.page, req.query.count)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(400).send(err));
  },

  getAnswers: (req, res) => {
    const page  = req.query.page || 1;
    const count = req.query.count || 5;
    models.getAnswers(req.params.question_id, page, count)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(404).send(err));
  },

  addQuestion: (req, res) => {
    models.addQuestion(req.params.product_id, req.body.body, req.body.name, req.body.email)
      .then(data => res.status(201).send())
      .catch(err => res.status(400).send());
  },

  addAnswer: (req, res) => {
    models.addAnswer(req.params.question_id, req.body.body, req.body.name, req.body.email, req.body.photos)
      .then(data => res.status(201).send())
      .catch(err => res.status(400).send());
  },

  addQuestionHelpful: (req, res) => {
    models.addQuestionHelpful(req.params.question_id)
      .then(() => res.status(204).send())
      .catch(err => res.status(400).send());
  },

  addAnswerHelpful: (req, res) => {
    models.addAnswerHelpful(req.params.answer_id)
      .then(() => res.status(204).send())
      .catch(err => res.status(400).send());
  },

  reportQuestion: (req, res) => {
    models.reportQuestion(req.params.question_id)
    .then(() => res.status(204).send())
    .catch(err => res.status(400).send());
  },

  reportAnswer: (req, res) => {
    models.reportAnswer(req.params.answer_id)
    .then(() => res.status(204).send())
    .catch(err => res.status(400).send());
  }
};