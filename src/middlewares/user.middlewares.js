import { userSignUpSchema, userSignInSchema } from "../schemas/user.schema"
import connection from '../database/db.js'
import bcrypt from 'bcrypt'

export async function validateSignUp(req, res, next) {

    const user = req.body

    if (user.password !== user.confirmPassword) {
        res.status(422).send({ message: 'As senhas são diferentes' })
        return
    }

    const validation = userSignUpSchema.validate(customer, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)

        res.status(422).send({ message: errors })
        return
    }

    try {

        const emailExists = await connection.query(`SELECT * FROM users WHERE email=$1`, [user.email])

        if (emailExists.rows.length > 0) {
            res.sendStatus(409)
            return
        }

        res.locals.user = user

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function validateSignIn(req, res, next) {

    const user = req.body

    const validation = userSignInSchema.validate(user, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    try {

        const userExists = await connection.query(`SELECT * FROM users WHERE email=$1`, [user.email])

        const validatePassword = bcrypt.compareSync(user.password, userExists.password)

        if (!userExists || !validatePassword) {
            res.status(401).send({ message: 'Dados incorretos' })
        }

        const userLoggedIn = await connection.query(`SELECT * FROM sessions WHERE id=$1`, [userExists.id])

        if (userLoggedIn) {
            await connection.query(`DELETE FROM sessions WHERE id=$1`, [userExists.id])
        }

        res.locals.user = userExists

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}