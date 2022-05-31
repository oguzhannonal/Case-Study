# New UI
![CPT2205311800-1536x792](https://user-images.githubusercontent.com/27727020/171206101-392eed67-67f2-497c-b4d9-bd9907549a3f.gif)

# DEMO - URL
<https://www.oguzhanonal.xyz>
AWS'de host edildi , nginx web server kullanıldı, SSL sertifikaları etkin hale getirildi

Yapılan ekstalar :
- Docker - Compose 
- Prettier eslint
- Demo url
- Readme.md

# Docker kurulum

Projenin root klasörüne gelip 
- docker-compose up -d --build

- docker-compose up
Komutlarını terminalden çalıştırın. 


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
{
  "name": "gameflex",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.27.2",
    "bootstrap": "^4.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "jquery": "^3.6.0",
    "pg": "^8.7.3",
    "popper.js": "^1.16.1"
  },
  "devDependencies": {
    "eslint": "^8.15.0",
    "nodemon": "^2.0.16"
  }
}
```
package.json dosyamızda ki start kısmını değiştiriyoruz. artık npm start ile backendimizi çalıştırabiliriz.
# Frontend Kurulum
Frontend olarak Vue js, Css için bootstrap kullandım.
Vue js projemizi oluşturduktan sonra npm run serve ile çalıştırabilirsiniz.



Görüntü(Gif'e çevirildiği için piksellerde eksiklikler var):


![screen-capture (3)](https://user-images.githubusercontent.com/27727020/169715610-741708e8-fb09-4802-80c8-ead7e1cc75c8.gif)




