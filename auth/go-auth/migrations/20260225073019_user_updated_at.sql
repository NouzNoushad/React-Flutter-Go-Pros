-- +goose Up
-- image
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT now();

-- +goose Down
ALTER TABLE users
    DROP COLUMN IF EXISTS updated_at;
