import bcrypt from 'bcrypt'
import connection from '../database/db.js'
import { v4 as uuid } from 'uuid'

export async function signUp(req, res) {

    const { name, email, password } = req.locals

    const encryptedPassword = bcrypt.hashSync(password, 15)

    try {

        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, encryptedPassword])

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function signIn(req, res) {

    const { id } = res.locals

    try {

        const token = uuid()

        await connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token])

        res.status(200).send({ token })

    } catch (err) {
        res.status(500).send(err.message)
    }

}