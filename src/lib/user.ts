"use server"

import { changeNameWithPassword } from "@/lib/db"
import { signOut } from "@/lib/auth"

export const changeName = async (formData: FormData) => {
    const name = formData.get("name")?.toString() || ""
    const password = formData.get("password")?.toString() || ""
    const user = await changeNameWithPassword({ name, password })
    if (!user) {
        console.error("Invalid credentials")
        return "Invalid credentials"
    }
    await signOut({ redirectTo: "/login" })
}
