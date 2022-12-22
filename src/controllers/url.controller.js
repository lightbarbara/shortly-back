import { nanoid } from "nanoid"
import connection from "../database/db.js"

export async function shortenUrl(req, res) {

    const { url, session } = res.locals

    const shortUrl = nanoid()

    try {

        await connection.query(`INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`, [url, shortUrl, session.userId])

        res.status(201).send({ shortUrl })

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getUrlById(req, res) {

    const { id } = res.locals

    try {

        const url = await connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1`, [id])

        res.status(200).send(url.rows[0])

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function openUrl(req, res) {

    const { url } = res.locals

    try {

        connection.query(`UPDATE urls SET "visitCount"=$1 + 1 WHERE id=$2`, [url.visitCount, url.id])

        res.redirect(url.url)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function deleteUrl(req, res) {

    const { id } = res.locals

    try {

        await connection.query(`DELETE FROM urls WHERE id=$1`, [id])

        res.sendStatus(204)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getRanking(req, res) {

    try {

        const ranking = connection.query(`
        SELECT users.id, users.name, COUNT(urls."userId") AS "linksCount", COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
        FROM users
        LEFT JOIN urls
        ON users.id = urls."userId"
        GROUP BY users.id, users.name
        ORDER BY "visitCount"
        LIMIT 10;
        `)

    } catch (err) {
        res.status(500).send(err.message)
    }

}