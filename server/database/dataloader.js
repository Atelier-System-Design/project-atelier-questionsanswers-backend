const path = require('path');
const fs = require('fs');
const db = require('./db');
const copyFrom = require('pg-copy-streams').from;

  const copyCSV = (tablename, csvName) => {
    db.connect()
      .then(client => {
        const stream = client.query(copyFrom(`COPY ${tablename} (placeholder, answer_id, url) FROM STDIN CSV HEADER`));
        const fileStream = fs.createReadStream(path.join(__dirname, `../../data/${csvName}.csv`));
        fileStream.on('error', error => {
          console.log(error);
          client.release();
        });
        stream.on('error', error => {
          console.log(error);
          client.release();
        });
        stream.on('finish', () => {
          console.log('finished');
          client.release();
        });
        fileStream.pipe(stream);
      });
  };

//copyCSV('product', 'product');
//const stream = client.query(copyFrom(`COPY ${tablename} (placeholder, name, slogan, description, category, default_price) FROM STDIN CSV HEADER`));

//copyCSV('question', 'questions');
//const stream = client.query(copyFrom(`COPY ${tablename} (placeholder, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM STDIN CSV HEADER`));

//copyCSV('answer', 'answers');
//const stream = client.query(copyFrom(`COPY ${tablename} (placeholder, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM STDIN CSV HEADER`));

//copyCSV('photo', 'answers_photos');
//const stream = client.query(copyFrom(`COPY ${tablename} (placeholder, answer_id, url) FROM STDIN CSV HEADER`));