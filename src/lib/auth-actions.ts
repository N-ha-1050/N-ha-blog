"use server"

import { AuthError } from "next-auth"
import { signIn, signOut } from "@/lib/auth"

export async function signInAction(formData: FormData) {
    try {
        await signIn("credentials", formData)
    } catch (error) {
        if (error instanceof AuthError) {
            return error.type
        }
        throw error
    }
}

export async function signOutAction() {
    try {
        await signOut({ redirectTo: "/login" })
    } catch (error) {
        if (error instanceof AuthError) {
            return error.type
        }
        throw error
    }
}
