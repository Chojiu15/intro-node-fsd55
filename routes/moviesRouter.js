import express from 'express'
import movies from '../data/movies.js'

const moviesRouter = express.Router()


moviesRouter.get('/movies', (req, res) => {
    return res.json(movies)
})


moviesRouter.get('/movies/:movieID', (req,res) => {
    let movieID = req.params.movieID
    let movie = movies.find(element => element.id == movieID )
    return res.json(movie)
})


moviesRouter.post('/movies', (req, res) => {
    console.log(req.body)
    let newMovie = {
        id : movies.length + 1,
        title : req.body.title,
        genre : req.body.genre
    }
    movies.push(newMovie)
    return res.status(201).json(newMovie)

})

export default moviesRouter