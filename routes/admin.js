const { Router } = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD="helloadmin";

adminRouter.post("/signup", async function(req, res) {
    const {email,password,firstName,lastName}= req.body;
    await adminModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })
    res.json({
        message:"signup successfull for the admin"
    })
});

adminRouter.post("/signin",async function(req, res) {
    const {email,password} = req.body;
    const admin=await adminModel.findOne({
        email:email,
        password:password
    })
    if (admin){
        const token=jwt.sign({
            id:admin._id
        },JWT_ADMIN_PASSWORD);
        res.json({token:token});
    }
    else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
})

adminRouter.post("/course", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.put("/course", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/course/bulk", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}