import connection from "../database/db.js";
import { urlSchema } from "../schemas/url.schema.js";

export async function validateUrl(req, req, next) {

    const url = req.body

    const validation = urlSchema.validate(url, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)

        res.status(422).send({ message: errors })
    }

}