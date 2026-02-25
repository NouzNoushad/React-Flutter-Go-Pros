-- +goose Up
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_filename TEXT,
    image_file_path TEXT,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'guest',
    created_at TIMESTAMP DEFAULT now()
);

-- +goose Down
DROP TABLE users;
