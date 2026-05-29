import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import 'dotenv/config';
export const authBase = new Elysia()
    .use(jwt({
        name: 'accessJwt',
        secret: process.env.JWT_ACCESS_SECRET || 'secretkeyforAccessToken-superSecret',
        exp: '1h'
    }))
    .use(jwt({
        name: 'refreshJwt',
        secret: process.env.JWT_REFRESH_SECRET || 'secretkeyforRefreshToken-superSecret'
    }));