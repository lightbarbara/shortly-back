import bcrypt from 'bcrypt'
import connection from '../database/db.js'
import { v4 as uuid } from 'uuid'
import { getUserDataConnection, signInConnection, signUpConnection } from '../repositories/user.repositories.js'

export async function signUp(req, res) {

    const { name, email, password } = res.locals.user

    const encryptedPassword = bcrypt.hashSync(password, 15)

    try {

        await signUpConnection(name, email, encryptedPassword)

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function signIn(req, res) {

    const { id } = res.locals.user

    try {

        const token = uuid()

        await signInConnection(id, token)

        res.status(200).send({ token })

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getUserData(req, res) {

    const user = res.locals.user

    try {

        const response = await getUserDataConnection(user)

        res.status(200).send(response.rows[0])

    } catch (err) {
        res.status(500).send(err.message)
    }

}