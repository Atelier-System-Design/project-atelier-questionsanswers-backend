import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 3000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 1000,
      maxVUs: 3000,
    },
  },
};

const answerBody = JSON.stringify({
  body: 'This is a test answer.',
  name: 'LoadTest',
  email: 'loadtest@gmail.com'
});

export default () => {
  const questionId = randomIntBetween(1, 3518963);
  check(http.post(`http://localhost:3000/qa/questions/${questionId}/answers}`, answerBody, {
    headers: { 'Content-Type': 'application/json' },
  }), {
    'post question status is 201': (res) => res.status === 201
  });
};