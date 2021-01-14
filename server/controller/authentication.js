import  User from '../modules/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
    
        const { name, password, email } = req.body;
    
        const hash = await bcrypt.hash(password, 12);
    
        const user = await User.create({
            name,
            password: hash,
            email
        });
    
        delete user._doc.password;
        return res.status(200).json({message: "Account Created."});

    } catch (error) {
        // console.log(error);
        res.status(404).json({message: error.message});
    }
};

export const signin = async (req, res) => {
    try {
    
        const { email, password } = req.body;
    
        const user = await User.findOne({ email: email });
    
        if (!user) {
            return res.status(403).json(`No User Found with email: ${email}`);
        }
    
        const matched = await bcrypt.compare(password, user.password);
    
        if (!matched) {
            return res.status(403).json('Invalid Email or Password!');
        }
    
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        delete user._doc.password;
        return res.status(200).json({
            token,
            message: "Successfully Logged In"
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const verify = async (req, res) => {
    try {
        const { token } = req.body;

        const isVerified = jwt.verify(token, process.env.JWT_KEY);

        const id = isVerified._id;

        const user = await User.findById(id);

        return res.status(200).json({id:isVerified._id, name:user.name});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}