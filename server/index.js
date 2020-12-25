import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
dotenv.config();
app.use('/posts', postRoutes);

app.get('/',(req,res)=>{
    res.send('This is a MERN stack Project to save all your Memories')
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => app.listen(PORT,() => console.log(`Server is running on Port ${PORT}`)))
    .catch((error) =>console.log(error.message))

mongoose.set('useFindAndModify',false);    