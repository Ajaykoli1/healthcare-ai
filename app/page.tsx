import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DiagnosisSection } from "@/components/diagnosis-section"
import { TreatmentPlan } from "@/components/treatment-plan"
import { FeedbackSection } from "@/components/feedback-section"

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader heading="AI Healthcare Assistant" text="AI-powered diagnosis and treatment recommendations" />
      <div className="grid gap-8">
        <DiagnosisSection />
        <TreatmentPlan />
        <FeedbackSection />
      </div>
    </DashboardShell>
  )
}

