import  User from '../modules/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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
        if(error.code && error.code === 11000) {
            return res.status(409).json({message: "Email Already Exist!"});
        } else {
            return res.status(404).json({message: error.message});
        }
    }
};

export const signin = async (req, res) => {
    try {
    
        const { email, password } = req.body;
    
        const user = await User.findOne({ email: email });
    
        if (!user) {
            return res.status(403).json({message: `No User Found with email: ${email}`});
        }
    
        const matched = await bcrypt.compare(password, user.password);
    
        if (!matched) {
            return res.status(403).json({message: 'Invalid Email or Password!'});
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

export const forgot = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(403).json({message: `No User Found with email: ${email}`});
        }

        const token = jwt.sign({_id: user._id}, process.env.RESET_PASSWORD_JWT_KEY, {expiresIn: '15m'});
        if(!token) {
            return res.status(403).json({message: "Token Error!"});
        }

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.MAIL,
              pass: process.env.PASS,
            },
        });

        await user.updateOne({resetPassLink: token});

        await transporter.sendMail({
            from: `${process.env.MAIL}`, // sender address
            to: `${email}`, // list of receivers
            subject: `Reset Password || Athavani || ${new Date().toLocaleDateString()}`, // Subject line
            html: `<div style="text-align: center; background-color: #ffa500; padding: 11px">
            <h1>You have requested to reset your Password</h1>
            <p style="padding: 15px 0;">
                 Hello ${user.name}, We received a request to reset the password for your account for this email address. To initiate the password reset process for your account, click the button below. Link will expire in 15 minutes.
            </p>
            <a href="${process.env.CLIENT_URL}/resetPassword/${token}" target="_blank" style="text-decoration: none; background-color: tomato; color: white; padding: 1rem 1.5rem; border-radius: 25px; box-shadow: 0px 1px 3px black">
                  Reset Password
            </a>
            <p style="padding: 15px 0;">If you did not make this request, you can simply ignore this email.</p>
            <p> Sent at ${new Date()}</p>`, // html body
            });

        return res.status(200).json({message: "Email Sent"});

    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {token, newPassword} = req.body;

        if(!token) {
            return res.status(401).json({message: "Token not found!"});
        }

        const isVerified = await jwt.verify(token, process.env.RESET_PASSWORD_JWT_KEY);

        if(!isVerified) {
            return res.status(401).json({message: "Invalid Token or it is expired!"});
        }

        const user = await User.findOne({resetPassLink: token});

        if(!user) {
            return res.status(404).json({message: "Token Expired or Invalid!"});
        }

        const hash = await bcrypt.hash(newPassword, 12);
        await user.updateOne({password: hash, resetPassLink: ""});

        return res.status(200).json({message: "Password Changed Successfully."});
    }
    catch (error) {
        return res.status(404).json({message: error.message});
    }
}