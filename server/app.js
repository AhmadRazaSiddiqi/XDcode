import express from "express"
import "dotenv/config"
import cors from 'cors'
import { dbConnection } from "./utils/dbConnection.js"
import { route } from "./routes/routes.js"
import cookieParser from "cookie-parser"
const PORT = process.env.PORT || 8000
const app = express()

dbConnection()

// Configure CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/user", route)
app.use("/file", route)
app.get('/',(req,res)=>{
  res.send("Server Is Running")
})
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})

export default app