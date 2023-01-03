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
      preAllocatedVUs: 500,
      maxVUs: 1000,
    },
  },
};

export default () => {
  const answerId = randomIntBetween(1, 6879305);
  check(http.put(`http://localhost:3000/qa/answers/${answerId}/report`), {
    'put answer report status is 204': (res) => res.status === 204
  });
};