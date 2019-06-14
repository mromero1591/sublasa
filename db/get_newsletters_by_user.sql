SELECT
    n.id,
    n.name,
    n.topic_id,
    n.img,
    n.snippet,
    u.id AS USER_id
FROM
    user_newsletter_subscription AS ns
    JOIN newsletters AS n ON (ns.newsletter_id = n.id)
    JOIN users AS u ON (ns.user_id = u.id)
WHERE
    u.id = $1;