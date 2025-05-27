const express = require("express");
const mongoose = require("mongoose");
//kept the secret connection for the mongoose in the env file 
//to access that secret connection use npm install dotenv
//then require it
//to use it process.env. ...
require('dotenv').config();
const app = express();
app.use(express.json());
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

app.use("/user", userRouter); //any request on the user will divert to the userRouter and that will handle further paths
app.use("/course", courseRouter); //any request on the course will divert to courseRouter and it will handle further 
app.use("/admin", adminRouter); //any request on the admin will divert to adminRouter and it will handle further 
async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("listening on port 3000");
}
main();