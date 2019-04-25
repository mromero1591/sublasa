SELECT
    *
FROM 
    articles
WHERE
    newsletter_id = $1
ORDER BY Published_date DESC
LIMIT 4;
