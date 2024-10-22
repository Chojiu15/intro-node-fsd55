import User from '../models/User.js'
import express, {Router} from 'express'

const usersRouter = Router()



usersRouter.get('/users', async (req, res) => {

    try{
        const users = await User.find()
        return res.status(200).json(users)
    }

    catch(err){
        console.log(err)
        return res.status(500).json({message : `Internal server error 🔴`})
    }
})


export default usersRouter