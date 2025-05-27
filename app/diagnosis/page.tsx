"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function DiagnosisPage() {
  const [symptoms, setSymptoms] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      toast.error("Please describe your symptoms first")
      return
    }

    setIsAnalyzing(true)
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Analysis complete! Check your treatment recommendations.")
    } catch (error) {
      toast.error("Failed to analyze symptoms")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Diagnosis</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Medical Data</CardTitle>
            <CardDescription>
              Upload your medical reports, images, or describe your symptoms for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Drag and drop files here or click to upload</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Describe your symptoms</label>
                <textarea 
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Please describe your symptoms in detail..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
              <button 
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 