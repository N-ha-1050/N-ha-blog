import { SignOut } from "@/components/auth/sign-out"
import { buttonVariants } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Auth() {
    const session = await auth()
    // console.log("In Auth page")
    // console.log("session", session)
    if (!session?.user) {
        redirect("/login")
    }
    const user = session.user
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">アカウント</h1>
            <h2>ようこそ {user.name ?? "Unknown"} さん</h2>
            {user.isAdmin && (
                <Link
                    href="/admin"
                    className={buttonVariants({ variant: "link" })}
                >
                    管理ページへ
                </Link>
            )}
            <div>メールアドレス: {user.email}</div>
            <SignOut />
        </div>
    )
}
