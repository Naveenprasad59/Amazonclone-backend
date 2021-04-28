const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/AmazonDB",{ useNewUrlParser: true ,useUnifiedTopology: true})
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const user = mongoose.model("user",userSchema);
module.exports = user;