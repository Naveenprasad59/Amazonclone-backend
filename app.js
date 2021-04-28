const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

// const products = require("./constants.js");

const app = express();
mongoose.connect("mongodb://localhost:27017/AmazonDB",{ useNewUrlParser: true ,useUnifiedTopology: true})
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors());
app.use(express.json())
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const userModel = mongoose.model("user",userSchema);

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    rating: Number,
    image: String
});

const productsModel = mongoose.model("products",productSchema);

app.get("/products",(req,res)=>{
     let p;
    productsModel.find(function(err,allProducts){
        if(err){
          console.log("Error");
          // res.sendjson({products:"Error"})
          p = {products: []};
          res.json(p);
        }
        else{
          // console.log(allProducts);
          p = {products: allProducts};
          res.json(p);
        }
    })
});

app.post("/login",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  userModel.findOne({username: username},function(err,user){
    if(err){
      console.log(err);
      res.send({success: false})
    }else{
       console.log(user);
       if(user.password === password && user.username === username){
         res.send({success: true})
       }else{
         res.send({success: false})
       }
    }
  })
})


app.post("/register",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  const newUser = userModel({
    username: username,
    password: password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
      res.send({success: false})
    }else{
      console.log("registered");
      res.send({success: true})
    }
  });

})

const PORT_NUM = process.env.PORT|| 8000;
app.listen(PORT_NUM,()=>{
    console.log(`Server started at port ${PORT_NUM}`);
})