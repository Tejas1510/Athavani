import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
import User from "../modules/user.js";

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    console.log("You must be logged in");
    res.status(401).json({ error: "You must be logged in" });
    
  }
  const token = authorization.replace("Bearer ", "");
  //console.log("token:",token);
  if(token&&token!="null"){
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
      console.log(err);
      if (err) {
        console.log("you must be logged in");
        return res.status(401).json({ error: "you must be logged in" });
      }

      const { _id } = payload;
      User.findById(_id).then((userData) => {
        delete userData._doc.password;
        req.user = userData;
        next();
      });
    });
  }
};

export default requireLogin