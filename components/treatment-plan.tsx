"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"

export function TreatmentPlan() {
  const [currentDay, setCurrentDay] = useState(1)
  const [symptoms, setSymptoms] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Treatment Plan - Day {currentDay}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Select Treatment Day</label>
            <Select value={currentDay.toString()} onValueChange={(value) => setCurrentDay(Number.parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Day 1</SelectItem>
                <SelectItem value="2">Day 2</SelectItem>
                <SelectItem value="3">Day 3</SelectItem>
                <SelectItem value="4">Day 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Describe Symptoms</label>
            <Textarea
              placeholder="Enter your symptoms..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </div>
          <Button className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            Generate Treatment Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

