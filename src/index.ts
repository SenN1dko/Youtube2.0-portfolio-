import { Elysia ,t} from "elysia";
import { videoRoutes } from "./routes/videoRoute";
import { videoUpload } from "./routes/videoUpdateRoute";
import { authRoutes } from "./routes/authRoute";
import cors from "@elysiajs/cors";
import { userRoute } from "./routes/userRoute";
const app = new Elysia()
.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'], 
        credentials: true, 
        allowedHeaders: ['Content-Type', 'Authorization', 'recaptcha']
    }))
.use(videoRoutes)
.use(videoUpload)
.use(authRoutes)
.use(userRoute)
.listen(3001, () =>{
    console.log(`The server is running on 3001 port`)
})