import { Elysia ,t} from "elysia";
import { videoRoutes } from "./routes/videoRoute";
import { videoUpload } from "./routes/videoUpdateRoute";
const app = new Elysia()
.use(videoRoutes)
.use(videoUpload)
.listen(3000, () =>{
    console.log(`The server is running on 3000 port`)
})