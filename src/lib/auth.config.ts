import type { NextAuthConfig } from "next-auth"

const callbacks: NextAuthConfig["callbacks"] = {
    async session({ session, token }) {
        // console.log("In Session Callback")
        // console.log("session", session)
        // console.log("user", user)
        // console.log("token", token)
        if (token) {
            const { email, id, name, image, isAdmin, isActive, emailVerified } =
                token
            session.user = {
                email,
                id,
                name,
                image,
                isAdmin,
                isActive,
                emailVerified,
            }
        }
        return session
    },
    async jwt({ token, user }) {
        // console.log("In JWT Callback")
        // console.log("token", token)
        // console.log("user", user)
        // console.log("account", account)
        // console.log("profile", profile)
        if (user) {
            const { email, id, name, image, isAdmin, isActive } = user as {
                email: string
                id: string
                name: string
                image: string
                isAdmin: boolean
                isActive: boolean
            }
            token = { ...token, email, id, name, image, isAdmin, isActive }
        }
        return token
    },
    authorized({ auth, request: { nextUrl } }) {
        const user = auth?.user
        const isOnAdminPage = nextUrl.pathname.startsWith("/admin")
        const isOnAuthPage = nextUrl.pathname.startsWith("/auth")
        const isOnLoginPage = nextUrl.pathname.startsWith("/login")
        if (isOnLoginPage) {
            if (user?.isActive)
                return Response.redirect(new URL("/auth", nextUrl))
            return true
        }
        if (isOnAdminPage) {
            if (user?.isAdmin) return true
            return false
        }
        if (isOnAuthPage) {
            if (user?.isActive) return true
            return false
        }
        return true
    },
}

export const authConfig = {
    pages: { signIn: "/login" },
    callbacks,
    providers: [],
    session: { strategy: "jwt" },
} satisfies NextAuthConfig
