COPY product(id, name, slogan, description, category, default_price)
FROM '/Users/justinchong/project-atelier-backend-QnA/data/product.csv'
DELIMITER ','
CSV HEADER;