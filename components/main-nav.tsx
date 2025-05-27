import Link from "next/link"
import { Activity, Calendar, FileText, Home, Users } from "lucide-react"

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        <Home className="h-4 w-4 mr-2 inline-block" />
        Dashboard
      </Link>
      <Link
        href="/diagnosis"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Activity className="h-4 w-4 mr-2 inline-block" />
        Diagnosis
      </Link>
      <Link
        href="/treatment"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <FileText className="h-4 w-4 mr-2 inline-block" />
        Treatment
      </Link>
      <Link
        href="/appointments"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Calendar className="h-4 w-4 mr-2 inline-block" />
        Appointments
      </Link>
      <Link href="/doctors" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        <Users className="h-4 w-4 mr-2 inline-block" />
        Doctors
      </Link>
    </nav>
  )
}

