import express from "express"
import cors from 'cors';
import authRoutes from "./routes/auth-routes.js";

const app = new express()
const PORT = 8000

app.use(express.json())
app.use(cors({origin: "http://localhost:63342"}))

app.use('/auth', authRoutes)

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Backend server is listening on PORT = ${PORT} `));
    } catch (e) {
        console.log(e);
    }
}

start().then(err => console.error(err));