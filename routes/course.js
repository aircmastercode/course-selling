const {Router}=require("express");
const user = require("./user");
const {userMiddleware} = require("../middlewares/user");
const {purchaseModel} = require("../db");
const {courseModel} = require("../db");
const courseRouter=Router(); //this is the router technique which will get trigger when any path starting from course comes

courseRouter.post("/purchase",userMiddleware,async function(req, res) {
        // you would expect the user to pay you money
        const userId=req .userId;
        const courseId=req.body.courseId;
        await purchaseModel.create({
            userId:userId,
            courseId:courseId
        })
        res.json({
            message:"you have successfully bought the course"
        })
})

courseRouter.get("/preview", async function(req, res) {
    const courses=await courseModel.find({});
        res.json({
            message: "all courses!",
            courses
    })
})

module.exports = {
    courseRouter: courseRouter
}