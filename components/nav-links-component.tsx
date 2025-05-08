"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function NavLinksComponent() {
  const pathname = usePathname()
  
  const links = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Vault", href: "/vault" },
    { name: "Talent-Profile", href: "/talent-profile" }
  ]
  
  return (
    <nav className="flex flex-row items-center">
      {links.map((link) => {
        const isActive = pathname === link.href
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "px-4 py-2 mx-1 text-sm font-medium rounded-md transition-colors",
              "hover:bg-slate-100 dark:hover:bg-slate-800",
              isActive 
                ? "text-primary font-semibold" 
                : "text-muted-foreground"
            )}
          >
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}