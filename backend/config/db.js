const mongoose = require("mongoose");

const DBConnect = async () => {
    try{
        const conn = await mongoose.connect(process.env.URI);
        console.log(`Database connected: ${conn.connection.host}`)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = DBConnect;