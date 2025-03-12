import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function Admin() {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">管理ページ</h1>
            <div className="flex gap-2">
                <Link href="/admin/editor" className={buttonVariants()}>
                    Editor
                </Link>
                <Link href="/admin/json" className={buttonVariants()}>
                    JSON
                </Link>
            </div>
        </div>
    )
}
