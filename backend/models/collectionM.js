const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const collectionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }, 
    cName:String,
    cArray:[{
        turkce: String,
        ingilizce:String,
        
    }]
});

module.exports = model("Collection", collectionSchema);