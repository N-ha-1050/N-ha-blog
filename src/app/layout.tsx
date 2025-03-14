import type { Metadata } from "next"
import "@/app/globals.css"
import { Header } from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { notoSansJP } from "@/lib/fonts"
import { CANONICAL_BASE_URL } from "@/lib/config"
import { GoogleAnalytics } from "@next/third-parties/google"

export const metadata: Metadata = {
    title: {
        template: "%s | N_ha's Blog",
        default: "N_ha's Blog",
    },
    description: "N_ha のブログ(個人的なメモ)",
    icons: "/favicon.svg",
    alternates: { canonical: `${CANONICAL_BASE_URL}/` },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ja" suppressHydrationWarning>
            <body className={`${notoSansJP.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-8 py-16">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
            {/* Google Analytics: https://nextjs.org/docs/messages/next-script-for-ga */}
            <GoogleAnalytics gaId="G-45KN284659" />
        </html>
    )
}
