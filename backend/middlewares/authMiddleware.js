const jwt = require("jsonwebtoken");
const User = require("../models/userM")
let token;

const routeProtector =async (req,res,next) =>{
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.SECRET_KEY);
            const user = await User.findById(decoded.id).select("-password");
            req.user = user;
            next();
        }
    } catch (error) {
       
        res.json({message:"Oturumun Süresi Doldu"}).status(408)
        
    }
}

module.exports = routeProtector;