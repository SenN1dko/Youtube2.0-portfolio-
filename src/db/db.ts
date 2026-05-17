import Elysia from "elysia";
import { prisma } from "../lib/prisma";

export const db = new Elysia({name:'db'})
.decorate('db' , prisma)