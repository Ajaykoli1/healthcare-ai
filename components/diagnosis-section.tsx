"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon, Loader2, Stethoscope } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

// Sample symptom-disease mapping (in a real app, this would come from an AI model)
const symptomAnalysis: { [key: string]: { probability: number; recommendations: string[] } } = {
  "fever,cough,fatigue": {
    probability: 0.85,
    recommendations: ["COVID-19", "Flu", "Common Cold"]
  },
  "headache,nausea,sensitivity to light": {
    probability: 0.90,
    recommendations: ["Migraine", "Tension Headache"]
  },
  "chest pain,shortness of breath": {
    probability: 0.95,
    recommendations: ["Heart Attack", "Angina", "Anxiety"]
  },
  "abdominal pain,nausea,vomiting": {
    probability: 0.80,
    recommendations: ["Gastritis", "Food Poisoning", "Appendicitis"]
  },
  "joint pain,stiffness,fatigue": {
    probability: 0.85,
    recommendations: ["Arthritis", "Fibromyalgia", "Lupus"]
  }
}

export function DiagnosisSection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [symptoms, setSymptoms] = useState("")
  const [severity, setSeverity] = useState("")
  const [duration, setDuration] = useState("")
  const [analysis, setAnalysis] = useState<{ probability: number; recommendations: string[] } | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      toast.error("Please describe your symptoms")
      return
    }

    setIsAnalyzing(true)
    try {
      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Normalize symptoms for analysis
      const normalizedSymptoms = symptoms.toLowerCase().replace(/\s+/g, '')
      const result = symptomAnalysis[normalizedSymptoms] || {
        probability: 0.6,
        recommendations: ["Please consult a healthcare professional for accurate diagnosis"]
      }
      
      setAnalysis(result)
      toast.success("Analysis complete!")
    } catch (error) {
      toast.error("Failed to analyze symptoms")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Assisted Diagnosis</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="symptoms">Describe Your Symptoms</Label>
            <Textarea
              id="symptoms"
              placeholder="Enter your symptoms (e.g., fever, cough, headache)..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="severity">Symptom Severity</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">Hours</SelectItem>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="weeks">Weeks</SelectItem>
                  <SelectItem value="months">Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Upload Medical Image (Optional)</Label>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <Label
                  htmlFor="image"
                  className="flex h-32 w-full cursor-pointer items-center justify-center rounded-md border border-dashed"
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected medical image"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Upload className="h-8 w-8" />
                      <span>Upload Image</span>
                    </div>
                  )}
                </Label>
              </div>
            </div>
          </div>

          <Button onClick={analyzeSymptoms} disabled={isAnalyzing || !symptoms.trim()}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Stethoscope className="mr-2 h-4 w-4" />
                Analyze Symptoms
              </>
            )}
          </Button>

          {analysis && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold mb-2">AI Analysis Results</h3>
                <p className="text-gray-600">
                  Confidence Level: {(analysis.probability * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Possible Conditions</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {analysis.recommendations.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
              <div className="text-sm text-gray-500">
                Note: This is an AI-assisted analysis. Please consult a healthcare professional for accurate diagnosis.
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

