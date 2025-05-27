"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface Appointment {
  id: string
  date: string
  time: string
  reason: string
}

export default function AppointmentsPage() {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [reason, setReason] = useState("")
  const [isScheduling, setIsScheduling] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const handleSchedule = async () => {
    if (!date || !time || !reason.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setIsScheduling(true)
    try {
      // Simulate appointment scheduling
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Create new appointment
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        date,
        time,
        reason
      }
      
      // Add to appointments list
      setAppointments(prev => [...prev, newAppointment])
      
      toast.success("Appointment scheduled successfully!")
      setDate("")
      setTime("")
      setReason("")
    } catch (error) {
      toast.error("Failed to schedule appointment")
    } finally {
      setIsScheduling(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Appointment</CardTitle>
            <CardDescription>
              Book your next medical consultation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <input 
                  type="date" 
                  className="w-full p-2 border rounded-md"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Select a time</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for Visit</label>
                <textarea 
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Please describe the reason for your visit..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <button 
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSchedule}
                disabled={isScheduling}
              >
                {isScheduling ? "Scheduling..." : "Schedule Appointment"}
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              View and manage your scheduled appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No upcoming appointments</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{formatDate(appointment.date)}</p>
                          <p className="text-gray-600">{appointment.time}</p>
                          <p className="text-gray-600 mt-2">{appointment.reason}</p>
                        </div>
                        <button 
                          onClick={() => {
                            setAppointments(prev => prev.filter(apt => apt.id !== appointment.id))
                            toast.success("Appointment cancelled")
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 