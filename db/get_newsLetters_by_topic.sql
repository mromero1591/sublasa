SELECT
    n.id,
    n.name,
    n.topic_id,
    n.snippet,
    n.img
FROM
    newsletters AS n
    JOIN topics AS t ON (n.topic_id = t.id)
WHERE
    t.name = $1