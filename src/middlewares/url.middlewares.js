import connection from "../database/db.js";
import { urlSchema } from "../schemas/url.schema.js";

export function validateUrl(req, res, next) {

    const body = req.body

    const validation = urlSchema.validate(body, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    res.locals.url = body.url

    next()

}

export async function validateUrlExistenceById(req, res, next) {

    const { id } = req.params

    try {

        const urlExists = await connection.query(`SELECT * FROM urls WHERE id=$1`, [id])

        if (urlExists.rows.length === 0) {
            res.sendStatus(404)
            return
        }

        res.locals.id = id

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function validateUrlExistenceByShortUrl(req, res, next) {

    const { shortUrl } = req.params

    try {

        const urlExists = await connection.query(`SELECT * FROM urls WHERE "shortUrl"=$1`, [shortUrl])

        if (urlExists.rows.length === 0) {
            res.sendStatus(404)
            return
        }

        res.locals.url = urlExists.rows[0]

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}