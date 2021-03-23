DROP TABLE IF EXISTS todos; -- added DROP TABLE so we can make changes each time
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  task VARCHAR(128) NOT NULL,
  completed BOOLEAN NOT NULL
);