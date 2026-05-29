import { Elysia } from "elysia";
import { authBase } from "./authConfig/auth.config";
import "dotenv/config";
import { db } from "../../db/db";
import { getNewTokenRoute } from "./getNewTokenRoute";
import { loginRoute } from "./routes/loginRoute";
import { registerRoute } from "./routes/registerRoute";



export const authRoutes = new Elysia({ prefix: '/auth' })
    .use(db)
    .use(authBase) 
    .use(loginRoute)
    .use(registerRoute)
    .use(getNewTokenRoute)
    .post('/logout', async ({ cookie: { refreshToken } }) => {
        refreshToken.remove();
        return { message: "success" };
    });