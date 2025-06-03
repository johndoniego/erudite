"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/toaster"
import Header from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { SidebarProvider } from "./context/sidebar-context"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()

  // Pages where we don't want header and sidebar
  const isAuthPage =
    pathname === "/" ||
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/onboarding") ||
    pathname?.startsWith("/welcome") ||
    pathname?.startsWith("/landing")

  return (
    <Providers>
      <SidebarProvider>
        <div className="relative min-h-screen">
          {!isAuthPage && <Header />}
          {!isAuthPage && <Sidebar />}
          <main className={!isAuthPage ? "pt-16 md:pl-0" : ""}>{children}</main>
          <Toaster />
        </div>
      </SidebarProvider>
    </Providers>
  )
}
