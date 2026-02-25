-- +goose Up
-- image
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS refresh_token TEXT;

-- +goose Down
ALTER TABLE users
    DROP COLUMN IF EXISTS refresh_token;
