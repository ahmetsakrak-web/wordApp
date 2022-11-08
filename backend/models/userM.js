const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required : [true, "username area is empty"]
    },
    email : {
        type: String,
        required : [true, "email area is empty"]
    },
    password: {
        type: String,
        required : [true, "password area is empty"]
    },
    

},{
    timestamps:true
})

module.exports = model("User", userSchema);