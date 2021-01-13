import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required'],
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        minlength: 6
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is Required'],
        validate: {
            validator: email => validator.isEmail(email),
            message: '{VALUE} is not a valid email'
        }
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;