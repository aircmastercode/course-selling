const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const app = express();

app.use("/user", userRouter); //any requrest on the user will divert to the userRouter and that will handle further paths
app.use("/course", courseRouter); //any requrest on the course will divert to courseRouter and it will handle further 

createUserRoutes(app);
createCourseRoutes(app);

app.listen(3000);