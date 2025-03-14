import { buttonVariants } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Admin",
    description: "管理者用ページです。",
}

export default function Admin() {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">管理者用ページ</h1>
            <div className="flex gap-2">
                <Link href="/admin/editor" className={buttonVariants()}>
                    Editor
                </Link>
                <Link href="/posts?v=t" className={buttonVariants()}>
                    Visible Posts
                </Link>
                <Link href="/admin/json" className={buttonVariants()}>
                    JSON
                </Link>
            </div>
        </div>
    )
}
