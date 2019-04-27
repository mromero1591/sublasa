INSERT INTO users (username, password, email, last_login)
VALUES ($1, $2, $1, NOW())
RETURNING *;