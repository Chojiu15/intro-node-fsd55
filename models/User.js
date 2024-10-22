import mongoose, {Schema} from 'mongoose'



const UserSchema = new Schema({
    first_name : String,
    last_name : String,
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    age : Number
})

export default mongoose.model('User', UserSchema)