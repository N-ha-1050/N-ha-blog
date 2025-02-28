import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: {
        template: "%s | N_ha's Blog",
        default: "N_ha's Blog",
    },
    description: "N_ha のブログ(個人的なメモ)",
    icons: "/favicon.svg",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    )
}
