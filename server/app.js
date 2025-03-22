import express from "express"
import "dotenv/config"
import cors from 'cors'
import { dbConnection } from "./utils/dbConnection.js"
import { route } from "./routes/routes.js"
import cookieParser from "cookie-parser"
const PORT = process.env.PORT || 8000
const app = express()

dbConnection()
app.use(cors({
  origin:"https://xdcode.vercel.app/", 
  credentials: true, 
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", route)
app.use("/api/file", route)
app.get('/',(req,res)=>{
  res.send("Server Is Running")
})
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})

export default app