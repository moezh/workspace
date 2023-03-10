--DROP TABLE store_config;
--DROP TABLE store_datafeeds;

CREATE TABLE store_config (
    name VARCHAR(255) PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);

INSERT INTO store_config (name, value)
VALUES 
('subdomain','store'),
('store_title','MH Store'),
('store_summary','Explore a diverse range of top-rated products and brands from around the world, all expertly curated and assembled in one convenient place.'),
('store_category_title','Categories'),
('store_category_summary','Find all your shopping needs in one place with our comprehensive category page. Browse through a variety of categories to discover the products you''re looking for.'),
('productsPerPage',24);

CREATE TABLE store_datafeeds (
"program_name" TEXT,
"program_url" TEXT,
"catalog_name" TEXT,
"last_updated" TEXT,
"id" TEXT,
"title" TEXT,
"description" TEXT,
"link" TEXT,
"impression_url" TEXT,
"image_link" TEXT,
"mobile_link" TEXT,
"additional_image_link" TEXT,
"availability" TEXT,
"availability_date" TEXT,
"expiration_date" TEXT,
"price" TEXT,
"sale_price" TEXT,
"sale_price_effective_date" TEXT,
"unit_pricing_measure" TEXT,
"unit_pricing_base_measure" TEXT,
"installment" TEXT,
"loyalty_points" TEXT,
"google_product_category" TEXT,
"google_product_category_name" TEXT,
"product_type" TEXT,
"brand" TEXT,
"gtin" TEXT,
"mpn" TEXT,
"identifier_exists" TEXT,
"condition" TEXT,
"adult" TEXT,
"multipack" TEXT,
"is_bundle" TEXT,
"energy_efficiency_class" TEXT,
"age_group" TEXT,
"color" TEXT,
"gender" TEXT,
"material" TEXT,
"pattern" TEXT,
"size" TEXT,
"size_type" TEXT,
"size_system" TEXT,
"item_group_id" TEXT,
"custom_label_0" TEXT,
"custom_label_1" TEXT,
"custom_label_2" TEXT,
"custom_label_3" TEXT,
"custom_label_4" TEXT,
"promotion_id" TEXT,
"shipping_label" TEXT,
"shipping_weight" TEXT,
"shipping_length" TEXT,
"shipping_width" TEXT,
"shipping_height" TEXT,
"min_handling_time" TEXT,
"max_handling_time" TEXT,
"shipping(country:region:service:price)" TEXT,
"shipping(country:postal_code:service:price)" TEXT,
"shipping(country:location_id:service:price)" TEXT,
"shipping(country:location_group_name:service:price)" TEXT,
"tax(rate:country:tax_ship:region)" TEXT,
"tax(rate:country:tax_ship:postal_code)" TEXT,
"tax(rate:country:tax_ship:location_id)" TEXT,
"tax(rate:country:tax_ship:location_group_name)" TEXT,
"product_uid" TEXT GENERATED ALWAYS AS (REGEXP_REPLACE(program_name||id, '[^A-Za-z0-9]+', '', 'g')) STORED,
"product_category_id" TEXT GENERATED ALWAYS AS (REGEXP_REPLACE(SPLIT_PART(google_product_category_name, ' > ', -1), '[^A-Za-z0-9]+', '', 'g')) STORED,
"product_category_name" TEXT GENERATED ALWAYS AS (SPLIT_PART(google_product_category_name, ' > ', -1)) STORED,
"text_search" tsvector GENERATED ALWAYS AS (to_tsvector('english', COALESCE(title, '') ||  ' ' || COALESCE(brand, '') || ' ' || COALESCE(google_product_category_name, '') || ' ' || COALESCE(product_type, '') || ' ' || COALESCE(color, '') || ' ' || COALESCE(gender, '')  || ' ' || COALESCE(material, ''))) STORED,
PRIMARY KEY (product_uid)
);

CREATE INDEX index_product_uid
ON store_datafeeds (
"product_uid"
);

CREATE INDEX index_product_category_id
ON store_datafeeds (
"product_category_id"
);

CREATE INDEX index_google_category
ON store_datafeeds (
"google_product_category_name"
);

CREATE INDEX index_text_search ON store_datafeeds USING GIN (text_search);

CREATE TABLE store_products_category (
"category" TEXT
);

CREATE TABLE store_products_count (
"product_category_id" TEXT,
"product_category_name" TEXT,
"product_count" bigint
);