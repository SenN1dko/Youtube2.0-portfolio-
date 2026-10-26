import Elysia, { t } from "elysia";
import { db } from "../../../db/db";
import { prisma } from "../../../lib/prisma";

async function findVideo(where: { slug: string } | { publicId: string }) {
    const video = await prisma.video.findUnique({
        where,
        include: {
            likes: true,
            channel: {
                include: {
                    subscriptions: true,
                    owner: true
                }
            }
        }
    })

    if (!video) return null

    const similarVideos = await prisma.video.findMany({
        where: {
            channelId: video.channelId,
            NOT: { id: video.id }
        },
        include: {
            channel: {
                include: {
                    owner: true
                }
            }
        }
    })

    return {
        ...video,
        similarVideos
    }
}

export const getVideoById = new Elysia()
    .use(db)
    .post('by-slug/:slug', async ({ set, params: { slug } }) => {
        try {
            const video = await findVideo({ slug })

            if (!video) {
                set.status = 404
                return { message: 'Video not found' }
            }

            return video
        } catch (error) {
            console.error('Get video by slug error:', error)
            set.status = 500
            return { message: 'Internal server error' }
        }
    }, {
        params: t.Object({
            slug: t.String()
        })
    })
    .post('by-publicId/:publicId', async ({ set, params: { publicId } }) => {
        try {
            const video = await findVideo({ publicId })

            if (!video) {
                set.status = 404
                return { message: 'Video not found' }
            }

            return video
        } catch (error) {
            console.error('Get video by publicId error:', error)
            set.status = 500
            return { message: 'Internal server error' }
        }
    }, {
        params: t.Object({
            publicId: t.String()
        })
    })
