import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 2500,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 300,
      maxVUs: 500,
    },
  },
};

export default () => {
  const questionId = randomIntBetween(1, 3518963);
    check(http.get(`http://localhost:3000/qa/questions/${questionId}/answers`), {
    'get answers status is 200': (res) => res.status === 200
  });
};