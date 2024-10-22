import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import moviesRouter from './routes/moviesRouter.js'
import usersRouter from './routes/usersRouter.js'
import mongoose from 'mongoose'

const app = express()

const PORT = process.env.PORT

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : false}))


app.use(moviesRouter, usersRouter)


app.get('/', (req, res) => {
    return res.send(`Welcome to my API`)
})

const mongoDB = process.env.MONGO_URL
mongoose.connect(mongoDB);

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));




app.listen(PORT, () => console.log(`Server is running on port 3000`))

// CRUD : CREATE / READ / UPDATE / DELETE