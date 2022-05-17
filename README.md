# Case-Study
Case study


# Backend Kurulum

Backend için postgresql ve Node js kullanıldı.

Öncelikle pgAdmin'den databasemizi oluşturuyoruz gerekli tablelerin kodlarını aşağıya ekleyeceğim.

## Kategori Tablosu:

```sql
CREATE TABLE IF NOT EXISTS public.category
(
    category_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    parent_id integer NOT NULL,
    category_name text COLLATE pg_catalog."default" NOT NULL,
    isdeleted boolean DEFAULT false
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.category
    OWNER to postgres;
```

## İlan Tablosu Create:

```sql 
CREATE TABLE IF NOT EXISTS public.ilan(
    ilan_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    createduser text COLLATE pg_catalog."default" NOT NULL,
    category text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT ilan_pkey PRIMARY KEY (ilan_id),
    CONSTRAINT ilan_title_key UNIQUE (title)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.ilan
    OWNER to postgres;```
### Kullanıcı tablosu create:
```sql
CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    ad text COLLATE pg_catalog."default" NOT NULL,
    soyad text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
```
Tablolarımızı oluşturduktan sonra node js tarafında express js ile bağlayacağız.
Öncelikle projemizin root klasörüne .env dosyacı açıp connection stringmizi koyuyoruz
DB_CONNECTION_STRING = postgresql://postgres:<Şifreniz>@localhost:5432/< DbAdiniz > Bundan sonra
config klasöründe db.js adlı bir dosya açıp kodumuzu yapıştırıyoruz
```js
import pg from 'pg'

import dotenv from 'dotenv'

  

dotenv.config()

  

const postgresClient = new pg.Pool({

    connectionString: process.env.DB_CONNECTION_STRING

})

  

export default postgresClient
```
Bağlantımızı sağladık.

nodemon kütüphanesini kurduktan sonra (npm install nodemon)
```json
  "scripts": {

    "start": "nodemon index.js"

  }
```
package.json dosyamızda ki start kısmını değiştiriyoruz. artık npm start ile backendimizi çalıştırabiliriz.
# Frontend Kurulum




https://user-images.githubusercontent.com/27727020/168455343-ae659129-8359-43ee-a18d-27e7cec8bb94.mp4

