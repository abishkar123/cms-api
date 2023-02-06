import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import morgan from "morgan"
import cors from "cors"
const app = express()

const PORT = process.env.PORT || 8000

//dbconnect 
import { dbConnect } from "./src/config/dbConfig.js"
dbConnect();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// root url request
app.use("/", (req, res, next)=>{
    const error ={
        message:"you dont have promission here",

    };
    next(error);
})

///global error handling 

app.use((error, req, res, next)=>{
    statusCode: error.errorCode|| 404;
    res.status(statusCode).json({
        status:"error",
        message:error.message,
    })
})


app.listen(PORT, (error)=>{
    error
    ? console.log(error)
    : console.log (`Server runing at http://localhost:${PORT}`)
})