"use client"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="mb-8 text-4xl font-bold">Server Error</h1>
            <p>サーバーとの接続ができませんでした。</p>
            <Button variant="link" onClick={() => reset()}>
                再読み込み
            </Button>
        </div>
    )
}
