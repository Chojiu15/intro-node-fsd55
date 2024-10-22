import express from 'express'
import 'dotenv/config'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended : false}))


const movies = [
    {
        id : 1,
        title : 'Dracula',
        genre : 'Horror'
    },
    {
        id : 2,
        title : 'Old boy',
        genre : 'Thriller'
    },
    {
        id : 3,
        title : 'Blade runner',
        genre : 'Science-Fiction'
    }
]

app.get('/', (req, res) => {
    return res.send(`Welcome to my API`)
})

app.get('/movies', (req, res) => {
    return res.json(movies)
})


app.get('/movies/:movieID', (req,res) => {
    let movieID = req.params.movieID
    let movie = movies.find(element => element.id == movieID )
    return res.json(movie)
})


app.post('/movies', (req, res) => {
    
    let newMovie = {
        id : movies.length + 1,
        title : req.body.title,
        genre : req.body.genre
    }
    movies.push(newMovie)
    return res.json(newMovie)

})



app.listen(PORT, () => console.log(`Server is running on port 3000`))

// CRUD : CREATE / READ / UPDATE / DELETE