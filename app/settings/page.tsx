"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Bell, Moon, Globe, Shield, Mail } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      appointmentReminders: true,
      medicationReminders: true
    },
    appearance: {
      darkMode: false,
      language: "English"
    },
    privacy: {
      shareMedicalHistory: false,
      shareWithDoctors: true
    }
  })

  const handleToggle = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: !prev[category as keyof typeof prev][setting as keyof typeof prev[typeof category]]
      }
    }))
    toast.success("Setting updated")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates via email
                </p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={() => handleToggle("notifications", "email")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive updates via SMS
                </p>
              </div>
              <Switch
                checked={settings.notifications.sms}
                onCheckedChange={() => handleToggle("notifications", "sms")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Appointment Reminders</Label>
                <p className="text-sm text-gray-500">
                  Get reminded about upcoming appointments
                </p>
              </div>
              <Switch
                checked={settings.notifications.appointmentReminders}
                onCheckedChange={() => handleToggle("notifications", "appointmentReminders")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Medication Reminders</Label>
                <p className="text-sm text-gray-500">
                  Get reminded about medication schedules
                </p>
              </div>
              <Switch
                checked={settings.notifications.medicationReminders}
                onCheckedChange={() => handleToggle("notifications", "medicationReminders")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-gray-500">
                  Switch between light and dark theme
                </p>
              </div>
              <Switch
                checked={settings.appearance.darkMode}
                onCheckedChange={() => handleToggle("appearance", "darkMode")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Language</Label>
                <p className="text-sm text-gray-500">
                  Choose your preferred language
                </p>
              </div>
              <select
                className="p-2 border rounded-md"
                value={settings.appearance.language}
                onChange={(e) => {
                  setSettings(prev => ({
                    ...prev,
                    appearance: {
                      ...prev.appearance,
                      language: e.target.value
                    }
                  }))
                  toast.success("Language updated")
                }}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Share Medical History</Label>
                <p className="text-sm text-gray-500">
                  Allow sharing of your medical history with healthcare providers
                </p>
              </div>
              <Switch
                checked={settings.privacy.shareMedicalHistory}
                onCheckedChange={() => handleToggle("privacy", "shareMedicalHistory")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Share with Doctors</Label>
                <p className="text-sm text-gray-500">
                  Allow doctors to access your medical records
                </p>
              </div>
              <Switch
                checked={settings.privacy.shareWithDoctors}
                onCheckedChange={() => handleToggle("privacy", "shareWithDoctors")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Update Contact Information
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 