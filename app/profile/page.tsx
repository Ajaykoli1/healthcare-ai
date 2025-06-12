"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Healthcare St, Medical City, MC 12345",
    dateOfBirth: "1990-01-01",
    bloodType: "O+",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543"
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    toast.success("Profile updated successfully")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="grid gap-2">
                  <Label>Full Name</Label>
                  <Input
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Address</Label>
                  <Input
                    value={editedProfile.address}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      address: e.target.value
                    }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={editedProfile.dateOfBirth}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      dateOfBirth: e.target.value
                    }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Blood Type</Label>
                  <Input
                    value={editedProfile.bloodType}
                    onChange={(e) => setEditedProfile(prev => ({
                      ...prev,
                      bloodType: e.target.value
                    }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditedProfile(profile)
                      setIsEditing(false)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <span>{profile.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>{profile.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span>{profile.dateOfBirth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Blood Type:</span>
                    <span>{profile.bloodType}</span>
                  </div>
                </div>
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500" />
                <span>{profile.emergencyContact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-500" />
                <span>{profile.emergencyPhone}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 