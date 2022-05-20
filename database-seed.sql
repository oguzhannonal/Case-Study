CREATE TABLE IF NOT EXISTS category
(
    category_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    parent_id integer NOT NULL,
    category_name text COLLATE pg_catalog."default" NOT NULL,
    isdeleted boolean DEFAULT false
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS category
    OWNER to postgres;

INSERT INTO category(category_name, parent_id) VALUES
 ('Meadow Crystalfreak ', '0'),
 ('Buddy-Ray Perceptor', '1'),
 ('Prince Flitterbell', '0');

