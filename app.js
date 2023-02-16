import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routers from './routers/index.route.js';
import userroutes from "./routers/userrouter.js";
import cookieParser from "cookie-parser"

//app initialization
const app = express();


// Utilize a more restrictive policy if needed
app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );

//cookies and file middleware
app.use(cookieParser())

// morgan middleware
app.use(morgan("tiny"))
// regular middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());

//routes for api calls
app.use('/api/question-paper', routers);
app.use('/api/user',userroutes);
app.get("/",(req,res,next)=>{
    return res.status(200).send({
        uptime: process.uptime(),
        message: "Catalyst's API health check :: GOOD",
        timestamp: Date.now(),
      })
})

export default app;