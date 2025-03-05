import { PrismaClient } from "@prisma/client"
import { data } from "./data.tmp"
import bcrypt from "bcryptjs"

const { tags, posts, users } = data

const prisma = new PrismaClient()

async function seedTag() {
    return await Promise.all(
        tags.map(async ({ name }) => {
            return await prisma.tag.create({
                data: { name },
            })
        }),
    )
}

async function seedPost() {
    return await Promise.all(
        posts.map(
            async ({
                title,
                content,
                tags,
                is_visible: isVisible,
                created_at: createdAtText,
                updated_at: updatedAtText,
            }) => {
                return await prisma.post.create({
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
            },
        ),
    )
}

async function seedUser() {
    return await Promise.all(
        users.map(
            async ({
                email,
                password,
                name,
                is_active: isActive,
                is_admin: isAdmin,
            }) => {
                const hashedPassword = await bcrypt.hash(password, 10)
                return await prisma.user.create({
                    data: {
                        name,
                        email,
                        hashedPassword,
                        isActive,
                        isAdmin,
                    },
                })
            },
        ),
    )
}

async function main() {
    console.log("Start Tags seeding")
    const tags = await seedTag()
    tags.map((tag) => console.log(tag.name))
    console.log("Finish Tags seeding\n\n")
    console.log("Start Posts seeding")
    const posts = await seedPost()
    posts.map((post) => console.log(post.title))
    console.log("Finish Posts seeding\n\n")
    console.log("Start Users seeding")
    const user = await seedUser()
    user.map((user) => console.log(user.email))
    console.log("Finish Users seeding\n\n")
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
