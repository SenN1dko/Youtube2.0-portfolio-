import Elysia from "elysia";
import { db } from "../../../db/db";

export const getAll = new Elysia()
.use(db)
.get('/' , async({db , set}) => {
const channels = db.channel.findMany()
if(!channels){
    set.status = 404
    return {message:'channels not found'}
}
return channels
})