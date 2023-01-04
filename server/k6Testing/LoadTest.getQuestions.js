import http from 'k6/http';
import { sleep, check } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 2000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 500,
      maxVUs: 1000,
    }
  }
};

export const handleSummary = (data) => {
  return {
    "summary.html": htmlReport(data),
  };
}

export default () => {
  const productId = randomIntBetween(1, 1000011);
  check(http.get(`http://localhost:3000/qa/questions/?product_id=${productId}`), {
    'get questions status is 200': res => res.status === 200
  });
};