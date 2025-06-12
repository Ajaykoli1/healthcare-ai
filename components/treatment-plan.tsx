"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "lucide-react"
import { toast } from "sonner"

// Comprehensive disease-cure mapping
const diseaseCures: { [key: string]: string } = {
  // Infectious Diseases
  "common cold": "Symptoms: Sneezing, sore throat, runny nose. Treatment: Rest, fluids, OTC decongestants",
  "flu": "Symptoms: Fever, chills, body aches, cough. Treatment: Antiviral drugs, rest, fluids",
  "covid-19": "Symptoms: Fever, cough, loss of taste/smell. Treatment: Isolation, rest, antivirals (if prescribed)",
  "tuberculosis": "Symptoms: Persistent cough, weight loss, night sweats. Treatment: Long-term antibiotics (6–9 months)",
  "malaria": "Symptoms: Fever, chills, vomiting. Treatment: Antimalarial drugs",
  "typhoid": "Symptoms: High fever, weakness, abdominal pain. Treatment: Antibiotics, hydration",
  "dengue": "Symptoms: High fever, severe headache, rash. Treatment: Rest, fluids, pain relievers (no aspirin)",
  "hepatitis a": "Symptoms: Fatigue, jaundice, abdominal pain. Treatment: Supportive care, rest",
  "hepatitis b": "Symptoms: Fatigue, jaundice, abdominal pain. Treatment: Antivirals, supportive care",
  "hepatitis c": "Symptoms: Fatigue, jaundice, abdominal pain. Treatment: Antivirals, supportive care",
  "chickenpox": "Symptoms: Itchy rash, fever, tiredness. Treatment: Antihistamines, calamine lotion, vaccine prevention",
  "measles": "Symptoms: Rash, cough, runny nose, fever. Treatment: Supportive care, vaccination",

  // Respiratory Diseases
  "asthma": "Symptoms: Wheezing, shortness of breath. Treatment: Inhalers, avoid triggers",
  "bronchitis": "Symptoms: Cough with mucus, fatigue. Treatment: Cough suppressants, fluids",
  "pneumonia": "Symptoms: Chest pain, fever, difficulty breathing. Treatment: Antibiotics, hospitalization (if severe)",
  "copd": "Symptoms: Chronic cough, breathlessness. Treatment: Bronchodilators, oxygen therapy",
  "sinusitis": "Symptoms: Facial pain, nasal congestion. Treatment: Decongestants, saline spray",

  // Cardiovascular Diseases
  "hypertension": "Symptoms: Often none, headaches. Treatment: Lifestyle change, antihypertensives",
  "heart attack": "Symptoms: Chest pain, shortness of breath, nausea. Treatment: Emergency care, surgery, medication",
  "stroke": "Symptoms: Paralysis, slurred speech, confusion. Treatment: Clot-busting drugs, rehabilitation",
  "atherosclerosis": "Symptoms: None early; chest pain later. Treatment: Diet, exercise, statins",
  "arrhythmia": "Symptoms: Irregular heartbeat, dizziness. Treatment: Medications, pacemaker",

  // Neurological Diseases
  "migraine": "Symptoms: Severe headache, nausea, sensitivity to light. Treatment: Painkillers, preventive meds",
  "epilepsy": "Symptoms: Seizures, unconsciousness. Treatment: Anti-seizure medication",
  "parkinson's": "Symptoms: Tremors, stiffness, balance problems. Treatment: Medications, physical therapy",
  "alzheimer's": "Symptoms: Memory loss, confusion. Treatment: Medications to slow progression",
  "meningitis": "Symptoms: Stiff neck, headache, fever. Treatment: Antibiotics, hospitalization",

  // Endocrine Diseases
  "diabetes type 1": "Symptoms: Frequent urination, thirst, weight loss. Treatment: Insulin, diet management",
  "diabetes type 2": "Symptoms: Frequent urination, thirst, weight loss. Treatment: Diet, medications, exercise",
  "hyperthyroidism": "Symptoms: Weight loss, fast heartbeat. Treatment: Anti-thyroid meds, surgery",
  "hypothyroidism": "Symptoms: Fatigue, weight gain. Treatment: Thyroid hormone replacement",
  "pcos": "Symptoms: Irregular periods, weight gain. Treatment: Hormonal therapy, lifestyle changes",
  "cushing's syndrome": "Symptoms: Weight gain, round face. Treatment: Surgery, medications",

  // Digestive Disorders
  "gastritis": "Symptoms: Stomach pain, bloating, nausea. Treatment: Antacids, antibiotics",
  "peptic ulcer": "Symptoms: Burning stomach pain. Treatment: Antacids, antibiotics",
  "ibs": "Symptoms: Cramping, bloating, diarrhea. Treatment: Diet changes, stress management",
  "gallstones": "Symptoms: Upper abdominal pain. Treatment: Surgery (gallbladder removal)",
  "liver cirrhosis": "Symptoms: Fatigue, jaundice. Treatment: Medication, transplant (severe)",

  // Skin Diseases
  "eczema": "Symptoms: Itchy, dry, inflamed skin. Treatment: Moisturizers, corticosteroids",
  "psoriasis": "Symptoms: Red patches, silvery scales. Treatment: Topical treatments, phototherapy",
  "acne": "Symptoms: Pimples, blackheads. Treatment: Cleansers, antibiotics",
  "ringworm": "Symptoms: Circular, itchy rash. Treatment: Antifungal cream",
  "scabies": "Symptoms: Intense itching, rash. Treatment: Prescription creams",

  // Urinary & Reproductive Diseases
  "uti": "Symptoms: Painful urination, urgency. Treatment: Antibiotics",
  "kidney stones": "Symptoms: Severe pain, blood in urine. Treatment: Painkillers, surgery (if large)",
  "prostatitis": "Symptoms: Pelvic pain, urination problems. Treatment: Antibiotics",
  "endometriosis": "Symptoms: Pelvic pain, heavy periods. Treatment: Hormone therapy, surgery",
  "menstrual disorders": "Symptoms: Irregular, painful periods. Treatment: Pain relief, hormone regulation",

  // Musculoskeletal Diseases
  "arthritis": "Symptoms: Joint pain, stiffness. Treatment: Anti-inflammatory drugs, physical therapy",
  "osteoporosis": "Symptoms: Bone fractures, back pain. Treatment: Calcium, Vitamin D, bisphosphonates",
  "gout": "Symptoms: Sudden joint pain (esp. big toe). Treatment: NSAIDs, diet control",
  "back pain": "Symptoms: Pain in lower/upper back. Treatment: Painkillers, physiotherapy",
  "tendonitis": "Symptoms: Swelling, joint pain. Treatment: Rest, ice, pain relief"
}

export function TreatmentPlan() {
  const [currentDay, setCurrentDay] = useState(1)
  const [disease, setDisease] = useState("")
  const [cure, setCure] = useState("")

  const handleGenerateCure = () => {
    if (!disease.trim()) {
      toast.error("Please enter a disease")
      return
    }

    const lowerCaseDisease = disease.toLowerCase()
    const cure = diseaseCures[lowerCaseDisease]

    if (cure) {
      setCure(cure)
      toast.success("Treatment plan generated!")
    } else {
      toast.error("Sorry, we don't have treatment information for this disease yet")
      setCure("")
    }
  }

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
            <label className="text-sm font-medium">Enter Disease</label>
            <Textarea
              placeholder="Enter the disease name..."
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleGenerateCure}>
            <Calendar className="mr-2 h-4 w-4" />
            Generate Treatment Plan
          </Button>
          {cure && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Recommended Treatment</h3>
              <p className="text-gray-600">{cure}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

