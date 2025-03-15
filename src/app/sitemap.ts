import { getAllVisiblePosts } from "@/lib/db"
import type { MetadataRoute } from "next"
import { BASE_URL } from "@/lib/config"

export const dynamic = "force-dynamic"
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllVisiblePosts()
    return [
        {
            url: `${BASE_URL}/`,
            // changeFrequency: "yearly", // Googleで使用されない
            // priority: 1, // Googleで使用されない
        },
        {
            url: `${BASE_URL}/login`,
            // changeFrequency: "yearly",
            // priority: 0.1,
        },
        {
            url: `${BASE_URL}/posts`,
            lastModified: posts.reduce(
                (acc, post) => {
                    return post.createdAt > acc ? post.createdAt : acc
                },
                new Date(2004, 7, 23, 17, 0, 0),
            ),
            // changeFrequency: "weekly",
            // priority: 0.8,
        },
        ...posts.map((post) => ({
            url: `${BASE_URL}/posts/${post.id}`,
            lastModified: post.updatedAt,
            // changeFrequency: "monthly" as const,
            // priority: 0.5,
        })),
    ]
}
