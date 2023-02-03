CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(255) NOT NULL
);

CREATE TABLE variations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  size VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id)
);