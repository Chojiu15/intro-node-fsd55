import express from 'express'

const app = express()

app.get('/', (req, res) => {
    return res.send(`Welcome to my API`)
})

app.listen(3000, () => console.log(`Server is running on port 3000`))