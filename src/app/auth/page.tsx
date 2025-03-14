import { ChangeName } from "@/components/auth/change-name"
import { SignOut } from "@/components/auth/sign-out"
import { buttonVariants } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "ユーザー情報",
    description: "ユーザー情報ページです。",
}
export default async function Auth() {
    const session = await auth()
    if (!session?.user.isActive) {
        redirect("/login")
    }
    const user = session.user
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">ユーザー情報</h1>
            <h2 className="text-xl">ようこそ {user.name ?? "Unknown"} さん</h2>
            <div className="flex gap-2">
                <ChangeName name={user.name ?? "Unknown"} />
                {user.isAdmin && (
                    <Link href="/admin" className={buttonVariants()}>
                        管理ページ
                    </Link>
                )}
                <SignOut />
            </div>
        </div>
    )
}
