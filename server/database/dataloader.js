const path = require('path');
const fs = require('fs');
const db = require('./db');
const copyFrom = require('pg-copy-streams').from;

  const copyCSV = (tablename, csvName) => {
    db.connect()
      .then(client => {
        const stream = client.query(copyFrom(`COPY ${tablename} from STDIN CSV HEADER`));
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

copyCSV('product', 'product');