import { PrismaClient } from "@prisma/client"
import { data } from "./data.tmp"

const { tags, posts } = data

const prisma = new PrismaClient()

async function seedTag() {
    tags.map(async ({ name }) => {
        const tag = await prisma.tag.create({
            data: { name },
        })
        console.log(tag.name)
    })
}

async function seedPost() {
    posts.map(
        async ({
            title,
            content,
            tags,
            is_visible: isVisible,
            created_at: createdAtText,
            updated_at: updatedAtText,
        }) => {
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    isVisible,
                    createdAt: new Date(createdAtText),
                    updatedAt: new Date(updatedAtText),
                    tags: {
                        connect: tags.map(({ name }) => ({ name })),
                    },
                },
            })
            console.log(post.title)
        },
    )
}

async function main() {
    await seedTag()
    await seedPost()
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
