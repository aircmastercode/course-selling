const { Router } = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");
const {courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");
const { adminMiddleware } = require("../middlewares/admin");

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

adminRouter.post("/course",adminMiddleware, async function(req, res) {
    const adminId=req.userId;
    const {title,description,imageurl,price}=req.body;
    const course=await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageurl,
        price:price,
        createrId:adminId
    })
    res.json({
        message:"course created",
        courseId:course.id
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