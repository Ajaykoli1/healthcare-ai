"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  Stethoscope,
  Calendar,
  FileText,
  User,
  Settings
} from "lucide-react"

const routes = [
  {
    label: "Home",
    icon: Home,
    href: "/",
    color: "text-sky-500"
  },
  {
    label: "Diagnosis",
    icon: Stethoscope,
    href: "/diagnosis",
    color: "text-violet-500"
  },
  {
    label: "Treatment",
    icon: FileText,
    href: "/treatment",
    color: "text-pink-700"
  },
  {
    label: "Appointments",
    icon: Calendar,
    href: "/appointments",
    color: "text-orange-700"
  },
  {
    label: "Medical History",
    icon: FileText,
    href: "/medical-history",
    color: "text-emerald-500"
  },
  {
    label: "Profile",
    icon: User,
    href: "/profile",
    color: "text-blue-700"
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500"
  }
]

export function Nav() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white text-black">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1 className="text-2xl font-bold">
            AI Healthcare
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 