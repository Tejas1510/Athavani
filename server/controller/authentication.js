import User from '../modules/user.js';
import Otp from '../modules/otp.js';
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

export const getProfileById = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findOne({_id: id});
        delete user._doc.password;
        delete user._doc.resetPassLink;

        return res.status(200).json({message: "User returned.", user});
    }
    catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const updateProfileById = async (req, res) => {
    try {
        const id = req.params.id;
        let {img, name, bio} = req.body;

        if(img === "" || !img) {
            img = "data:image/jpeg;base64,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";
        }

        if(!bio) {
            bio = "";
        }

        const updatedUser = await User.findOneAndUpdate({_id:id}, {name: name, bio: bio, img: img}, {new: true});

        delete updatedUser._doc.password;
        delete updatedUser._doc.resetPassLink;

        return res.status(200).json({message: "Profile Updated", user: updatedUser});
        
    }
    catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const checkPassword = async (req, res) => {
    try {
        const {id, password} = req.body;

        const user = await User.findById(id);

        const matched = await bcrypt.compare(password, user.password);
        // console.log(matched);

        if(matched) {
            return res.status(200).json({message: "Password Matched", status: matched});
        } else {
            return res.status(200).json({message: "Incorrect Password", status: matched});
        }

    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

export const sendOtp = async (req, res) => {
    try {
        const {email} = req.body;

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.MAIL,
              pass: process.env.PASS,
            },
        });

        const string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
        let OTP = '';
        
        const len = string.length; 
        for (let i = 0; i < 6; i++ ) { 
            OTP += string[Math.floor(Math.random() * len)]; 
        }

        // console.log(OTP);

        await Otp.create({
            email,
            otp: OTP
        });

        await transporter.sendMail({
            from: `${process.env.MAIL}`, // sender address
            to: `${email}`, // list of receivers
            subject: `Email Verification || Athavani || ${new Date().toLocaleDateString()}`, // Subject line
            html: `<div style="text-align: center; background-color: #ffa500; padding: 11px">
            <h1>Please verify you email</h1>
            <p style="padding: 15px 0;">
                 Please confirm that you want this as your Athavani account email address. Use this OTP for creating your account on Athavani. Once it's verify, you will be able to use Athavani.
            </p>
            <div style="text-decoration: none; background-color: tomato; color: white; padding: 1rem 1.5rem; border-radius: 25px; box-shadow: 0px 1px 3px black; width: fit-content; margin: auto; font-weight: bold; letter-spacing: 3px;">
                  ${OTP}
            </div>
            <p style="padding: 15px 0;">If you did not make this request, you can simply ignore this email.</p>
            <p> Sent at ${new Date()}</p>`, // html body
        });

        return res.status(200).json({message: "OTP Sent"});

    } catch (error) {
        if(error.code && error.code === 11000) {
            return res.status(409).json({message: "Email Already Exist!"});
        } else {
            return res.status(404).json({message: error.message});
        }
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const {email, otp} = req.body;

        const OTP = await Otp.findOne({email});

        if(OTP.otp.localeCompare(otp) === 0) {
            await Otp.findOneAndUpdate({email}, {isVerified: true});
            return res.status(200).json({message: "OTP Match"});
        } else {
            return res.status(401).json({message: "Wrong OTP!"});
        }

    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}