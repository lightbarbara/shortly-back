import { nanoid } from "nanoid"
import connection from "../database/db.js"
import { deleteUrlConnection, getRankingConnection, getUrlByIdConnection, openUrlConnection, shortenUrlConnection } from "../repositories/url.repositories.js"

export async function shortenUrl(req, res) {

    const { url, session } = res.locals

    const shortUrl = nanoid()

    try {

        await shortenUrlConnection(url, shortUrl, session)

        res.status(201).send({ shortUrl })

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getUrlById(req, res) {

    const { id } = res.locals

    try {

        const url = await getUrlByIdConnection(id)

        res.status(200).send(url.rows[0])

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function openUrl(req, res) {

    const { url } = res.locals

    try {

        await openUrlConnection(url)

        res.redirect(url.url)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function deleteUrl(req, res) {

    const { id } = res.locals

    try {

        await deleteUrlConnection(id)

        res.sendStatus(204)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function getRanking(req, res) {

    try {

        const ranking = await getRankingConnection()

        res.status(200).send(ranking.rows)

    } catch (err) {
        res.status(500).send(err.message)
    }

}