"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { POSTS_PER_PAGE } from "@/lib/config"
import { auth } from "@/lib/auth"

export const getIsAdmin = async () => {
    const session = await auth()
    return session?.user?.isAdmin ?? false
}

export const getIsActive = async () => {
    const session = await auth()
    return session?.user?.isActive ?? false
}

export const getEmail = async () => {
    const session = await auth()
    return session?.user?.email ?? null
}

const getIsVisible = (isAdmin: boolean, isVisible?: boolean) => {
    return isAdmin ? isVisible : true
}

export type GetPosts = {
    page: number
    query: string
    tags: string[]
    isVisible?: boolean
}

export const getPosts = async ({ page, query, tags, isVisible }: GetPosts) => {
    const isAdmin = await getIsAdmin()
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
                { isVisible: getIsVisible(isAdmin, isVisible) },
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

export type GetPostsCount = Omit<GetPosts, "page">

export const getPostsCount = async ({
    query,
    tags,
    isVisible,
}: GetPostsCount) => {
    const isAdmin = await getIsAdmin()
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
                { isVisible: getIsVisible(isAdmin, isVisible) },
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

export const getAllPosts = async () => {
    // ONLY FOR ADMIN!!!
    const isAdmin = await getIsAdmin()
    if (!isAdmin) {
        throw new Error("Unauthorized")
    }
    return await prisma.post.findMany({
        include: { tags: true },
        orderBy: { createdAt: "asc" },
    })
}

export const getAllVisiblePosts = async () => {
    return await prisma.post.findMany({
        where: { isVisible: true },
        include: { tags: true },
        orderBy: { createdAt: "asc" },
    })
}

export type GetPost = { id: string }

export const getPost = async ({ id }: GetPost) => {
    const isAdmin = await getIsAdmin()
    return await prisma.post.findUnique({
        where: { id, isVisible: isAdmin ? undefined : true },
        include: { tags: true },
    })
}

export type CreatePost = {
    title: string
    content: string
    tags?: { name: string }[]
    isVisible?: boolean
}

export const createPost = async ({
    title,
    content,
    tags,
    isVisible,
}: CreatePost) => {
    // ONLY FOR ADMIN!!!
    const isAdmin = await getIsAdmin()
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

export type UpdatePost = {
    id: string
    title: string
    content: string
    tags?: { name: string }[]
    isVisible?: boolean
}

export const updatePost = async ({
    id,
    title,
    content,
    tags,
    isVisible,
}: UpdatePost) => {
    // ONLY FOR ADMIN!!!
    const isAdmin = await getIsAdmin()

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

export type GetUserWithPassword = {
    password: string
    email: string
}

export const getUserWithPassword = async ({
    email,
    password,
}: GetUserWithPassword) => {
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

export const changeNameWithPassword = async ({
    password,
    name,
}: {
    password: string
    name: string
}) => {
    // ONLY FOR ACTIVE USER!!!
    const isActive = await getIsActive()

    if (!isActive) {
        throw new Error("Unauthorized")
    }

    const email = await getEmail()
    if (!email) {
        return null
    }

    const user = await getUserWithPassword({ email, password })

    if (!user) {
        return null
    }

    return await prisma.user.update({
        where: { email: user.email },
        data: { name },
    })
}
