export async function signUp(req, res) {

    const { name, email, password } = req.locals

    try {

        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password])

        res.sendStatus(201)

    } catch (err) {
        res.status(500).send(err.message)
    }

}

export async function signIn(req, res) {

    

}