"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const NavMenu = () => {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/game", label: "Play" },
    { href: "/how-to-play", label: "How to Play" },
    { href: "/leaderboard", label: "Leaderboard" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-indigo-900/80 backdrop-blur-sm">
      <ul className="flex justify-center items-center p-4 space-x-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="relative">
              <span
                className={`text-indigo-200 hover:text-indigo-100 transition-colors ${
                  pathname === link.href ? "font-bold" : ""
                }`}
              >
                {link.label}
              </span>
              {pathname === link.href && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-400"
                  layoutId="underline"
                  initial={false}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavMenu

