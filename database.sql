-- DROP/CREATE DATABASE
DROP DATABASE IF EXISTS foodfy;
CREATE DATABASE foodfy;


-- CREATE TABLE "chefs"
CREATE TABLE "chefs" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "file_id" INT,
    "created_at" TIMESTAMP DEFAULT 'now()',
    "updated_at" TIMESTAMP DEFAULT 'now()'
);


-- CREATE TABLE "recipes"
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "chef_id" INT,
    "user_id" INT,
    "ingredients" TEXT[],
    "preparation" TEXT[],
    "information" TEXT,
    "created_at" TIMESTAMP DEFAULT(now()),
    "updated_at" TIMESTAMP DEFAULT(now())
);


-- CREATE TABLE "users"
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "reset_token" TEXT,
    "reset_token_expires" TEXT,
    "is_admin" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP DEFAULT(now()),
    "updated_at" TIMESTAMP DEFAULT(now())
);


-- CREATE TABLE "files"
CREATE TABLE "files" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL
);


-- CREATE TABLE "recipe_files"
CREATE TABLE "recipe_files" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "recipe_id" INT NOT NULL,
    "file_id" INT NOT NULL
);


-- CREATE TABLE "session"
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
) WITH (OIDS=FALSE);


ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;


-- CREATE FOREING KEYS
ALTER TABLE "chefs" ADD FOREIGN KEY ("file_id") REFERENCES "files" ("id") ON DELETE CASCADE;


ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id") ON DELETE CASCADE;
ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;


ALTER TABLE "recipe_files" ADD FOREIGN KEY (file_id) REFERENCES "files" ("id") ON DELETE CASCADE;
ALTER TABLE "recipe_files" ADD FOREIGN KEY (recipe_id) REFERENCES "recipes" ("id") ON DELETE CASCADE;


-- CREATE PROCEDURES
CREATE FUNCTION trigger_set_UPDATED_AT()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- CREATE TRIGGER's
-- AUTO UPDATED_AT RECIPES
CREATE TRIGGER set_updated_at_recipes
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_UPDATED_AT();


-- AUTO UPDATED_AT CHEFS
CREATE TRIGGER set_updated_at_chefs
BEFORE UPDATE ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_UPDATED_AT();


-- AUTO UPDATED_AT USERS
CREATE TRIGGER set_updated_at_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_UPDATED_AT();


-- CREATE USER ADMIN
INSERT INTO users (name, email, password, is_admin) VALUES ('Admin Foodfy', 'admin@foodfy.com.br', '$2a$08$Q4opIaTyokap4dsGuUI38OE3zVjEXOUONHx4AWg4D2/hKH.tsTB9u', true);