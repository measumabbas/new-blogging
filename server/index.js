const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const catagoryRoute = require('./routes/catagory');

const multer = require('multer')


app.use(express.json())

dotenv.config();

mongoose.connect(process.env.MONGO_URI, ()=>{
    console.log("Connected to Mongo Successfully");
})

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage});
app.post("/api/upload",upload.single('file'),(req,res)=>{
    res.status(200).json('File has been uploaded sussessfully');
})
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/catagories',catagoryRoute)

app.listen('5000',()=>{
    console.log('Backend in running')
})