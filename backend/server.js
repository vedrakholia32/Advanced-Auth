import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import {connectDB} from "./connection/db.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    connectDB()
    console.log('server is up!');
    
})
