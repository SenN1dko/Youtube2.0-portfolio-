import { Elysia ,t} from "elysia";
import { authRoutes } from "./modules/auth/authRoute";
import cors from "@elysiajs/cors";
import { userRoute } from "./modules/user/userRoute";
import { videoUpload } from "./modules/video/videoUpdateRoute";
import { videoRoutes } from "./modules/video/videoRoute";
import { resendVerifyEmail } from "./modules/auth/emailVerify /verifyEmailRoute";
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
.use(resendVerifyEmail)
.listen(3001, () =>{
    console.log(`The server is running on 3001 port`)
})