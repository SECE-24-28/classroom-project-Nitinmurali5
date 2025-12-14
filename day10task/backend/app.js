//build a server
const express=require("express");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
//dotenv
const dotenv=require("dotenv");
dotenv.config();
const secretkey=process.env.SECRET_KEY;
const port=process.env.PORT;
//s1-import the package to connect with mongodb
const mongoose=require("mongoose");
const app=express();
const cors = require('cors');                                                                        
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json())

//s2 Estabilish the connection
async function connection()
{

 await mongoose.connect(process.env.MONGODB_URL)
  .then(()=>{
    console.log("connected to database")
  })
  .catch((err)=>{
    console.log(err)
  })
}


//s3=Create schemaa
let productSchema=
new mongoose.Schema({
    title:
    {
      type:String,
      required:true
    },
    price:
    {
      type:Number,
      required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

//s4 Create a model
let Product=mongoose.model("Product",productSchema);



const {rateLimit}=require("express-rate-limit")
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per window (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: RateLimit-* headers; draft-7 & draft-8: combined RateLimit header
	legacyHeaders: false, // Disable the X-RateLimit-* headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})
app.use(limiter)
//------------User Model------------
let userschema=new mongoose.Schema({

  username:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true}

})
//create model
let userModel=mongoose.model("users",userschema)

//---API's----
//api-1 Store products in the database
app.post('/products',async(req,res)=>{
  try {
    const {title,price,image,description}=req.body
    let newProduct={title,price,image,description}
    await Product.create(newProduct)
    res.status(201).json({
      msg:"Product is added succesffully"
    })
    
  } catch (error) {
    res.json({
      msg:error.message
    })
    
  }
  
})
//api-1.2
app.post('/signup',async(req,res)=>
{
  try{
    
    const {username,email,password}=req.body;
     let hashedpassword=await bcrypt.hash(password,10)
    let newUser={username,email,password:hashedpassword}

    let existUser= await userModel.findOne({email})
    if(existUser){
      return res.status(400).json({
        msg:"User already exists"
      })
    }
    await userModel.create(newUser)
    res.status(201).json({
      msg:"User is added successfully"
    })

    // let hashedpassword=await bcrypt.hash(password,10)
  }
  catch(error){
    res.json({
      msg:error.message
    })
  }
})

//api for authentication
app.post('/signin',async(req,res)=>{
  try {

    const {username,email,password}=req.body;
    let userdetails= await userModel.findOne({username})
    if(!userdetails)
    {
      return res.status(400).json({
        msg:"user not found"
      })
      
    }
      //check password
      let checkPassword=await bcrypt.compare(password,userdetails.password)
      if(!checkPassword)
      {
        return res.status(400).json({
          msg:"Username & Password incorrect"
        })
      }
      //generate token
      let payload={email:email}//unique details
      let token= await jwt.sign(payload,secretkey,{expiresIn:"1hr"})
      res.status(200).json({
        msg:"Login successful",
        token:token
      })
    
    
  } catch (err) {
    res.json({
      msg:err.message
    })
    
  }
})


//api-2 Fetch all products
app.get('/products',async(req,res)=>
{
  try {
    let products=await Product.find({})
    res.status(200).json({
      products
    })
    
  } catch (error) {
    res.json({
      msg:error.message
    })
    
  }
})
//api-3 Delete a products
app.delete('/products/:id',async(req,res)=>
{
  try {
    let id=req.params.id;
    await Product.findByIdAndDelete(id)
    res.status(200).json({
      msg:"Product is deleted successfully"
    })
    
  } catch (error) {
    res.json({
      msg:error.message
    })
    
  }
})
//api-4 Update a product
app.put('/products/:id',async(req,res)=>
{
  try {
    let id=req.params.id;
    let {title,price,image,description}=req.body;
    await Product.findByIdAndUpdate(id,{title,price,image,description})
    res.status(200).json({
      msg:"Product is updated successfully"
    })
    
  } catch (error) {
    res.json({
      msg:error.message
    })
    
  }
})




// //route  
// app.get('/products',(req,res)=>{
// res.json({
//     products
// }) 
// })

//route
// app.post('/submitproduct',(req,res)=>{
//    let {id,title,price,image,description}=req.body;
//    let newProduct={
//     id,
//     title,
//     price,
//     image,
//     description
//    }
//     products.push(newProduct)
//     res.json({
//         msg:"Product is added succesffully"
//       })
  
// })





app.listen(port,async()=>{
    console.log(`Server is running on port ${port}`);
    connection();
    
    
})