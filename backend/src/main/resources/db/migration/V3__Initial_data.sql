-- Insertion of person
INSERT INTO person (first_name, last_name, birth_date, country, email, password, role, active)
VALUES ('Ahmedin', 'Hasanovic', '2000-02-22', 'Bosna I Hercegovina', 'ahmedinhasanovic2000@gmail.com', '$2a$12$1qbXh50N3q78lZpa4gQ0OOAy37h0F6LuwjVuV/zIp2ejN1YpfYvUe', 'ROLE_USER', true),
       ('Niko', 'Nikic', '2000-02-22', 'Bosna I Hercegovina', 'ahasanovic2@etf.unsa.ba', '$2a$12$1qbXh50N3q78lZpa4gQ0OOAy37h0F6LuwjVuV/zIp2ejN1YpfYvUe', 'ROLE_USER', true);

-- Insertion of categories
INSERT INTO category (name) VALUES
                                ('Women'),
                                ('Men'),
                                ('Kids'),
                                ('Accessories'),
                                ('Home'),
                                ('Art'),
                                ('Computers');

-- Insertion of subcategories
INSERT INTO sub_category (name, category_id) VALUES
                                                 ('Accessories', (SELECT id FROM category c WHERE c.name='Women')),
                                                 ('Bags', (SELECT id FROM category c WHERE c.name='Women')),
                                                 ('Shoes', (SELECT id FROM category c WHERE c.name='Women')),
                                                 ('Accessories', (SELECT id FROM category c WHERE c.name='Men')),
                                                 ('Shoes', (SELECT id FROM category c WHERE c.name='Men')),
                                                 ('Clothes', (SELECT id FROM category c WHERE c.name='Men')),
                                                 ('Toys', (SELECT id FROM category c WHERE c.name='Kids')),
                                                 ('Clothes', (SELECT id FROM category c WHERE c.name='Kids')),
                                                 ('Watches', (SELECT id FROM category c WHERE c.name='Accessories')),
                                                 ('Jewelry', (SELECT id FROM category c WHERE c.name='Accessories')),
                                                 ('Bed & Bath', (SELECT id FROM category c WHERE c.name='Home')),
                                                 ('Kitchenware', (SELECT id FROM category c WHERE c.name='Home')),
                                                 ('Paintings', (SELECT id FROM category c WHERE c.name='Art')),
                                                 ('Sculptures', (SELECT id FROM category c WHERE c.name='Art')),
                                                 ('Laptops', (SELECT id FROM category c WHERE c.name='Computers')),
                                                 ('Peripherals', (SELECT id FROM category c WHERE c.name='Computers'));

-- Insertion of products
INSERT INTO product (name, description, start_price, created_at, auction_start, auction_end, size, color, subcategory_id, user_id, is_paid) VALUES
                                                                                                                                       ('Adidas Breaknet Sleek Sneaker - Womens','Rock a bit of retro style with the Breaknet Sleek sneaker from adidas. This lace-up is upgraded with a plush Cloudfoam footbed set atop of contrasting gum sole for the perfect balance of fashion and function.',50,'2024-05-01T01:00:00.000','2024-05-02','2024-07-01', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Adidas Grand Court 2.0 Sneaker - Womens','You cannot go wrong with the classic design of the Grand Court 2.0 sneaker from adidas. This lace-up features a versatile silhouette that you can effortlessly rock with any casual outfit.',69.99,'2024-05-01T01:15:00.000','2024-05-02','2024-05-16', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Betsey Johnson Suton Highwall Bling Platform Sneaker','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',74.98,'2024-05-01T01:30:00.000','2024-05-02','2024-07-02', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Converse Chuck Taylor All Star Move High-Top Sneaker - Womens','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',66,'2024-05-01T01:30:00.000','2024-05-02','2024-07-11', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Converse Chuck Taylor Platform Sneaker - Womens','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',34,'2024-05-01T01:30:00.000','2024-05-02','2024-07-01', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('New Balance 515 V3 Sneaker - Womens','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',45,'2024-05-01T01:40:00.000','2024-05-02','2024-07-08', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('New Balance 997H Sneaker - Womens','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',17,'2024-05-01T01:55:00.000','2024-05-02','2024-07-02', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Puma Carina Street Platform Sneaker - Womens','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',65,'2024-05-01T11:45:00.000','2024-05-02','2024-07-08', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Vans Range EXP Sneaker - Womens','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',89.95,'2024-05-01T01:22:00.000','2024-05-02','2024-07-12', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Vans Ward Lo Suede Sneaker - Womens','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',32.15,'2024-05-01T03:30:00.000','2024-05-02','2024-06-16', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Apple Macbook Air (MQKP3ZEA)','OS: No\nDisplay: 15,6\nResolution: 1920x1080\nCPU: Intel i7-1165G7 (2.8- 4.7GHz, 8MB)\nRAM: 16GB DDR4 SSD: 512GB\nVGA: Intel Iris Xe Graphics\nNetwork: WiFi, Bluetooth 5.0, RJ-45 Inputs: 1xUSB2.0 2xUSB3.2, HDMI, audio\nBattery: 3-cell\nWarranty: 24 months.',950,'2024-05-01T01:00:00.000','2024-05-02','2024-07-01', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Laptops' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Computers')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Apple Macbook Air 13,3 (MGN63CRA)','OS: No\nDisplay: 15,6\nResolution: 1920x1080\nCPU: Intel i7-1165G7 (2.8- 4.7GHz, 8MB)\nRAM: 16GB DDR4 SSD: 512GB\nVGA: Intel Iris Xe Graphics\nNetwork: WiFi, Bluetooth 5.0, RJ-45 Inputs: 1xUSB2.0 2xUSB3.2, HDMI, audio\nBattery: 3-cell\nWarranty: 24 months.',869.99,'2024-05-01T01:15:00.000','2024-05-02','2024-06-25', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Laptops' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Computers')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('ASUS ZenBook UM3504DA-MA212','OS: No\nDisplay: 15,6\nResolution: 1920x1080\nCPU: Intel i7-1165G7 (2.8- 4.7GHz, 8MB)\nRAM: 16GB DDR4 SSD: 512GB\nVGA: Intel Iris Xe Graphics\nNetwork: WiFi, Bluetooth 5.0, RJ-45 Inputs: 1xUSB2.0 2xUSB3.2, HDMI, audio\nBattery: 3-cell\nWarranty: 24 months.',474.98,'2024-05-01T01:30:00.000','2024-05-02','2024-07-02', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Laptops' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Computers')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Laptop Acer A315-24P-R83E','OS: No\nDisplay: 15,6\nResolution: 1920x1080\nCPU: Intel i7-1165G7 (2.8- 4.7GHz, 8MB)\nRAM: 16GB DDR4 SSD: 512GB\nVGA: Intel Iris Xe Graphics\nNetwork: WiFi, Bluetooth 5.0, RJ-45 Inputs: 1xUSB2.0 2xUSB3.2, HDMI, audio\nBattery: 3-cell\nWarranty: 24 months.',466,'2024-05-01T01:30:00.000','2024-05-02','2024-07-11', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Laptops' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Computers')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Laptop Acer A515-47-R5RB','OS: No\nDisplay: 15,6\nResolution: 1920x1080\nCPU: Intel i7-1165G7 (2.8- 4.7GHz, 8MB)\nRAM: 16GB DDR4 SSD: 512GB\nVGA: Intel Iris Xe Graphics\nNetwork: WiFi, Bluetooth 5.0, RJ-45 Inputs: 1xUSB2.0 2xUSB3.2, HDMI, audio\nBattery: 3-cell\nWarranty: 24 months.',434,'2024-05-01T01:30:00.000','2024-05-02','2024-07-01', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Laptops' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Computers')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Laptop Acer Aspire 3 A315-44P-R6GG','OS: No\nDisplay: 15,6\nResolution: 1920x1080\nCPU: Intel i7-1165G7 (2.8- 4.7GHz, 8MB)\nRAM: 16GB DDR4 SSD: 512GB\nVGA: Intel Iris Xe Graphics\nNetwork: WiFi, Bluetooth 5.0, RJ-45 Inputs: 1xUSB2.0 2xUSB3.2, HDMI, audio\nBattery: 3-cell\nWarranty: 24 months.',545,'2024-05-01T01:40:00.000','2024-05-02','2024-07-08', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Laptops' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Computers')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Laptop Acer Aspire 3 A315-44P-R450','OS: No\nDisplay: 15,6\nResolution: 1920x1080\nCPU: Intel i7-1165G7 (2.8- 4.7GHz, 8MB)\nRAM: 16GB DDR4 SSD: 512GB\nVGA: Intel Iris Xe Graphics\nNetwork: WiFi, Bluetooth 5.0, RJ-45 Inputs: 1xUSB2.0 2xUSB3.2, HDMI, audio\nBattery: 3-cell\nWarranty: 24 months.',517,'2024-05-01T01:55:00.000','2024-05-02','2024-07-02', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Laptops' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Computers')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Laptop Acer Aspire 3 A315-58-52EX','OS: No\nDisplay: 15,6\nResolution: 1920x1080\nCPU: Intel i7-1165G7 (2.8- 4.7GHz, 8MB)\nRAM: 16GB DDR4 SSD: 512GB\nVGA: Intel Iris Xe Graphics\nNetwork: WiFi, Bluetooth 5.0, RJ-45 Inputs: 1xUSB2.0 2xUSB3.2, HDMI, audio\nBattery: 3-cell\nWarranty: 24 months.',565,'2024-05-01T11:45:00.000','2024-05-02','2024-07-08', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Laptops' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Computers')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Laptop Acer Aspire 3 A315-58-726S','OS: No\nDisplay: 15,6\nResolution: 1920x1080\nCPU: Intel i7-1165G7 (2.8- 4.7GHz, 8MB)\nRAM: 16GB DDR4 SSD: 512GB\nVGA: Intel Iris Xe Graphics\nNetwork: WiFi, Bluetooth 5.0, RJ-45 Inputs: 1xUSB2.0 2xUSB3.2, HDMI, audio\nBattery: 3-cell\nWarranty: 24 months.',589.95,'2024-05-01T01:22:00.000','2024-05-02','2024-07-12', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Laptops' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Computers')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Laptop Acer Aspire 3 A315-440-R67R','OS: No\nDisplay: 15,6\nResolution: 1920x1080\nCPU: Intel i7-1165G7 (2.8- 4.7GHz, 8MB)\nRAM: 16GB DDR4 SSD: 512GB\nVGA: Intel Iris Xe Graphics\nNetwork: WiFi, Bluetooth 5.0, RJ-45 Inputs: 1xUSB2.0 2xUSB3.2, HDMI, audio\nBattery: 3-cell\nWarranty: 24 months.',532.15,'2024-05-01T03:30:00.000','2024-05-02','2024-06-16', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Laptops' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Computers')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false);

-- Insertion of product pictures
INSERT INTO product_picture (name, url, product_id) VALUES
                                                        ('Adidas Breaknet Sleek Sneaker - Womens/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Adidas+Breaknet+Sleek+Sneaker+-+Womens/pic1.png', (SELECT p.id FROM product p WHERE p.name='Adidas Breaknet Sleek Sneaker - Womens')),
                                                        ('Adidas Breaknet Sleek Sneaker - Womens/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Adidas+Breaknet+Sleek+Sneaker+-+Womens/pic2.png', (SELECT p.id FROM product p WHERE p.name='Adidas Breaknet Sleek Sneaker - Womens')),
                                                        ('Adidas Breaknet Sleek Sneaker - Womens/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Adidas+Breaknet+Sleek+Sneaker+-+Womens/pic3.png', (SELECT p.id FROM product p WHERE p.name='Adidas Breaknet Sleek Sneaker - Womens')),
                                                        ('Adidas Grand Court 2.0 Sneaker - Womens/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Adidas+Grand+Court+2.0+Sneaker+-+Womens/pic1.png', (SELECT p.id FROM product p WHERE p.name='Adidas Grand Court 2.0 Sneaker - Womens')),
                                                        ('Adidas Grand Court 2.0 Sneaker - Womens/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Adidas+Grand+Court+2.0+Sneaker+-+Womens/pic2.png', (SELECT p.id FROM product p WHERE p.name='Adidas Grand Court 2.0 Sneaker - Womens')),
                                                        ('Adidas Grand Court 2.0 Sneaker - Womens/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Adidas+Grand+Court+2.0+Sneaker+-+Womens/pic3.png', (SELECT p.id FROM product p WHERE p.name='Adidas Grand Court 2.0 Sneaker - Womens')),
                                                        ('Adidas Grand Court 2.0 Sneaker - Womens/pic4.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Adidas+Grand+Court+2.0+Sneaker+-+Womens/pic4.png', (SELECT p.id FROM product p WHERE p.name='Adidas Grand Court 2.0 Sneaker - Womens')),
                                                        ('Betsey Johnson Suton Highwall Bling Platform Sneaker/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Betsey+Johnson+Suton+Highwall+Bling+Platform+Sneaker/pic1.png', (SELECT p.id FROM product p WHERE p.name='Betsey Johnson Suton Highwall Bling Platform Sneaker')),
                                                        ('Betsey Johnson Suton Highwall Bling Platform Sneaker/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Betsey+Johnson+Suton+Highwall+Bling+Platform+Sneaker/pic2.png', (SELECT p.id FROM product p WHERE p.name='Betsey Johnson Suton Highwall Bling Platform Sneaker')),
                                                        ('Betsey Johnson Suton Highwall Bling Platform Sneaker/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Betsey+Johnson+Suton+Highwall+Bling+Platform+Sneaker/pic3.png', (SELECT p.id FROM product p WHERE p.name='Betsey Johnson Suton Highwall Bling Platform Sneaker')),
                                                        ('Converse Chuck Taylor All Star Move High-Top Sneaker - Womens/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Converse+Chuck+Taylor+All+Star+Move+High-Top+Sneaker+-+Womens/pic1.png', (SELECT p.id FROM product p WHERE p.name='Converse Chuck Taylor All Star Move High-Top Sneaker - Womens')),
                                                        ('Converse Chuck Taylor All Star Move High-Top Sneaker - Womens/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Converse+Chuck+Taylor+All+Star+Move+High-Top+Sneaker+-+Womens/pic2.png', (SELECT p.id FROM product p WHERE p.name='Converse Chuck Taylor All Star Move High-Top Sneaker - Womens')),
                                                        ('Converse Chuck Taylor All Star Move High-Top Sneaker - Womens/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Converse+Chuck+Taylor+All+Star+Move+High-Top+Sneaker+-+Womens/pic3.png', (SELECT p.id FROM product p WHERE p.name='Converse Chuck Taylor All Star Move High-Top Sneaker - Womens')),
                                                        ('Converse Chuck Taylor All Star Move High-Top Sneaker - Womens/pic4.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Converse+Chuck+Taylor+All+Star+Move+High-Top+Sneaker+-+Womens/pic4.png', (SELECT p.id FROM product p WHERE p.name='Converse Chuck Taylor All Star Move High-Top Sneaker - Womens')),
                                                        ('Converse Chuck Taylor Platform Sneaker - Womens/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Converse+Chuck+Taylor+Platform+Sneaker+-+Womens/pic1.png', (SELECT p.id FROM product p WHERE p.name='Converse Chuck Taylor Platform Sneaker - Womens')),
                                                        ('Converse Chuck Taylor Platform Sneaker - Womens/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Converse+Chuck+Taylor+Platform+Sneaker+-+Womens/pic2.png', (SELECT p.id FROM product p WHERE p.name='Converse Chuck Taylor Platform Sneaker - Womens')),
                                                        ('Converse Chuck Taylor Platform Sneaker - Womens/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Converse+Chuck+Taylor+Platform+Sneaker+-+Womens/pic3.png', (SELECT p.id FROM product p WHERE p.name='Converse Chuck Taylor Platform Sneaker - Womens')),
                                                        ('Converse Chuck Taylor Platform Sneaker - Womens/pic4.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Converse+Chuck+Taylor+Platform+Sneaker+-+Womens/pic4.png', (SELECT p.id FROM product p WHERE p.name='Converse Chuck Taylor Platform Sneaker - Womens')),
                                                        ('New Balance 515 V3 Sneaker - Womens/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/New+Balance+515+V3+Sneaker+-+Womens/pic1.png', (SELECT p.id FROM product p WHERE p.name='New Balance 515 V3 Sneaker - Womens')),
                                                        ('New Balance 515 V3 Sneaker - Womens/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/New+Balance+515+V3+Sneaker+-+Womens/pic2.png', (SELECT p.id FROM product p WHERE p.name='New Balance 515 V3 Sneaker - Womens')),
                                                        ('New Balance 515 V3 Sneaker - Womens/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/New+Balance+515+V3+Sneaker+-+Womens/pic3.png', (SELECT p.id FROM product p WHERE p.name='New Balance 515 V3 Sneaker - Womens')),
                                                        ('New Balance 997H Sneaker - Womens/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/New+Balance+997H+Sneaker+-+Womens/pic1.png', (SELECT p.id FROM product p WHERE p.name='New Balance 997H Sneaker - Womens')),
                                                        ('New Balance 997H Sneaker - Womens/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/New+Balance+997H+Sneaker+-+Womens/pic2.png', (SELECT p.id FROM product p WHERE p.name='New Balance 997H Sneaker - Womens')),
                                                        ('New Balance 997H Sneaker - Womens/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/New+Balance+997H+Sneaker+-+Womens/pic3.png', (SELECT p.id FROM product p WHERE p.name='New Balance 997H Sneaker - Womens')),
                                                        ('Puma Carina Street Platform Sneaker - Womens/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Puma+Carina+Street+Platform+Sneaker+-+Womens/pic1.png', (SELECT p.id FROM product p WHERE p.name='Puma Carina Street Platform Sneaker - Womens')),
                                                        ('Puma Carina Street Platform Sneaker - Womens/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Puma+Carina+Street+Platform+Sneaker+-+Womens/pic2.png', (SELECT p.id FROM product p WHERE p.name='Puma Carina Street Platform Sneaker - Womens')),
                                                        ('Puma Carina Street Platform Sneaker - Womens/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Puma+Carina+Street+Platform+Sneaker+-+Womens/pic3.png', (SELECT p.id FROM product p WHERE p.name='Puma Carina Street Platform Sneaker - Womens')),
                                                        ('Vans Range EXP Sneaker - Womens/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Vans+Range+EXP+Sneaker+-+Womens/pic1.png', (SELECT p.id FROM product p WHERE p.name='Vans Range EXP Sneaker - Womens')),
                                                        ('Vans Range EXP Sneaker - Womens/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Vans+Range+EXP+Sneaker+-+Womens/pic2.png', (SELECT p.id FROM product p WHERE p.name='Vans Range EXP Sneaker - Womens')),
                                                        ('Vans Range EXP Sneaker - Womens/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Vans+Range+EXP+Sneaker+-+Womens/pic3.png', (SELECT p.id FROM product p WHERE p.name='Vans Range EXP Sneaker - Womens')),
                                                        ('Vans Ward Lo Suede Sneaker - Womens/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Vans+Ward+Lo+Suede+Sneaker+-+Womens/pic1.png', (SELECT p.id FROM product p WHERE p.name='Vans Ward Lo Suede Sneaker - Womens')),
                                                        ('Vans Ward Lo Suede Sneaker - Womens/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Vans+Ward+Lo+Suede+Sneaker+-+Womens/pic2.png', (SELECT p.id FROM product p WHERE p.name='Vans Ward Lo Suede Sneaker - Womens')),
                                                        ('Vans Ward Lo Suede Sneaker - Womens/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Vans+Ward+Lo+Suede+Sneaker+-+Womens/pic3.png', (SELECT p.id FROM product p WHERE p.name='Vans Ward Lo Suede Sneaker - Womens')),
                                                        ('Apple Macbook Air (MQKP3ZEA)/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Apple+Macbook+Air+(MQKP3ZEA)/pic1.png', (SELECT p.id FROM product p WHERE p.name='Apple Macbook Air (MQKP3ZEA)')),
                                                        ('Apple Macbook Air (MQKP3ZEA)/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Apple+Macbook+Air+(MQKP3ZEA)/pic2.png', (SELECT p.id FROM product p WHERE p.name='Apple Macbook Air (MQKP3ZEA)')),
                                                        ('Apple Macbook Air (MQKP3ZEA)/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Apple+Macbook+Air+(MQKP3ZEA)/pic3.png', (SELECT p.id FROM product p WHERE p.name='Apple Macbook Air (MQKP3ZEA)')),
                                                        ('Apple Macbook Air 13,3 (MGN63CRA)/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Apple+Macbook+Air+13%2C3+(MGN63CRA)/pic1.png', (SELECT p.id FROM product p WHERE p.name='Apple Macbook Air 13,3 (MGN63CRA)')),
                                                        ('Apple Macbook Air 13,3 (MGN63CRA)/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Apple+Macbook+Air+13%2C3+(MGN63CRA)/pic2.png', (SELECT p.id FROM product p WHERE p.name='Apple Macbook Air 13,3 (MGN63CRA)')),
                                                        ('Apple Macbook Air 13,3 (MGN63CRA)/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Apple+Macbook+Air+13%2C3+(MGN63CRA)/pic3.png', (SELECT p.id FROM product p WHERE p.name='Apple Macbook Air 13,3 (MGN63CRA)')),
                                                        ('ASUS ZenBook UM3504DA-MA212/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/ASUS+ZenBook+UM3504DA-MA212/pic1.png', (SELECT p.id FROM product p WHERE p.name='ASUS ZenBook UM3504DA-MA212')),
                                                        ('ASUS ZenBook UM3504DA-MA212/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/ASUS+ZenBook+UM3504DA-MA212/pic2.png', (SELECT p.id FROM product p WHERE p.name='ASUS ZenBook UM3504DA-MA212')),
                                                        ('ASUS ZenBook UM3504DA-MA212/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/ASUS+ZenBook+UM3504DA-MA212/pic3.png', (SELECT p.id FROM product p WHERE p.name='ASUS ZenBook UM3504DA-MA212')),
                                                        ('Laptop Acer A315-24P-R83E/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+A315-24P-R83E/pic1.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer A315-24P-R83E')),
                                                        ('Laptop Acer A315-24P-R83E/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+A315-24P-R83E/pic2.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer A315-24P-R83E')),
                                                        ('Laptop Acer A315-24P-R83E/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+A315-24P-R83E/pic3.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer A315-24P-R83E')),
                                                        ('Laptop Acer A515-47-R5RB/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+A515-47-R5RB/pic1.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer A515-47-R5RB')),
                                                        ('Laptop Acer A515-47-R5RB/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+A515-47-R5RB/pic2.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer A515-47-R5RB')),
                                                        ('Laptop Acer A515-47-R5RB/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+A515-47-R5RB/pic3.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer A515-47-R5RB')),
                                                        ('Laptop Acer Aspire 3 A315-44P-R6GG/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-44P-R6GG/pic1.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-44P-R6GG')),
                                                        ('Laptop Acer Aspire 3 A315-44P-R6GG/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-44P-R6GG/pic2.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-44P-R6GG')),
                                                        ('Laptop Acer Aspire 3 A315-44P-R6GG/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-44P-R6GG/pic3.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-44P-R6GG')),
                                                        ('Laptop Acer Aspire 3 A315-44P-R450/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-44P-R450/pic1.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-44P-R450')),
                                                        ('Laptop Acer Aspire 3 A315-44P-R450/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-44P-R450/pic2.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-44P-R450')),
                                                        ('Laptop Acer Aspire 3 A315-44P-R450/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-44P-R450/pic3.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-44P-R450')),
                                                        ('Laptop Acer Aspire 3 A315-58-52EX/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-58-52EX/pic1.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-58-52EX')),
                                                        ('Laptop Acer Aspire 3 A315-58-52EX/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-58-52EX/pic2.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-58-52EX')),
                                                        ('Laptop Acer Aspire 3 A315-58-52EX/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-58-52EX/pic3.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-58-52EX')),
                                                        ('Laptop Acer Aspire 3 A315-58-726S/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-58-726S/pic1.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-58-726S')),
                                                        ('Laptop Acer Aspire 3 A315-58-726S/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-58-726S/pic2.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-58-726S')),
                                                        ('Laptop Acer Aspire 3 A315-58-726S/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-58-726S/pic3.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-58-726S')),
                                                        ('Laptop Acer Aspire 3 A315-440-R67R/pic1.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-440-R67R/pic1.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-440-R67R')),
                                                        ('Laptop Acer Aspire 3 A315-440-R67R/pic2.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-440-R67R/pic2.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-440-R67R')),
                                                        ('Laptop Acer Aspire 3 A315-440-R67R/pic3.png', 'https://auction-s3-bucket.s3.eu-central-1.amazonaws.com/Laptop+Acer+Aspire+3+A315-440-R67R/pic3.png', (SELECT p.id FROM product p WHERE p.name='Laptop Acer Aspire 3 A315-440-R67R'));
insert into bid (amount, user_id, product_id)
values (71.00, 2, 2),
       (72.00, 2, 3);