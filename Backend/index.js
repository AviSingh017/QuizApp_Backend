const express = require("express");
const app = express();

const cors = require("cors");

const {connection} = require("./config/db");
const {userRoute} = require("./routes/user");
const {quizRoute} = require("./routes/quiz");

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello from backend");
});

app.use("/",userRoute);
app.use("/",quizRoute);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to DB");
    }
    catch(err){
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.port}`);
});