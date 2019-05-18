DELETE
FROM user_newsletter_subscription
WHERE user_id = $1
    AND newsletter_id = $2