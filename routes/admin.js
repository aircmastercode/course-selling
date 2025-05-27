const { Router } = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");
const {courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD}=require("../config");
const { adminMiddleware } = require("../middlewares/admin");
const course = require("./course");
const admin = require("../middlewares/admin");

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

adminRouter.put("/course", adminMiddleware,async function(req, res) {
    const adminId=req.userId;
    const {title,description,imageUrl,price,courseId}=req.body;
    const course=await courseModel.updateOne({
        _id:courseId,
        createrId:adminId //this is to verify if the adminId who is asking permission to change the course details is same
        //who have created the course
    },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price
    })
    res.json({
        message:"course updated!!"
    })
})

adminRouter.get("/course/bulk",adminMiddleware,async function(req, res) {
    const adminId=req.userId;
    const courses=await courseModel.find({
        createrId:adminId
    })
    res.json({
        message:"courses are following",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}