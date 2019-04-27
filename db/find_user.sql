SELECT
    id,
    username,
    password,
    email,
    profile_img,
    last_login
FROM
    users
WHERE
    email ILIKE $1 
    OR username ILIKE $1;