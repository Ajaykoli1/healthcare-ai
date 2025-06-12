"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarIcon, Clock, User, Stethoscope } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

interface Appointment {
  id: string
  date: Date
  time: string
  doctor: string
  reason: string
  status: "scheduled" | "completed" | "cancelled"
}

const availableDoctors = [
  { id: "1", name: "Dr. Sarah Johnson", specialty: "General Medicine" },
  { id: "2", name: "Dr. Michael Chen", specialty: "Cardiology" },
  { id: "3", name: "Dr. Emily Brown", specialty: "Pediatrics" },
  { id: "4", name: "Dr. James Wilson", specialty: "Neurology" },
  { id: "5", name: "Dr. Lisa Martinez", specialty: "Dermatology" }
]

const availableTimeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "02:00 PM", "03:00 PM", "04:00 PM"
]

export function AppointmentsSection() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [reason, setReason] = useState("")
  const [isScheduling, setIsScheduling] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const handleSchedule = async () => {
    if (!date || !selectedTime || !selectedDoctor || !reason.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setIsScheduling(true)
    try {
      // Simulate appointment scheduling
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        date,
        time: selectedTime,
        doctor: selectedDoctor,
        reason,
        status: "scheduled"
      }
      
      setAppointments(prev => [...prev, newAppointment])
      toast.success("Appointment scheduled successfully!")
      
      // Reset form
      setSelectedTime("")
      setSelectedDoctor("")
      setReason("")
    } catch (error) {
      toast.error("Failed to schedule appointment")
    } finally {
      setIsScheduling(false)
    }
  }

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: "cancelled" }
          : apt
      )
    )
    toast.success("Appointment cancelled")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Appointment</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Select Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Select Time</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Select Doctor</label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose doctor" />
                </SelectTrigger>
                <SelectContent>
                  {availableDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Reason for Visit</label>
            <Textarea
              placeholder="Please describe the reason for your visit..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button 
            onClick={handleSchedule} 
            disabled={isScheduling || !date || !selectedTime || !selectedDoctor || !reason.trim()}
          >
            {isScheduling ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Appointment
              </>
            )}
          </Button>

          {appointments.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-4">Your Appointments</h3>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className="p-4 bg-gray-50 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="font-medium">
                          {format(appointment.date, "MMMM d, yyyy")} at {appointment.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          <User className="inline-block h-4 w-4 mr-1" />
                          {appointment.doctor}
                        </p>
                        <p className="text-sm text-gray-600">
                          <Stethoscope className="inline-block h-4 w-4 mr-1" />
                          {appointment.reason}
                        </p>
                        <p className="text-sm">
                          Status:{" "}
                          <span className={`font-medium ${
                            appointment.status === "scheduled" 
                              ? "text-green-600" 
                              : appointment.status === "cancelled" 
                                ? "text-red-600" 
                                : "text-blue-600"
                          }`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </p>
                      </div>
                      {appointment.status === "scheduled" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 