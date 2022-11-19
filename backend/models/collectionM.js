const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const collectionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }, 
    cName:String,
    color:String,
    cArray:[{
        word: String,
        definition:String,
        
    }]
});

module.exports = model("Collection", collectionSchema);