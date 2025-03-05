import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { object, string } from "zod"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { authConfig } from "@/lib/auth.config"
import { getUserWithPassword } from "@/lib/fetch"
import Google from "next-auth/providers/google"

export const signInSchema = object({
    email: string({ required_error: "Name is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})

export const providers: Provider[] = [
    Credentials({
        credentials: { email: {}, password: {} },
        async authorize(credentials) {
            const parsedCredentials = signInSchema.safeParse(credentials)
            if (!parsedCredentials.success) {
                console.error("Invalid credentials")
                return null
            }
            const { email, password } = parsedCredentials.data
            const user = await getUserWithPassword({
                email,
                password,
            })
            // console.log("In authorize")
            // console.log("user", user)
            if (!user) {
                console.error("Invalid credentials")
                return null
            }
            return user
        },
    }),
    Google,
]

export const providerMap = providers
    .map((provider) => {
        const { id, name } =
            typeof provider === "function" ? provider() : provider
        return { id, name }
    })
    .filter((provider) => provider.id !== "credentials")

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers,
    debug: process.env.NODE_ENV === "development",
})
