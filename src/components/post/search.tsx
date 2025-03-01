"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from "use-debounce"

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const handleSearch = useDebouncedCallback((query: string) => {
        const params = new URLSearchParams(searchParams)
        params.delete("p")
        if (query) {
            params.set("q", query)
        } else {
            params.delete("q")
        }
        replace(`${pathname}?${params.toString()}`)
    }, 700)
    const query = searchParams.get("q")?.toString() || ""

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <Input
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value)
                }}
                defaultValue={query}
            />
        </div>
    )
}
