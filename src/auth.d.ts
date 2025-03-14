import { type DefaultSession } from "next-auth"
import { type DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            isAdmin: boolean
            isActive: boolean
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT extends DefaultJWT {
        id: string
        image: string
        isAdmin: boolean
        isActive: boolean
        email: string
        emailVerified: Date
    }
}
