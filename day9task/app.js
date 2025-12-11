const {rateLimit}=require('express-rate-limit')
const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
const cors=require("cors");
const mongoose=require("mongoose");
const port=3000;
app.use(cors());

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 50, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
	
})
app.use(limiter)

app.use(express.json())

async function connection(){
    mongoose.connect("mongodb://localhost:27017/movies")
}

let movieschema=new mongoose.Schema({title:{
    type:String,
    required:true
},rating:{
    type:Number,
    required:true
},genre:{
    type:String,
    required:true
}})

let finalproducts=mongoose.model('movies',movieschema)

app.post('/movies',async (req,res)=>{
    try{
        const {title,rating,genre}=req.body
        let newmovies={title,rating,genre}
        await finalproducts.create(newmovies)
        res.status(201).json({
            msg:"Movie rating added successfully"
        })
    }catch(error){
        res.json({
            msg:error.message
        })
    }
})

app.get('/movie',(req,res)=>{
    res.json()
})


app.listen(port,async ()=>{
    console.log(`Server is running on port ${port}`);
    connection();
    console.log("Database connected");
})