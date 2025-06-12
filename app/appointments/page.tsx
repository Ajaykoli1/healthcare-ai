"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { AppointmentsSection } from "@/components/appointments-section"

interface Appointment {
  id: string
  date: string
  time: string
  reason: string
}

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Schedule Your Appointment</h1>
      <AppointmentsSection />
    </div>
  )
} 