import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import path from 'path'
// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

const _dirname = path.resolve();
// middlewares
app.use(express.json())
// app.use(cors({ origin: '*' }))
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend's origin
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Include PATCH
  credentials: true, // Allow cookies to be sent
}));
app.options('*', cors());
// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

// app.get("/", (req, res) => {
//   res.send("API Working")
// });

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})
app.listen(port, () => console.log(`Server started on PORT:${port}`))