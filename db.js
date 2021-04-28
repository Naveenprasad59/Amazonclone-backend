const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/AmazonDB",{ useNewUrlParser: true ,useUnifiedTopology: true})

const productSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    rating: Number,
    image: String
});

const products = mongoose.model("products",productSchema);

module.exports = products;

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const user = mongoose.model("user",userSchema);
module.exports = user;