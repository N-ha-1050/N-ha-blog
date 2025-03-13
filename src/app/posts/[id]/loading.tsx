import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div>
            <Skeleton className="mb-4 h-16 w-full" />
            <Skeleton className="mb-8 h-8 w-64" />
            <Skeleton className="mb-4 h-8 w-full" />
            <Skeleton className="mb-4 h-8 w-full" />
            <Skeleton className="mb-4 h-8 w-full" />
            <Skeleton className="mb-4 h-8 w-full" />
        </div>
    )
}
