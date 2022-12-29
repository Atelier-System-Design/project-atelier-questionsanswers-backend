const request = require('supertest')('http://localhost:3000/qa/questions');
const expect = require('chai').expect;


describe('POST /:product_id', () => {
  it('successfully posts a question and returns a 201 status code', async () => {
    const requestBody = { asker_name: 'Spiderman', asker_email: 'Spidermanrulez@gmail.com', body: 'is this still avilable?' };
    const response = await request.post('/2').send(requestBody);
    expect(response.status).to.eql(201);
  });
});