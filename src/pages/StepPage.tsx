import { useState } from "react";
import ExStep from "@/lib/components/Step/ExStep";
import ExButton from "@/lib/components/Button/ExButton";
import type { ExStepItem } from "@/lib/components/Step/types/ExStepType";
import PageContent from "@/shared/documentation/PageContent";

const steps: ExStepItem[] = [
  { id: "workspace", title: "Workspace", description: "Set your organization name and region." },
  { id: "members", title: "Team members", description: "Invite colleagues and assign their roles." },
  { id: "security", title: "Security", description: "Review access and authentication settings." },
  { id: "review", title: "Review & launch", description: "Confirm your setup before activation." },
];

export default function StepPage() {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <PageContent
      section={[
        { name: "Interactive workflow", link: "#workflow" },
        { name: "Vertical & error", link: "#vertical" },
      ]}>
      <div className="min-w-0 space-y-10 text-foreground">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest">Workflow components</p>
          <h1 className="text-3xl font-semibold">Steps</h1>
          <p>Guide users through a process with clear progress, descriptions, and actionable states.</p>
        </header>
        <section id="workflow" className="section-anchor space-y-5">
          <h2 id="setup-heading" className="text-xl font-semibold">
            Workspace setup
          </h2>
          <ExStep color="secondary" steps={steps} activeStep={activeStep} onStepChange={setActiveStep} aria-labelledby="setup-heading" />
          <div className="space-y-4 rounded-xl border border-border bg-surface p-5">
            <p role="status" aria-atomic="true" className="font-semibold">
              {activeStep === steps.length ? "Setup complete" : `Step ${activeStep + 1} of ${steps.length}: ${steps[activeStep].title}`}
            </p>
            <p className="text-sm">This preview changes the current step only. Your application owns the form data and validation.</p>
            <div className="flex flex-wrap gap-2">
              <ExButton
                variant="outline"
                color="secondary"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((value) => Math.max(0, value - 1))}>
                Back
              </ExButton>
              {activeStep < steps.length ? (
                <ExButton onClick={() => setActiveStep((value) => Math.min(steps.length, value + 1))}>
                  {activeStep === steps.length - 1 ? "Complete setup" : "Continue"}
                </ExButton>
              ) : (
                <ExButton onClick={() => setActiveStep(0)}>Start again</ExButton>
              )}
            </div>
          </div>
        </section>
        <section id="vertical" className="section-anchor max-w-lg space-y-5">
          <h2 id="approval-heading" className="text-xl font-semibold">
            Approval workflow
          </h2>
          <ExStep
            size="sm"
            orientation="vertical"
            activeStep={1}
            aria-labelledby="approval-heading"
            steps={[
              { id: "submitted", title: "Request submitted", description: "The request has been recorded." },
              {
                id: "verification",
                title: "Verify supporting documents",
                description: "A required document is missing. Update it before proceeding.",
                error: true,
              },
              { id: "approval", title: "Final approval", description: "Available after verification.", disabled: true },
            ]}
          />
        </section>
      </div>
    </PageContent>
  );
}
