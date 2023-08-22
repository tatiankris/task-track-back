import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import cors from 'cors'
import tasksRouter from "./routes/tasksRouter.js";

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

const corsOptions = {
    origin:
        [
            'http://localhost:3000',
            'https://tasks-track.vercel.app'
        ],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date', 'X-Api-Version']
}

app.use(cors(corsOptions))

app.use(express.json())
app.use('', tasksRouter)
mongoose.set('strictQuery', true);

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://tatiana:tatiana@cluster0.knqxkoy.mongodb.net/?retryWrites=true&w=majority")
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
export default app;