const {rateLimit}=require('express-rate-limit')
const express=require("express");
const app=express();
const cors=require("cors");
const port=3000;
app.use(cors());

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, 
	limit: 10, 
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	ipv6Subnet: 56,
})
app.use(limiter)

let movies = [
    {id: 1, title: "Ayalaan", rating: 8, genre: "Sci-Fi", image:"https://tse2.mm.bing.net/th/id/OIP.3s6jQfFLSY2YZ1lkYeKujwHaHa?pid=Api&P=0&h=180" },
    {id: 2, title: "Theri", rating: 7, genre: "Action",image:"https://tse1.mm.bing.net/th/id/OIP.kYgP1owTxnjsy92kD5UV3AAAAA?pid=Api&P=0&h=180" },
    {id:3,title:"Vikram",rating:8,genre:"Action",image:"https://tse4.mm.bing.net/th/id/OIP._Vd7yA0EN7tv8300pRZvjgHaLP?pid=Api&P=0&h=180"},
    {id: 4, title: "Meiyazhagan", rating: 9, genre: "Drama",image:"https://tse2.mm.bing.net/th/id/OIP.FN1rArGKoiYQkS4FY0F4hgHaJ4?pid=Api&P=0&h=180" }
];

app.get("/movies",(req,res)=>{
    res.json(movies);
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});