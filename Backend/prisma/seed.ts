import { PrismaClient } from "./src/generated/prisma/client"
import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { slugify } from "../src/utils/slugify"

const databaseUrl = `${process.env.DATABASE_URL}`

if (!databaseUrl) {
    throw new Error("DATABASE_URL not defined in environment variables")
}

const adapter = new PrismaPg({ connectionString: databaseUrl })
const prisma = new PrismaClient({ adapter })

const hashPassword = (password: string) =>
    Bun.password.hash(password, { algorithm: "bcrypt", cost: 10 })

async function main() {
    console.log("🔄 Очистка базы данных...")

    // Порядок важен из-за внешних ключей
    await prisma.playlist.deleteMany()
    await prisma.watchHistory.deleteMany()
    await prisma.like.deleteMany()
    await prisma.comment.deleteMany()
    await prisma.subscription.deleteMany()
    await prisma.video.deleteMany()
    await prisma.channel.deleteMany()
    await prisma.game.deleteMany()
    await prisma.user.deleteMany()

    console.log("🧹 База очищена. Создаём демо-данные...")

    const [demoPassword, amirPassword] = await Promise.all([
        hashPassword("demo1234"),
        hashPassword("amir1234"),
    ])

    // --- Пользователи и каналы ---
    const demoUser = await prisma.user.create({
        data: {
            email: "demo@youtube.local",
            username: "DemoCreator",
            password: demoPassword,
            channel: {
                create: {
                    slug: "demo",
                    description:
                        "Демо-канал: игры, обзоры и всякое разное. Аккаунт для проверки проекта.",
                    avatar: "/uploads/avatars/30616f61-edcf-4beb-a474-9bf8c912c9d7.jpg",
                    banner: null,
                    isVerified: true,
                },
            },
        },
        include: { channel: true },
    })

    const amirUser = await prisma.user.create({
        data: {
            email: "amir@example.com",
            username: "Amir_Tech",
            password: amirPassword,
            channel: {
                create: {
                    slug: "amir-tech",
                    description:
                        "Геймплей, обзоры патчей и тесты игр на Arch Linux.",
                    avatar: "/uploads/avatars/021a95a7-6f8f-4032-a7c8-b2879886f4b9.jpg",
                    banner: null,
                    isVerified: true,
                },
            },
        },
        include: { channel: true },
    })

    // --- Игры ---
    const cyberpunk = await prisma.game.create({
        data: { name: "Cyberpunk 2077", slug: "cyberpunk-2077" },
    })
    const eldenRing = await prisma.game.create({
        data: { name: "Elden Ring", slug: "elden-ring" },
    })
    const cs2 = await prisma.game.create({
        data: { name: "Counter-Strike 2", slug: "counter-strike-2" },
    })

    const demoChannel = demoUser.channel!
    const amirChannel = amirUser.channel!

    // --- Видео (файлы уже лежат в uploads/videos) ---
    const cyberpunkVideo = await prisma.video.create({
        data: {
            title: "Обзор патча Cyberpunk 2077 на Arch Linux",
            slug: slugify("Обзор патча Cyberpunk 2077 на Arch Linux"),
            description:
                "Проверяем новый патч, смотрим на производительность и делимся впечатлениями.",
            publicId: "cyberpunk-2077-review",
            thumbnailUrl: "/uploads/thumbnails/demo-1.jpg",
            videoFileName: "09b48cde-6768-4432-b669-31dd0145aa37.mp4",
            maxResolution: "720p",
            views: 12_540,
            tags: ["cyberpunk", "arch linux", "обзор"],
            isPublic: true,
            channelId: amirChannel.id,
            gameId: cyberpunk.id,
        },
    })

    const eldenRingVideo = await prisma.video.create({
        data: {
            title: "Elden Ring: финальный босс без урона",
            slug: slugify("Elden Ring: финальный босс без урона"),
            description:
                "Полное прохождение финального босса. Спойлеры! Тайминги и билд — в описании.",
            publicId: "elden-ring-final-boss",
            thumbnailUrl: "/uploads/thumbnails/demo-2.jpg",
            videoFileName: "415b997c-bf66-4e53-ab8d-b44ec1bdffaf.mp4",
            maxResolution: "720p",
            views: 8_410,
            tags: ["elden ring", "босс", "прохождение"],
            isPublic: true,
            channelId: demoChannel.id,
            gameId: eldenRing.id,
        },
    })

    const cs2Video = await prisma.video.create({
        data: {
            title: "CS2: лучшие моменты недели",
            slug: slugify("CS2: лучшие моменты недели"),
            description: "Подборка ярких раундов и клатчей за последнюю неделю.",
            publicId: "cs2-best-moments",
            thumbnailUrl: "/uploads/thumbnails/demo-3.jpg",
            videoFileName: "96e7c3a3-850f-4f0d-b9d3-c97a64604e8c.mp4",
            maxResolution: "720p",
            views: 5_320,
            tags: ["cs2", "хайлайты", "шутер"],
            isPublic: true,
            channelId: amirChannel.id,
            gameId: cs2.id,
        },
    })

    const pcBuildVideo = await prisma.video.create({
        data: {
            title: "Собираю игровой ПК в 2026 году",
            slug: slugify("Собираю игровой ПК в 2026 году"),
            description:
                "Бюджетная сборка, которая тянет современные игры в 1080p. Комплектующие, сборка и тесты.",
            publicId: "pc-build-2026",
            thumbnailUrl: "/uploads/thumbnails/demo-4.jpg",
            videoFileName: "41941f76-777b-4fae-8583-06bc547980f6.mp4",
            maxResolution: "720p",
            views: 3_180,
            tags: ["пк", "сборка", "железо"],
            isPublic: true,
            channelId: demoChannel.id,
        },
    })

    const forestVideo = await prisma.video.create({
        data: {
            title: "Прогулка по лесу в 4K — тест камеры",
            slug: slugify("Прогулка по лесу в 4K — тест камеры"),
            description: "Короткий тест стабилизации и цвета. Снято на выходных.",
            publicId: "forest-4k-test",
            thumbnailUrl: "/uploads/thumbnails/demo-5.jpg",
            videoFileName: "1b41db29-a6d4-48c6-9b28-03897ad6ab6a.mp4",
            maxResolution: "720p",
            views: 960,
            tags: ["природа", "4k", "тест"],
            isPublic: true,
            channelId: amirChannel.id,
        },
    })

    // --- Лайки ---
    await prisma.like.createMany({
        data: [
            { userId: demoUser.id, videoId: cyberpunkVideo.id },
            { userId: demoUser.id, videoId: eldenRingVideo.id },
            { userId: amirUser.id, videoId: cyberpunkVideo.id },
            { userId: amirUser.id, videoId: cs2Video.id },
        ],
    })

    // --- Комментарии ---
    await prisma.comment.createMany({
        data: [
            {
                userId: demoUser.id,
                videoId: cyberpunkVideo.id,
                text: "Отличный обзор! Как раз думал перепройти на Linux.",
            },
            {
                userId: amirUser.id,
                videoId: cyberpunkVideo.id,
                text: "Спасибо! Патч действительно хорошо зашёл.",
            },
            {
                userId: amirUser.id,
                videoId: eldenRingVideo.id,
                text: "Без урона — это сильно. Сколько попыток ушло?",
            },
            {
                userId: demoUser.id,
                videoId: pcBuildVideo.id,
                text: "Наконец-то нормальная сборка без переплаты за RGB.",
            },
        ],
    })

    // --- Подписки ---
    await prisma.subscription.createMany({
        data: [
            { userId: demoUser.id, channelId: amirChannel.id },
            { userId: amirUser.id, channelId: demoChannel.id },
        ],
    })

    // --- История просмотров ---
    await prisma.watchHistory.createMany({
        data: [
            { userId: demoUser.id, videoId: cyberpunkVideo.id },
            { userId: demoUser.id, videoId: eldenRingVideo.id },
            { userId: amirUser.id, videoId: cs2Video.id },
            { userId: amirUser.id, videoId: pcBuildVideo.id },
        ],
    })

    // --- Плейлисты ---
    await prisma.playlist.create({
        data: {
            name: "Посмотреть позже",
            userId: demoUser.id,
            videos: {
                connect: [{ id: cyberpunkVideo.id }, { id: cs2Video.id }],
            },
        },
    })

    await prisma.playlist.create({
        data: {
            name: "Избранное",
            userId: amirUser.id,
            videos: {
                connect: [{ id: eldenRingVideo.id }, { id: forestVideo.id }],
            },
        },
    })

    console.log("✅ Демо-данные созданы!")
    console.log("")
    console.log("Аккаунты для входа:")
    console.log("  demo@youtube.local / demo1234")
    console.log("  amir@example.com   / amir1234")
}

main()
    .catch(e => {
        console.error("❌ Ошибка во время выполнения сидера:", e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
