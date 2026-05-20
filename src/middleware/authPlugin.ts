import Elysia from "elysia";
import jwt from "@elysiajs/jwt";
import "dotenv/config";

export const authPlugin = new Elysia()
.use(jwt({
    name:'jwt',
    secret:process.env.JWT_ACCESS_SECRET || 'secretkeyforRefreshToken-superSecret'
}))
.derive({as:'scoped'},async({headers , jwt ,set}) => {
const authorization = headers['authorization']
if(!authorization && authorization?.startsWith('Bearer')){
    return {user:null}
}

const token = authorization?.split(' ')[1]
const payload = await jwt.verify(token)

if (!payload) {
            set.status = 401
            return { user: null, error: 'Unauthorized: Invalid token' }
}
return { 
            user: {
                id: payload.id,
            } 
        }
})