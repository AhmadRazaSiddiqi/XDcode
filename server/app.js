import express from "express"
import "dotenv/config"
import cors from 'cors'
import { dbConnection } from "./utils/dbConnection.js"
import { route } from "./routes/routes.js"
import cookieParser from "cookie-parser"
import path from 'path'
const PORT = process.env.PORT || 8000
const __dirname=path.resolve()
const app = express()

dbConnection()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/user", route)
app.use("/file", route)
app.use(express.static(path.join(__dirname,"client/dist")))
app.get('*',(_,res)=>{
  res.sendFile(__dirname,"client","dist","index.html")
})
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
