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

export async function validateUrlExistence(req, res, next) {

    const { id } = req.params

    try {

        const urlExists = connection.query(`SELECT * FROM urls WHERE id=$1`, [id])

        if ((await urlExists).rows.length === 0) {
            res.sendStatus(404)
            return
        }

        res.locals.id = id

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}