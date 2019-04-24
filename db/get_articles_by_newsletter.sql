SELECT
    *
FROM 
    articles
WHERE
    newsletter_id = $1
LIMIT 4;