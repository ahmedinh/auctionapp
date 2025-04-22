-- Insertion of person
INSERT INTO person (first_name, last_name, birth_date, country, email, password, role, active, picture_name)
VALUES ('Ahmedin', 'Hasanovic', '2000-02-22', 'Bosna I Hercegovina', 'ahmedinhasanovic2000@gmail.com', '$2a$10$VKX4fugGFplWqDgsWERMzu4dh7tqXBOYzmtjsWHmtBxEhR4A/mnvi', 'ROLE_USER', true, 'default_user/default_image.png');

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
                                                                                                                                       ('Adidas Courtblock','Rock a bit of retro style with the Breaknet Sleek sneaker from adidas. This lace-up is upgraded with a plush Cloudfoam footbed set atop of contrasting gum sole for the perfect balance of fashion and function.',50,'2024-05-01T01:00:00.000','2025-06-01','2026-06-01', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Ellesse Bordon','You cannot go wrong with the classic design of the Grand Court 2.0 sneaker from adidas. This lace-up features a versatile silhouette that you can effortlessly rock with any casual outfit.',69.99,'2024-05-01T01:15:00.000','2025-06-01','2026-06-01', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Nike Downshifter 13','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',74.98,'2024-05-01T01:30:00.000','2025-06-01','2026-06-01', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Nike Jordan Heir','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',66,'2024-05-01T01:30:00.000','2025-06-01','2026-06-01', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Sergio Tacchini Taormina','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',34,'2024-05-01T01:30:00.000','2025-06-01','2026-06-01', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false),
                                                                                                                                       ('Sergio Tacchini Verona NYL','Exude rockstar vibes in the Sydney Highwall Bling platform sneaker from Betsey Johnson. This sneaker features a rhinestone-embellished upper and a low platform heel for a trendy touch.',45,'2024-05-01T01:40:00.000','2025-06-01','2026-06-01', 'LARGE', 'BLACK', (SELECT sc.id FROM sub_category sc WHERE sc.name='Shoes' AND sc.category_id = (SELECT id FROM category c WHERE c.name='Women')), ((SELECT p.id FROM person p WHERE p.email='ahmedinhasanovic2000@gmail.com')), false);

-- Insertion of product pictures
INSERT INTO product_picture (name, product_id) VALUES
                                                        ('Adidas Courtblock/picture_1/Adidas_Courtblock_1.jpg', (SELECT p.id FROM product p WHERE p.name='Adidas Courtblock')),
                                                        ('Adidas Courtblock/picture_2/Adidas_Courtblock_2.jpg', (SELECT p.id FROM product p WHERE p.name='Adidas Courtblock')),
                                                        ('Adidas Courtblock/picture_3/Adidas_Courtblock_3.jpg', (SELECT p.id FROM product p WHERE p.name='Adidas Courtblock')),
                                                        ('Ellesse Bordon/picture_1/Ellesse_Bordon_1.jpg', (SELECT p.id FROM product p WHERE p.name='Ellesse Bordon')),
                                                        ('Ellesse Bordon/picture_2/Ellesse_Bordon_2.jpg', (SELECT p.id FROM product p WHERE p.name='Ellesse Bordon')),
                                                        ('Ellesse Bordon/picture_3/Ellesse_Bordon_3.jpg', (SELECT p.id FROM product p WHERE p.name='Ellesse Bordon')),
                                                        ('Nike Downshifter 13/picture_1/Nike_Downshifter_13_1.jpg', (SELECT p.id FROM product p WHERE p.name='Nike Downshifter 13')),
                                                        ('Nike Downshifter 13/picture_2/Nike_Downshifter_13_2.jpg', (SELECT p.id FROM product p WHERE p.name='Nike Downshifter 13')),
                                                        ('Nike Downshifter 13/picture_3/Nike_Downshifter_13_3.jpg', (SELECT p.id FROM product p WHERE p.name='Nike Downshifter 13')),
                                                        ('Nike Jordan Heir/picture_1/Nike_Jordan_Heir_1.jpg', (SELECT p.id FROM product p WHERE p.name='Nike Jordan Heir')),
                                                        ('Nike Jordan Heir/picture_2/Nike_Jordan_Heir_2.jpg', (SELECT p.id FROM product p WHERE p.name='Nike Jordan Heir')),
                                                        ('Nike Jordan Heir/picture_3/Nike_Jordan_Heir_3.jpg', (SELECT p.id FROM product p WHERE p.name='Nike Jordan Heir')),
                                                        ('Sergio Tacchini Taormina/picture_1/Sergio_Tacchini_Taormina_1.jpg', (SELECT p.id FROM product p WHERE p.name='Sergio Tacchini Taormina')),
                                                        ('Sergio Tacchini Taormina/picture_2/Sergio_Tacchini_Taormina_2.jpg', (SELECT p.id FROM product p WHERE p.name='Sergio Tacchini Taormina')),
                                                        ('Sergio Tacchini Taormina/picture_3/Sergio_Tacchini_Taormina_3.jpg', (SELECT p.id FROM product p WHERE p.name='Sergio Tacchini Taormina')),
                                                        ('Sergio Tacchini Verona NYL/picture_1/Sergio_Tacchini_Verona_NYL_1.jpg', (SELECT p.id FROM product p WHERE p.name='Sergio Tacchini Verona NYL')),
                                                        ('Sergio Tacchini Verona NYL/picture_2/Sergio_Tacchini_Verona_NYL_2.jpg', (SELECT p.id FROM product p WHERE p.name='Sergio Tacchini Verona NYL')),
                                                        ('Sergio Tacchini Verona NYL/picture_3/Sergio_Tacchini_Verona_NYL_3.jpg', (SELECT p.id FROM product p WHERE p.name='Sergio Tacchini Verona NYL'));

