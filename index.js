const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use("/user", userRouter); //any request on the user will divert to the userRouter and that will handle further paths
app.use("/course", courseRouter); //any request on the course will divert to courseRouter and it will handle further 
app.use("/admin", adminRouter); //any request on the admin will divert to adminRouter and it will handle further 

app.listen(3000);