INSERT INTO articles(title, snippet, published_date, subject_line, content, newsletter_id)
VALUES ($1,$2,NOW(),$3,$4,$5);