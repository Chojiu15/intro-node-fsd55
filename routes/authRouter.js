import User from '../models/User.js'
import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authRouter = Router()






authRouter.post('/register', async (req, res) => {
    let { email, password } = req.body
    try {
        if (!email, !password) {
            return res.status(404).json(`Please provide an email and a password`)
        }

        const validateEmail = await User.findOne({ email })
        if(validateEmail){
            return res.status(404).json(`Email already taken`)
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            email,
            password : hashedPassword
        })

        newUser.save()
        return res.status(201).json(`User successfully created`)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error 🔴` })
    }
})


authRouter.post('/login', async (req, res) => {
    let { email, password } = req.body
    try{
        if (!email, !password) {
            return res.status(404).json(`Please provide an email and a password`)
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json(`Email or password invalid`)
        }

        const validatePassword = await bcrypt.compare(password, user.password )
        console.log(validatePassword)
        if(!validatePassword){
            return res.status(404).json(`Email or password invalid`)
        }

        const token = await jwt.sign({id : user.id},  process.env.JWT_SECRET, {expiresIn: '1h'})

        return res.status(201).json(token)

        

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error 🔴` })
    }
})

export default authRouter