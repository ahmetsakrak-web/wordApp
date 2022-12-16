const User = require("../models/userM");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { json } = require("express");



const register = asyncHandler(async(req,res) =>{
  
    const {username, password, email} = req.body;
    console.log(email);
    if(!username || !password || !email){
        res.status(400)
        throw new Error("You must fill empty areas");
    }
    const DBemail = await User.findOne({email})
    if(DBemail){
        res.status(400)
        throw new Error("You must fill empty areas");
    }
    
    const salt =await bcrypt.genSalt();
    const hPassword = await bcrypt.hash(password,salt);
    const user = await User.create({username, email, password:hPassword});
    if(user){
            res.status(201).json({
                _id:user.id,
                username:user.username,
                email:user.email,
                token: generateToken(user.id)
            });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    



})



const login = asyncHandler(async(req, res)=>{
    const {password, email} = req.body;
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            username: user.username,
            email: user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(401);
        throw new Error("Credantial Error");
    }
})

const userPage = asyncHandler(async(req, res)=>{
   res.status(200).json({user:req.user});
})


const passwordChange = asyncHandler(async(req, res)=>{
    const {oldPassword,newPassword} = req.body;
    const user = await User.findById(req.user.id);

    if(await bcrypt.compare(oldPassword, user.password)){
        const salt =await bcrypt.genSalt();
        const hPassword = await bcrypt.hash(newPassword,salt);
        user.password = hPassword;
        await user.save();
        res.status(201)
        }else{
            res.status(401);
            throw new Error("Credantial Error");
        }
 
    
 })





const generateToken =(id)=>{
  return  jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"1d"});
}





module.exports = {
    register,
    login,
    userPage,
    passwordChange
}