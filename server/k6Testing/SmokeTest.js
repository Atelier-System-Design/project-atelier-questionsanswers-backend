import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  vus: 1,
  duration: '30s'
};

const questionBody = JSON.stringify({
  body: 'Is this a test question?',
  name: 'SmokeTest',
  email: 'smoketest@gmail.com'
});

const answerBody = JSON.stringify({
  body: 'This is a test answer!',
  name: 'SmokeTest',
  email: 'smoketest@gmail.com',
  photos: ['somepicurl.com', 'somepicurl2.com']
});

export default () => {
  const productId = randomIntBetween(1, 1000011);
  const questionId = randomIntBetween(1, 3518963);

  check(http.get(`http://localhost:3000/qa/questions/?product_id=${productId}`), {
    'get questions status is 200': (res) => res.status === 200
  });

  check(http.get(`http://localhost:3000/qa/questions/${questionId}/answers`), {
    'get answers status is 200': (res) => res.status === 200
  });

  check(http.post(`http://localhost:3000/qa/questions/${productId}`, questionBody, {
    headers: { 'Content-Type': 'application/json' },
  }), {
    'post question status is 201': (res) => res.status === 201
  });

  check(http.post(`http://localhost:3000/qa/questions/${questionId}/answers`, answerBody, {
    headers: { 'Content-Type': 'application/json' },
  }), {
    'post answer status is 201': (res) => res.status === 201
  });

  check(http.put('http://localhost:3000/qa/questions/1/helpful'), {
    'put question helpful status is 204': (res) => res.status === 204
  });

  check(http.put('http://localhost:3000/qa/questions/1/report'), {
    'put question report status is 204': (res) => res.status === 204
  });

  check(http.put('http://localhost:3000/qa/answers/1/helpful'), {
    'put answer helpful status is 204': (res) => res.status === 204
  });

  check(http.put('http://localhost:3000/qa/answers/1/report'), {
    'put answer report status is 204': (res) => res.status === 204
  });

  sleep(1);
};
