const request = require('supertest')('http://localhost:3000/qa/questions');
const expect = require('chai').expect;


describe('GET /:product_id', () => {

  it('returns a 200 status code', async () => {
    const response = await request.get('/2');
    expect(response.status).to.eql(200);
  });

  it('returns an array of length less than or equal to 5 with default queries', async () => {
    const response = await request.get('/2');
    expect(response.body.length).to.be.oneOf([0, 1, 2, 3, 4, 5]);
  });

  it('returns array of objects with the following properties: id, product_id, body, date_written, asker_name, asker_email, reported, helpful', async () => {
    const response = await request.get('/2');
    expect(response.body[0].hasOwnProperty('id')).to.eql(true);
    expect(response.body[0].hasOwnProperty('product_id')).to.eql(true);
    expect(response.body[0].hasOwnProperty('body')).to.eql(true);
    expect(response.body[0].hasOwnProperty('date_written')).to.eql(true);
    expect(response.body[0].hasOwnProperty('asker_name')).to.eql(true);
    expect(response.body[0].hasOwnProperty('asker_email')).to.eql(true);
    expect(response.body[0].hasOwnProperty('reported')).to.eql(true);
    expect(response.body[0].hasOwnProperty('helpful')).to.eql(true);
  });

  it('returns different questions when page query is not 1', async () => {
    const response = await request.get('/2').query({ page: 3, count: 1 });
    const response2 = await request.get('/2').query({ count: 1 });
    expect(response.body[0]).to.not.equal(response2.body[0]);
  });

  it('returns 1 question with count query set to 1', async () => {
    const response = await request.get('/2').query({ count: 1 });
    expect(response.body.length).to.eql(1);
  });

  it('returns 2 questions with count query set to 2', async () => {
    const response = await request.get('/2').query({ count: 2 });
    expect(response.body.length).to.eql(2);
  });

  it('returns 3 questions with count query set to 3', async () => {
    const response = await request.get('/2').query({ count: 3 });
    expect(response.body.length).to.eql(3);
  });
});
