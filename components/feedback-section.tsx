"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function FeedbackSection() {
  const [rating, setRating] = useState("")
  const [feedback, setFeedback] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle feedback submission
    console.log({ rating, feedback })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Treatment Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Treatment Effectiveness</label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger>
                <SelectValue placeholder="Rate the treatment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Not Effective</SelectItem>
                <SelectItem value="2">Slightly Effective</SelectItem>
                <SelectItem value="3">Moderately Effective</SelectItem>
                <SelectItem value="4">Very Effective</SelectItem>
                <SelectItem value="5">Extremely Effective</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">Additional Comments</label>
            <Textarea
              placeholder="Share your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <Button type="submit">Submit Feedback</Button>
        </form>
      </CardContent>
    </Card>
  )
}

