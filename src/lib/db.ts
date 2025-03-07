"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { POSTS_PER_PAGE } from "@/lib/config"

type GetPosts = {
    page: number
    query: string
    tags: string[]
    isAdmin?: boolean
}

export const getPosts = async ({
    page,
    query,
    tags,
    isAdmin = false,
}: GetPosts) => {
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
                { isVisible: isAdmin ? undefined : true },
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
    isAdmin = false,
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
                { isVisible: isAdmin ? undefined : true },
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

export const getAllPosts = async ({
    isAdmin = false,
}: {
    isAdmin: boolean
}) => {
    // ONLY FOR ADMIN!!!
    if (!isAdmin) {
        throw new Error("Unauthorized")
    }
    return await prisma.post.findMany({
        include: { tags: true },
        orderBy: { createdAt: "asc" },
    })
}

type GetPost = {
    id: string
    isAdmin?: boolean
}

export const getPost = async ({ id, isAdmin = false }: GetPost) => {
    return await prisma.post.findUnique({
        where: { id, isVisible: isAdmin ? undefined : true },
        include: { tags: true },
    })
}

type CreatePost = {
    title: string
    content: string
    tags?: { name: string }[]
    isVisible?: boolean
    isAdmin: boolean
}

export const createPost = async ({
    title,
    content,
    tags,
    isVisible,
    isAdmin = false,
}: CreatePost) => {
    // ONLY FOR ADMIN!!!
    if (!isAdmin) {
        throw new Error("Unauthorized")
    }
    return await prisma.post.create({
        data: {
            title,
            content,
            tags: {
                connectOrCreate: tags?.map((tag) => ({
                    create: tag,
                    where: tag,
                })),
            },
            isVisible,
        },
        include: { tags: true },
    })
}

type UpdatePost = {
    id: string
    title: string
    content: string
    tags?: { name: string }[]
    isVisible?: boolean
    isAdmin: boolean
}

export const updatePost = async ({
    id,
    title,
    content,
    tags,
    isVisible,
    isAdmin = false,
}: UpdatePost) => {
    // ONLY FOR ADMIN!!!
    if (!isAdmin) {
        throw new Error("Unauthorized")
    }
    return await prisma.post.update({
        where: { id },
        data: {
            title,
            content,
            tags: {
                set: [],
                connectOrCreate: tags?.map((tag) => ({
                    create: tag,
                    where: tag,
                })),
            },
            isVisible,
        },
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
