import bcrypt from 'bcrypt'
import connection from '../database/db.js'
import { v4 as uuid } from 'uuid'

export async function signUp(req, res) {

    const { name, email, password } = res.locals.user

    const encryptedPassword = bcrypt.hashSync(password, 15)

    try {

        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, encryptedPassword])

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function signIn(req, res) {

    const { id } = res.locals.user

    try {

        const token = uuid()

        await connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token])

        res.status(200).send({ token })

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getUserData(req, res) {

    const user = res.locals.user

    try {

        const response = await connection.query(`
        SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount", json_agg(json_build_object('id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount")) AS "shortenedUrls"
        FROM users
        JOIN urls
        ON users.id = urls."userId"
        WHERE users.id=$1
        GROUP BY users.id, users.name, urls."userId"
        `, [user.id])

        console.log(response.rows[0])

    } catch (err) {

    }

}