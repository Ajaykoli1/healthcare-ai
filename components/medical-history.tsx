"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Activity, 
  Pill, 
  AlertTriangle,
  Plus,
  Trash2
} from "lucide-react"
import { toast } from "sonner"

interface MedicalRecord {
  id: string
  date: string
  type: "condition" | "medication" | "allergy" | "procedure"
  title: string
  description: string
  severity?: "mild" | "moderate" | "severe"
  status?: "active" | "resolved"
  dosage?: string
  frequency?: string
  doctor?: string
}

export function MedicalHistory() {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [newRecord, setNewRecord] = useState<Partial<MedicalRecord>>({
    type: "condition",
    severity: "mild",
    status: "active"
  })

  const handleAddRecord = () => {
    if (!newRecord.title || !newRecord.description) {
      toast.error("Please fill in all required fields")
      return
    }

    const record: MedicalRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      title: newRecord.title,
      description: newRecord.description,
      type: newRecord.type as MedicalRecord["type"],
      severity: newRecord.severity,
      status: newRecord.status,
      dosage: newRecord.dosage,
      frequency: newRecord.frequency,
      doctor: newRecord.doctor
    }

    setRecords(prev => [...prev, record])
    setNewRecord({
      type: "condition",
      severity: "mild",
      status: "active"
    })
    toast.success("Medical record added successfully")
  }

  const handleDeleteRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id))
    toast.success("Record deleted successfully")
  }

  const getIcon = (type: MedicalRecord["type"]) => {
    switch (type) {
      case "condition":
        return <Activity className="h-4 w-4" />
      case "medication":
        return <Pill className="h-4 w-4" />
      case "allergy":
        return <AlertTriangle className="h-4 w-4" />
      case "procedure":
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="records" className="space-y-4">
          <TabsList>
            <TabsTrigger value="records">View Records</TabsTrigger>
            <TabsTrigger value="add">Add New Record</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            {records.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No medical records found
              </div>
            ) : (
              <div className="space-y-4">
                {records.map((record) => (
                  <div 
                    key={record.id}
                    className="p-4 bg-gray-50 rounded-lg space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getIcon(record.type)}
                          <h3 className="font-medium">{record.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{record.description}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>Date: {record.date}</span>
                          {record.severity && (
                            <span>Severity: {record.severity}</span>
                          )}
                          {record.status && (
                            <span>Status: {record.status}</span>
                          )}
                          {record.dosage && (
                            <span>Dosage: {record.dosage}</span>
                          )}
                          {record.frequency && (
                            <span>Frequency: {record.frequency}</span>
                          )}
                          {record.doctor && (
                            <span>Doctor: {record.doctor}</span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRecord(record.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Record Type</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newRecord.type}
                  onChange={(e) => setNewRecord(prev => ({
                    ...prev,
                    type: e.target.value as MedicalRecord["type"]
                  }))}
                >
                  <option value="condition">Medical Condition</option>
                  <option value="medication">Medication</option>
                  <option value="allergy">Allergy</option>
                  <option value="procedure">Medical Procedure</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  placeholder="Enter title"
                  value={newRecord.title || ""}
                  onChange={(e) => setNewRecord(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter description"
                  value={newRecord.description || ""}
                  onChange={(e) => setNewRecord(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
              </div>

              {newRecord.type === "condition" && (
                <>
                  <div className="grid gap-2">
                    <Label>Severity</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={newRecord.severity}
                      onChange={(e) => setNewRecord(prev => ({
                        ...prev,
                        severity: e.target.value as MedicalRecord["severity"]
                      }))}
                    >
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={newRecord.status}
                      onChange={(e) => setNewRecord(prev => ({
                        ...prev,
                        status: e.target.value as MedicalRecord["status"]
                      }))}
                    >
                      <option value="active">Active</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </>
              )}

              {newRecord.type === "medication" && (
                <>
                  <div className="grid gap-2">
                    <Label>Dosage</Label>
                    <Input
                      placeholder="Enter dosage"
                      value={newRecord.dosage || ""}
                      onChange={(e) => setNewRecord(prev => ({
                        ...prev,
                        dosage: e.target.value
                      }))}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Frequency</Label>
                    <Input
                      placeholder="Enter frequency"
                      value={newRecord.frequency || ""}
                      onChange={(e) => setNewRecord(prev => ({
                        ...prev,
                        frequency: e.target.value
                      }))}
                    />
                  </div>
                </>
              )}

              <div className="grid gap-2">
                <Label>Doctor</Label>
                <Input
                  placeholder="Enter doctor's name"
                  value={newRecord.doctor || ""}
                  onChange={(e) => setNewRecord(prev => ({
                    ...prev,
                    doctor: e.target.value
                  }))}
                />
              </div>

              <Button onClick={handleAddRecord}>
                <Plus className="mr-2 h-4 w-4" />
                Add Record
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 