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