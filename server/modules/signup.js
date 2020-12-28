import mongoose from 'mongoose';

const signup = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmPassword:String,
})

var Signup = mongoose.model('Signup', signup);

export default Signup;
