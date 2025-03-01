import { prisma } from "@/lib/prisma"
import { PostCard, PostCardSkeleton } from "@/components/post/post-card"
import { PostPagination, PostPaginationSkeleton } from "./pagination"
import { Skeleton } from "../ui/skeleton"

const POSTS_PER_PAGE = 12

type Where = {
    AND: (
        | {
              OR: (
                  | { title: { contains: string; mode: "insensitive" } }
                  | { content: { contains: string; mode: "insensitive" } }
                  | {
                        tags: {
                            some: {
                                name: { contains: string; mode: "insensitive" }
                            }
                        }
                    }
              )[]
          }
        | {
              tags?: {
                  some: {
                      name: { in: string[] }
                  }
              }
          }
    )[]
}

export async function PostList({
    page,
    query,
    tags = [],
}: {
    page: number
    query: string
    tags?: string[]
}) {
    const where: Where = {
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
                // isVisible: true,
            },
            tags.length > 0
                ? {
                      tags: {
                          some: {
                              name: {
                                  in: tags,
                              },
                          },
                      },
                  }
                : {},
        ],
    }
    const posts = await prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * POSTS_PER_PAGE,
        take: POSTS_PER_PAGE,
        include: { tags: true },
    })
    const allPages = await prisma.post.count({ where })
    const lastPage = ((allPages + POSTS_PER_PAGE - 1) / POSTS_PER_PAGE) | 0 // Math.ceil(allPages / POSTS_PER_PAGE) と同じ
    return (
        <>
            {allPages === 0 ? (
                <p>記事が見つかりませんでした。</p>
            ) : (
                <>
                    <p>検索結果: {allPages}件</p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                    <PostPagination lastPage={lastPage} />
                </>
            )}
        </>
    )
}

export function PostListSkeleton() {
    return (
        <>
            <Skeleton className="h-4 w-32" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(POSTS_PER_PAGE)].map((_, i) => (
                    <PostCardSkeleton key={i} />
                ))}
            </div>
            <PostPaginationSkeleton />
        </>
    )
}
