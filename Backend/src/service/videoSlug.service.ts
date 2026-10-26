import { prisma } from "../lib/prisma"
import { slugify } from "../utils/slugify"

export async function generateUniqueVideoSlug(title: string): Promise<string> {
    const base = slugify(title) || "video"

    let slug = base
    let counter = 2

    while (await prisma.video.findUnique({ where: { slug }, select: { id: true } })) {
        slug = `${base}-${counter}`
        counter++
    }

    return slug
}
