import { userSignUpSchema, userSignInSchema } from "../schemas/user.schema.js"
import connection from '../database/db.js'
import bcrypt from 'bcrypt'

export async function validateSignUp(req, res, next) {

    const user = req.body

    if (user.password !== user.confirmPassword) {
        res.status(422).send({ message: 'As senhas são diferentes' })
        return
    }

    const validation = userSignUpSchema.validate(user, { abortEarly: false })

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

        if (userExists.rows.length === 0) {
            res.status(401).send({ message: 'Dados incorretos' })
            return
        }

        const validatePassword = bcrypt.compareSync(user.password, userExists.rows[0].password)

        if (!validatePassword) {
            res.status(401).send({ message: 'Dados incorretos' })
            return
        }

        const userLoggedIn = await connection.query(`SELECT * FROM sessions WHERE id=$1`, [userExists.rows[0].id])

        if (userLoggedIn.rows.length > 0) {
            await connection.query(`DELETE FROM sessions WHERE id=$1`, [userExists.rows[0].id])
        }

        res.locals.user = userExists.rows[0]

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function validateAuth(req, res, next) {

    const { authorization } = req.headers

    if (!authorization) {
        res.sendStatus(401)
        return
    }

    const token = authorization.replace('Bearer ', '')

    try {

        const session = await connection.query(`SELECT * FROM sessions WHERE token=$1`, [token])

        if (session.rows.length === 0) {
            res.sendStatus(401)
            return
        }

        res.locals.session = session.rows[0]

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function validateUserExistence(req, res, next) {

    const { userId } = res.locals.session

    try {

        const userExists = await connection.query(`SELECT * FROM users WHERE id=$1`, [userId])

        if (userExists.rows.length === 0) {
            res.sendStatus(404)
            return
        }

        res.locals.user = userExists.rows[0]

        next()

    } catch (err) {
        res.status(500).send(err.message)
    }

}