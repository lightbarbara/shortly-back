import connection from "../database/db.js"

export function signUpConnection(name, email, encryptedPassword) {
    return connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, encryptedPassword])
}

export function signInConnection(id, token) {
    return connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token])
}

export function getUserDataConnection(user) {
    return connection.query(`
    SELECT users.id, users.name, CAST(COALESCE(SUM(urls."visitCount"), 0) AS INT) AS "visitCount", 
    COALESCE(json_agg(json_build_object('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")) FILTER (WHERE urls.id IS NOT NULL), '[]') AS "shortenedUrls"
    FROM users
    LEFT JOIN urls
    ON users.id = urls."userId"
    WHERE users.id=$1
    GROUP BY users.id, users.name, urls."userId"
    `, [user.id])
}

export function validateSignUpConnection(user) {
    return connection.query(`SELECT * FROM users WHERE email=$1`, [user.email])
}

export function validateSignInConnectionUserExists(user) {
    return connection.query(`SELECT * FROM users WHERE email=$1`, [user.email])
}

export function validateSignInConnectionUserLoggedIn(userExists) {
    return connection.query(`SELECT * FROM sessions WHERE id=$1`, [userExists.rows[0].id])
}

export function validateSignInConnectionUserLoggedInDelete(userExists) {
    return connection.query(`DELETE FROM sessions WHERE id=$1`, [userExists.rows[0].id])
}

export function validateAuthConnection(token) {
    return connection.query(`SELECT * FROM sessions WHERE token=$1`, [token])
}

export function validateUserExistenceConnection(userId) {
    return connection.query(`SELECT * FROM users WHERE id=$1`, [userId])
}