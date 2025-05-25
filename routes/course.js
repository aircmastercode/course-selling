const {Router}=require("express");
const courseRouter=Router(); //this is the router technique which will get trigger when any path starting from course comes

courseRouter.post("/purchase", function(req, res) {
        // you would expect the user to pay you money
        res.json({
            message: "signup endpoint"
    })
})

courseRouter.get("/preview", function(req, res) {
        res.json({
            message: "signup endpoint"
    })
})

module.exports = {
    courseRouter: courseRouter
}