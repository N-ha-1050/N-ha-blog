"use client"

import {
    PaginationContent,
    Pagination,
    PaginationItem,
    PaginationEllipsis,
} from "@/components/ui/pagination"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    ChevronLeft,
    ChevronRight,
    ChevronFirst,
    ChevronLast,
} from "lucide-react"
import { Input } from "../ui/input"
import { useDebouncedCallback } from "use-debounce"
import { Skeleton } from "../ui/skeleton"

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
                        <ChevronFirst className="h-4 w-4" />
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
                        <ChevronLeft className="h-4 w-4" />
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
                        <ChevronRight className="h-4 w-4" />
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
                        <ChevronLast className="h-4 w-4" />
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
                        <ChevronFirst className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button variant="ghost" size="icon" disabled>
                        <ChevronLeft className="h-4 w-4" />
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
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button variant="ghost" size="icon" disabled>
                        <ChevronLast className="h-4 w-4" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

// export function _PostPagination({ lastPage }: { lastPage: number }) {
//     const pathname = usePathname()
//     const searchParams = useSearchParams()
//     const { replace } = useRouter()
//     const page = Number(searchParams.get("p")) || 1

//     const createPageURL = (page: number) => {
//         const params = new URLSearchParams(searchParams)
//         if (1 < page && page <= lastPage) {
//             params.set("p", page.toString())
//         } else {
//             params.delete("p")
//         }
//         return `${pathname}?${params.toString()}`
//     }
//     return (
//         <Pagination>
//             <PaginationContent>
//                 {page > 2 && (
//                     <PaginationItem>
//                         <Button
//                             onClick={() => {
//                                 replace(createPageURL(1))
//                             }}
//                             variant="ghost"
//                         >
//                             1
//                         </Button>
//                     </PaginationItem>
//                 )}
//                 {page > 3 && (
//                     <PaginationItem>
//                         <PaginationEllipsis />
//                     </PaginationItem>
//                 )}
//                 {page > 1 && (
//                     <PaginationItem>
//                         <Button
//                             onClick={() => {
//                                 replace(createPageURL(page - 1))
//                             }}
//                             variant="ghost"
//                         >
//                             {page - 1}
//                         </Button>
//                     </PaginationItem>
//                 )}
//                 <PaginationItem>
//                     <Button variant="outline">{page}</Button>
//                 </PaginationItem>
//                 {page < lastPage && (
//                     <PaginationItem>
//                         <Button
//                             onClick={() => {
//                                 replace(createPageURL(page + 1))
//                             }}
//                             variant="ghost"
//                         >
//                             {page + 1}
//                         </Button>
//                     </PaginationItem>
//                 )}
//                 {page < lastPage - 2 && (
//                     <PaginationItem>
//                         <PaginationEllipsis />
//                     </PaginationItem>
//                 )}
//                 {page < lastPage - 1 && (
//                     <PaginationItem>
//                         <Button
//                             onClick={() => {
//                                 replace(createPageURL(lastPage))
//                             }}
//                             variant="ghost"
//                         >
//                             {lastPage}
//                         </Button>
//                     </PaginationItem>
//                 )}
//             </PaginationContent>
//         </Pagination>
//     )
// }
