"use client"

import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Navigation } from "@/components/layout/navigation"

const navigationLinks: { href: string; text: string }[] = [
    { href: "/", text: "Home" },
    { href: "/posts", text: "Posts" },
]

export function Header() {
    const [isOpen, setOpen] = useState(false)
    return (
        <header className="bg-blue-400 dark:bg-blue-800">
            <div className="mx-auto max-w-7xl px-4 py-2 md:flex md:items-center md:justify-between">
                <div className="flex items-center justify-between">
                    <Logo />
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setOpen(!isOpen)}
                        >
                            <Menu />
                        </Button>
                    </div>
                </div>
                <Navigation
                    isOpen={isOpen}
                    setOpen={setOpen}
                    navigationLinks={navigationLinks}
                />
            </div>
        </header>
    )
}
