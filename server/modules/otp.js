import mongoose from 'mongoose';
import validator from 'validator';

const otpSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is Required'],
        validate: {
            validator: email => validator.isEmail(email),
            message: '{VALUE} is not a valid email'
        }
    },
    otp: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    }
    
});

const otpModel = mongoose.model('Otp', otpSchema);

export default otpModel;