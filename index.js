import express from "express";
import postgresClient from "./config/db.js";
import gameflexRouter from "./routes/gameflexRouter.js"
import cors from "cors"
const app = express()
var corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions))
app.use(express.json())
app.use('/',gameflexRouter)
const PORT= process.env.PORT ||5000
app.listen(PORT,()=>{
    console.log('Listening ${PORT}')
    postgresClient.connect(err =>{
        if(err){
            console.log('connection error',err.stack)
        }else{
            
            console.log('DB connection success')
        }
    } )
})