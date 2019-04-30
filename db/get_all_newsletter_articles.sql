SELECT
    a.*,
    n.name
FROM 
    articles AS a
    JOIN newsletters AS n ON (a.newsletter_id = n.id)
WHERE
    a.newsletter_id = $1
ORDER BY a.published_date DESC