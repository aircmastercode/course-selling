const { Router } = require("express");
const {userModel} = require("../db");
const userRouter = Router(); //this is the router technique which will get trigger when any path starting from user comes
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD}=require("../config");

userRouter.post("/signup",async function(req, res) {
    const {email,password,firstName,lastName}=req.body;
    //use bcrypt for storing the password in the secured way not in the plain in the database;
    await userModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })
    res.json({
        message:"signup succeeded"
    })
})

userRouter.post("/signin",async function(req, res) {
    const {email,password}=req.body;
    const user =await userModel.findOne({
        email:email,
        password:password
    });
    if(user){
        const token=jwt.sign({
            id:user._id
        },JWT_USER_PASSWORD);
        res.json({token:token});
    }
    else{
        res.status(403).json({
            message: "incorrect credentials"
        });
    }
    
});

userRouter.get("/purchases", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}