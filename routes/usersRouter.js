import User from '../models/User.js'
import { Router } from 'express'

const usersRouter = Router()



usersRouter.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error 🔴` })
    }
})

usersRouter.get('/users/:userID', async (req, res) => {
    let userID = req.params.userID
    try {
        const userByID = await User.findById(userID)
        if (!userByID) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json(userByID)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error 🔴` })
    }
})


usersRouter.post('/users', async (req, res) => {
    let { first_name, last_name, email, password, age } = req.body
    try {
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age
        })
        newUser.save()
        return res.status(201).json(newUser)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error 🔴` })
    }
})

usersRouter.put('/users/:userID', async (req, res) => {
    let { userID } = req.params
    try {
        const updatedUser = await User.findByIdAndUpdate(userID, { $set: req.body}, {new : true})
        return  res.status(200).json(updatedUser)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error 🔴` })
    }
})


usersRouter.delete('/users/:userID', async (req, res) => {
    let {userID} = req.params
    try{
        const deleteUser = await User.findByIdAndDelete(userID)
        return res.status(200).json({message : `User : ${userID} deleted successfully`})
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error 🔴` })
    }
})


export default usersRouter