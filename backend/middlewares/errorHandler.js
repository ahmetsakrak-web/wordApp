const errorHandler = (err,req,res,next) =>{
const statusCode = err.statusCode ? err.statusCode : 500;
res.status(statusCode).json({
    message: err.message,
    stack: process.env.MODE === "production" ? null : err.stack

})

    
}

module.exports = errorHandler; 