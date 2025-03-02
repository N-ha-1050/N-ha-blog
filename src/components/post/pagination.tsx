"use client"

import {
    PaginationContent,
    Pagination,
    PaginationItem,
} from "@/components/ui/pagination"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    ChevronRight,
    ChevronFirst,
    ChevronLast,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { useDebouncedCallback } from "use-debounce"
import { Skeleton } from "@/components/ui/skeleton"

export function PostPagination({ lastPage }: { lastPage: number }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const page = Number(searchParams.get("p")) || 1

    const handleChangePage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        if (1 < page && page <= lastPage) {
            params.set("p", page.toString())
        } else {
            params.delete("p")
        }
        replace(`${pathname}?${params.toString()}`)
    }

    const handleChangePageWithDebounce = useDebouncedCallback(
        handleChangePage,
        700,
    )

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button
                        onClick={() => {
                            handleChangePage(1)
                        }}
                        variant="ghost"
                        size="icon"
                        disabled={page === 1}
                    >
                        <ChevronFirst className="size-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        onClick={() => {
                            handleChangePage(page - 1)
                        }}
                        variant="ghost"
                        size="icon"
                        disabled={page === 1}
                    >
                        <ChevronLeft className="size-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            min={1}
                            max={lastPage}
                            defaultValue={page}
                            onChange={(e) =>
                                handleChangePageWithDebounce(
                                    Number(e.target.value),
                                )
                            }
                            className="w-16"
                        />
                        <p>/</p>
                        <p>{lastPage}</p>
                    </div>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        onClick={() => {
                            handleChangePage(page + 1)
                        }}
                        variant="ghost"
                        size="icon"
                        disabled={page === lastPage}
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button
                        onClick={() => {
                            handleChangePage(lastPage)
                        }}
                        variant="ghost"
                        size="icon"
                        disabled={page === lastPage}
                    >
                        <ChevronLast className="size-4" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export function PostPaginationSkeleton() {
    const searchParams = useSearchParams()
    const page = Number(searchParams.get("p")) || 1
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button variant="ghost" size="icon" disabled>
                        <ChevronFirst className="size-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button variant="ghost" size="icon" disabled>
                        <ChevronLeft className="size-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            className="w-16"
                            defaultValue={page}
                            disabled
                        />
                        <p>/</p>
                        <Skeleton className="h-6 w-4" />
                    </div>
                </PaginationItem>
                <PaginationItem>
                    <Button variant="ghost" size="icon" disabled>
                        <ChevronRight className="size-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button variant="ghost" size="icon" disabled>
                        <ChevronLast className="size-4" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
