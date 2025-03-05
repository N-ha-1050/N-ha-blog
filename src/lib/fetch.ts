import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const POSTS_PER_PAGE = 12

type GetPosts = {
    page: number
    query: string
    tags: string[]
}

export const getPosts = async ({ page, query, tags }: GetPosts) => {
    return await prisma.post.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { title: { contains: query, mode: "insensitive" } },
                        { content: { contains: query, mode: "insensitive" } },
                        {
                            tags: {
                                some: {
                                    name: {
                                        contains: query,
                                        mode: "insensitive",
                                    },
                                },
                            },
                        },
                    ],
                },
                { isVisible: true },
                tags.length > 0
                    ? {
                          tags: {
                              some: {
                                  name: { in: tags },
                              },
                          },
                      }
                    : {},
            ],
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * POSTS_PER_PAGE,
        take: POSTS_PER_PAGE,
        include: { tags: true },
    })
}

export const getPostsCount = async ({
    query,
    tags,
}: Omit<GetPosts, "page">) => {
    return await prisma.post.count({
        where: {
            AND: [
                {
                    OR: [
                        { title: { contains: query, mode: "insensitive" } },
                        { content: { contains: query, mode: "insensitive" } },
                        {
                            tags: {
                                some: {
                                    name: {
                                        contains: query,
                                        mode: "insensitive",
                                    },
                                },
                            },
                        },
                    ],
                },
                { isVisible: true },
                tags.length > 0
                    ? {
                          tags: {
                              some: {
                                  name: { in: tags },
                              },
                          },
                      }
                    : {},
            ],
        },
    })
}

type GetPost = {
    id: string
}

export const getPost = async ({ id }: GetPost) => {
    return await prisma.post.findUnique({
        where: { id, isVisible: true },
        include: { tags: true },
    })
}

export const getUserWithPassword = async ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    const userWithHashedPassword = await prisma.user.findUnique({
        where: { email, isActive: true },
    })

    // user が存在しない場合は null を返す
    if (!userWithHashedPassword) {
        return null
    }

    const { hashedPassword, ...user } = userWithHashedPassword

    // hashedPassword が存在しない場合は null を返す
    if (!hashedPassword) {
        return null
    }
    const isPasswordValid = await bcrypt.compare(password, hashedPassword)

    // パスワードが一致しない場合は null を返す
    if (!isPasswordValid) {
        return null
    }
    return user
}
