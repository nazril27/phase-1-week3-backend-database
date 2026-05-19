-- nazril warehouse sql

-- 1
CREATE TABLE products (
	product_id INT,
	product_name VARCHAR(255),
	category VARCHAR(255),
	price NUMERIC
);

CREATE TABLE inventory (
	inventory_id INT,
	product_id INT,
	quantity INT,
	location TEXT
);

CREATE TABLE orders (
	order_id INT,
	customer_id INT,
	order_date DATETIME
);

CREATE TABLE orderDetails (
	order_detail_id INT,
	order_id INT,
	product_id INT,
	quantity INT
);

-- 2
INSERT INTO products (product_id, product_name, category, price) VALUES 
(1, 'Laptop', 'Elektronik', 999.99),
(2, 'Meja Kursi', 'Perabot', 199.99),
(3, 'Printer', 'Elektronik', 299.99),
(4, 'Rak Buku', 'Perabot', 149.99);

-- 3
SELECT product_name, price FROM products ORDER BY price DESC;

-- 4
INSERT INTO inventory (inventory_id, product_id, quantity, location) VALUES
(1, 1, 50, 'Gudang A'),
(2, 2, 30, 'Gudang B'),
(3, 3, 20, 'Gudang A'),
(4, 4, 40, 'Gudang B');

-- 5
SELECT p.product_name, i.quantity, i.location FROM products p 
JOIN inventory i ON p.product_id = i.product_id;

-- 6
UPDATE products 
SET price = 1099.99
WHERE product_name = 'Laptop';

-- 7
SELECT i.location, SUM(p.price * i.quantity) AS total_value FROM products p
JOIN inventory i ON p.product_id = i.product_id GROUP BY i.location;

-- 8
INSERT INTO orders (order_id, customer_id, order_date) VALUES
(1, 101, '2024-08-12'), (2, 102, '2024-08-13');

INSERT INTO orderDetails (order_detail_id, order_id, product_id, quantity) VALUES 
(1, 1, 1, 2), (2, 1, 3, 1), (3, 2, 2, 1), (4, 2, 4, 2);

-- 9
SELECT o.order_id, o.order_date, SUM(od.quantity * p.price) AS total_amount FROM orders o
JOIN orderDetails od ON o.order_id = od.order_id JOIN products p
ON p.product_id = od.product_id GROUP BY o.order_date;

-- 10
SELECT p.product_id, p.product_name FROM products p
LEFT JOIN orderDetails od ON p.product_id = od.product_id
WHERE od.product_id IS NULL;

-- 11
SELECT p.product_name, i.quantity, i.location FROM products p
JOIN inventory i ON p.product_id = i.product_id;



