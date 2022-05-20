import express from "express";
import postgresClient from "./config/db.js";
import gameflexRouter from "./routes/gameflexRouter.js"

import cors from "cors"
import errorHandler from "./middleware/errorHandler.js";

let app = express()

const corsOptions = {
    origin: "http://localhost:3000"

}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/',gameflexRouter)
app.use(errorHandler)

const port= process.env.PORT ||5000
app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`)
    postgresClient.connect(err =>{
        if(err){
            console.log('connection error',err.stack)
        }else{

            console.log('DB connection success')
        }
    } )
})

