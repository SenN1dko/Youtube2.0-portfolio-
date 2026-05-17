import { PrismaClient } from "./src/generated/prisma/client"
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = `${process.env.DATABASE_URL}`;

if(!databaseUrl) {
    throw new Error('DATABASE_URL not defined in environment variables')
}

const adapter = new PrismaPg({ connectionString:databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
console.log('🔄 Старт очистки базы данных...')
    
    await prisma.video.deleteMany()
    await prisma.channel.deleteMany()
    await prisma.game.deleteMany()
    await prisma.user.deleteMany()
    
    console.log('🧹 База данных успешно очищена!')

    console.log('🌱 Начинаем заполнение (Seeding)...')

    const game = await prisma.game.create({
        data: {
            name: 'Cyberpunk 2077',
            slug: 'cyberpunk-2077'
        }
    })

    const user = await prisma.user.create({
        data: {
            username: 'Amir_Tech',
            email: 'amir@example.com',
            password: 'supersecretpassword123' 
        }
    })

    const channel = await prisma.channel.create({
    data: {
        name: 'Amir Gaming Channel',
        owner: {
            connect: { id: user.id } 
        }
    }
})

    await prisma.video.create({
        data: {
            title: 'Обзор патча Cyberpunk 2077 на Arch Linux!',
            slug: 'obzor-patcha-cyberpunk-2077-na-arch-linux',
            thumbnailUrl: 'https://gaming-cdn.com/images/products/14769/orig/cyberpunk-2077-ultimate-edition-ultimate-edition-pc-game-gog-com-cover.jpg?v=1748447646',
            videoFileName: 'cyber_review.mp4',
            views: 1250, 
            isPublic: true,
            channel: {
                connect: { id: channel.id }
            },
            game: {
                connect: { id: game.id }
            }
        }
    })

    console.log('✅ База данных успешно заполнена тестовыми данными!')
}

main()
    .catch((e) => {
        console.error('❌ Ошибка во время выполнения сидера:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })