import connection from "../database/db.js";
import { urlSchema } from "../schemas/url.schema.js";

export async function validateUrl(req, res, next) {

    const body = req.body

    const { session } = res.locals

    const validation = urlSchema.validate(body, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    res.locals.url = body.url

    res.locals.session = session

    next()

}