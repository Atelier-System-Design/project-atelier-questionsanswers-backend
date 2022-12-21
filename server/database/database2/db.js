const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/qna', { useNewUrlParser: true, useUnifiedTopology: true });

const qnaSchema = new mongoose.Schema({
  product_id: Number,
  questions: [{ question_id: Number, name: String, email: String, date: Date, body: String, helpfulness: Number, reported: Boolean, answers: [{name: String, answer_id: Number, date: Date, body: String, helpfulness: Number, photos: [{url: String}]}]}],
});

const QNA = mongoose.model('QNA', qnaSchema);

module.exports = QNA;