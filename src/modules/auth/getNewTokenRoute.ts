import Elysia from "elysia";
import { db } from "../../db/db";

export const getNewTokenRoute = new Elysia()
.use(db)
.post('/access-token' , async({db , cookie:{refreshToken} , set , }) => {

})