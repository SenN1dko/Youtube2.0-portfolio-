import {Elysia, t} from "elysia";
import "dotenv/config";
import { authPlugin } from "../../middleware/authPlugin";
import { db } from "../../db/db";
import { toggleLike } from "./routes/setLikesRoute";
export const userRoute = new Elysia({prefix:'/user'})
.use(authPlugin)
.use(db)
.use(toggleLike)
.get('/profile', async ({ user, db, set }) => {
  if (!user) {
    set.status = 401
    return { message: 'You are not authorized' }
  }

  const profile = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      username: true,
      email: true,
      channel: true,
      verificationToken: true,
      likes:true,
      subscriptions:{
        select:{
          channel:true
        }
      }
    }
  })

  const subscribedVideos = await db.video.findMany({
    where: {
      channel: {
        subscriptions: {
          some:{
            userId:user.id
          }
        }
      }
    },
    select: {
      id: true,
      title: true,
      publicId: true,
      description: true,
      thumbnailUrl: true,
      videoFileName: true,
      views: true,
      isPublic: true,
      createdAt: true,
      channel: {
        select: {
          id: true,
          slug: true,
          avatar: true,
          isVerified: true,
          owner: {
            select: {
              id: true,
              username: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return {
    ...profile,
    subscribedVideos
  }
})

.put('/profile', async ({ user, db, set, body }) => {
        if (!user) {
            set.status = 401
            return { message: 'You are not authorized' }
        }

        const { email, password, username, channel } = body
       let hashedPassword: string | undefined = undefined
        if (password) {
            hashedPassword = await Bun.password.hash(password, {
                algorithm: 'bcrypt',
                cost: 10
            })
        }
        try {
                await db.user.update({    
            where: { id: user.id },
            data: {
                ...(email && { email }),
                ...(hashedPassword && { password: hashedPassword }),
                ...(username && { username }),
                ...(channel && {
                    channel: {
                        update: {
                            ...(typeof channel.avatar === 'string' && { avatar: channel.avatar }),
                            ...(typeof channel.banner === 'string' && { banner: channel.banner }),
                            ...(channel.slug && { slug: channel.slug }),
                            ...(channel.description && { description: channel.description })
                        }
                    }
                })
            }
        })
            return true
        } catch (error) {
            set.status = 500
            return false
        }
    }, {
    body: t.Object({
        email: t.Optional(t.String()),
        password: t.Optional(t.String()),
        username: t.Optional(t.Nullable(t.String())),
        
        channel: t.Optional(
            t.Object({
                avatar: t.Optional(t.Nullable(t.String())),
                banner: t.Optional(t.Nullable(t.String())),
                slug: t.Optional(t.Nullable(t.String())),
                description: t.Optional(t.Nullable(t.String())) // 🌟 Здесь тоже разрешаем null
            })
        )
    })
})