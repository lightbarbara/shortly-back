import connection from "../database/db.js"

export function shortenUrlConnection(url, shortUrl, session) {
    return connection.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`, [url, shortUrl, session.userId])
}

export function getUrlByIdConnection(id) {
    return connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id])
}

export function openUrlConnection(url) {
    return connection.query(`UPDATE urls SET "visitCount"=$1 + 1 WHERE id=$2`, [url.visitCount, url.id])
}

export function deleteUrlConnection(id) {
    return connection.query(`DELETE FROM urls WHERE id=$1`, [id])
}

export function getRankingConnection() {
    return connection.query(`
    SELECT users.id, users.name, CAST(COUNT(urls."userId") AS INT) AS "linksCount", CAST(COALESCE(SUM(urls."visitCount"), 0) AS INT) AS "visitCount"
    FROM users
    LEFT JOIN urls
    ON users.id = urls."userId"
    GROUP BY users.id, users.name
    ORDER BY "visitCount" DESC
    LIMIT 10;
    `)
}

export function validateUrlExistenceByIdConnection(id) {
    return connection.query(`SELECT * FROM urls WHERE id=$1`, [id])
}

export function validateUrlExistenceByShortUrlConnection(shortUrl) {
    return connection.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl])
}