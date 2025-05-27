"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function TreatmentPage() {
  const [progress, setProgress] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateProgress = async () => {
    if (!progress.trim()) {
      toast.error("Please enter your progress update")
      return
    }

    setIsUpdating(true)
    try {
      // Simulate progress update
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Progress updated successfully!")
      setProgress("")
    } catch (error) {
      toast.error("Failed to update progress")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Treatment Recommendations</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Treatment Plan</CardTitle>
            <CardDescription>
              View and manage your personalized treatment recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Current Medications</h3>
                <p className="text-gray-600">No medications prescribed yet</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Recommended Actions</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Schedule follow-up appointment</li>
                  <li>Complete recommended tests</li>
                  <li>Review lifestyle modifications</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Progress Tracking</h3>
                <div className="space-y-4">
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Enter your progress update..."
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                  />
                  <button 
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleUpdateProgress}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update Progress"}
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 