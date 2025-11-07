-- Sample Data for Sales System

-- Product Service Database
USE product_db;

-- Sample Products
INSERT INTO products (name, description, price, stock, category, image_url, active, created_at, updated_at) VALUES
('Notebook Dell Inspiron 15', 'Notebook Dell Inspiron 15 com Intel Core i7, 16GB RAM, 512GB SSD', 3500.00, 10, 'Eletrônicos', 'https://via.placeholder.com/300x200?text=Notebook+Dell', true, NOW(), NOW()),
('Mouse Logitech MX Master 3', 'Mouse sem fio ergonômico com sensor de alta precisão', 450.00, 25, 'Periféricos', 'https://via.placeholder.com/300x200?text=Mouse+Logitech', true, NOW(), NOW()),
('Teclado Mecânico Keychron K2', 'Teclado mecânico sem fio com switches Gateron Brown', 650.00, 15, 'Periféricos', 'https://via.placeholder.com/300x200?text=Teclado+Keychron', true, NOW(), NOW()),
('Monitor LG UltraWide 34"', 'Monitor ultrawide 34 polegadas, resolução 3440x1440', 2800.00, 8, 'Monitores', 'https://via.placeholder.com/300x200?text=Monitor+LG', true, NOW(), NOW()),
('Webcam Logitech C920', 'Webcam Full HD 1080p com microfone integrado', 380.00, 30, 'Periféricos', 'https://via.placeholder.com/300x200?text=Webcam+C920', true, NOW(), NOW()),
('Headset HyperX Cloud II', 'Headset gamer com som surround 7.1 virtual', 550.00, 20, 'Áudio', 'https://via.placeholder.com/300x200?text=Headset+HyperX', true, NOW(), NOW()),
('SSD Samsung 1TB', 'SSD NVMe M.2 1TB Samsung 980 PRO', 850.00, 40, 'Armazenamento', 'https://via.placeholder.com/300x200?text=SSD+Samsung', true, NOW(), NOW()),
('Memória RAM Corsair 16GB', 'Memória RAM DDR4 16GB 3200MHz Corsair Vengeance', 420.00, 35, 'Hardware', 'https://via.placeholder.com/300x200?text=RAM+Corsair', true, NOW(), NOW()),
('Placa de Vídeo RTX 3060', 'NVIDIA GeForce RTX 3060 12GB GDDR6', 2500.00, 5, 'Hardware', 'https://via.placeholder.com/300x200?text=RTX+3060', true, NOW(), NOW()),
('Cadeira Gamer DXRacer', 'Cadeira gamer ergonômica com ajuste de altura e reclinável', 1200.00, 12, 'Móveis', 'https://via.placeholder.com/300x200?text=Cadeira+DXRacer', true, NOW(), NOW());

-- Order Service Database
USE order_db;

-- Sample Orders (will be created via API)
-- These are examples of what orders will look like
/*
INSERT INTO orders (customer_name, customer_email, customer_phone, address, total_amount, status, created_at, updated_at) VALUES
('João Silva', 'joao@email.com', '(11) 99999-9999', 'Rua ABC, 123 - São Paulo, SP', 4500.00, 'PENDING', NOW(), NOW()),
('Maria Santos', 'maria@email.com', '(21) 88888-8888', 'Av. XYZ, 456 - Rio de Janeiro, RJ', 3080.00, 'CONFIRMED', NOW(), NOW());

INSERT INTO order_items (order_id, product_id, product_name, quantity, price, subtotal) VALUES
(1, 1, 'Notebook Dell Inspiron 15', 1, 3500.00, 3500.00),
(1, 3, 'Teclado Mecânico Keychron K2', 1, 650.00, 650.00),
(1, 2, 'Mouse Logitech MX Master 3', 1, 450.00, 450.00),
(2, 4, 'Monitor LG UltraWide 34"', 1, 2800.00, 2800.00);
*/
