import { Elysia } from "elysia";
import { authRoutes } from "./modules/auth/authRoute";
import cors from "@elysiajs/cors";
import { userRoute } from "./modules/user/userRoute";
import { videoUpload } from "./modules/video/videoUpdateRoute";
import { videoRoutes } from "./modules/video/videoRoute";
import { resendVerifyEmail } from "./modules/auth/routes/emailVerify /verifyEmailRoute";
import staticPlugin from "@elysiajs/static";
import { fileRoute } from "./modules/file/routes/fileRoute";
import { ChannelRoute } from "./modules/channel /Channel.route";
import swagger from "@elysiajs/swagger";
import { CommentRoutes } from "./modules/comment/Comment.route";
const app = new Elysia()
   .use(swagger())
.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:3001'], 
        credentials: true, 
        allowedHeaders: ['Content-Type', 'Authorization', 'recaptcha']
    }))
.use(staticPlugin({
        assets: 'src/modules/file/uploads', 
        prefix: '/uploads'              
    }))
.use(videoRoutes)
.use(fileRoute)
.use(videoUpload)
.use(authRoutes)
.use(CommentRoutes)
.use(userRoute)
.use(resendVerifyEmail)
.use(ChannelRoute)
.listen(3001, () =>{
    console.log(`The server is running on 3001 port`)
})