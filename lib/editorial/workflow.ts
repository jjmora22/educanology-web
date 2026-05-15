import type {
  EditorialCategory,
  EditorialReviewer,
  EditorialStatus,
  EditorialWorkingDay,
} from "@/lib/editorial/types";
import type { TopicProposalBatch } from "@/lib/editorial/topicProposals";

export type GuidedWorkflowStep =
  | "determineCategory"
  | "discoverTopics"
  | "validateSources"
  | "proposeTopics"
  | "humanSelectsTopic"
  | "generateDraftPackage"
  | "review"
  | "approve"
  | "publishBlog"
  | "prepareLinkedIn";

export type GuidedWorkflowApprovalStatus =
  | "not_started"
  | "pending_human_selection"
  | "pending_review"
  | "approved"
  | "rejected";

export type GuidedWorkflowReference = {
  id: string;
  path?: string;
  status?: string;
};

export type GuidedEditorialWorkflow = {
  id: string;
  weekday: EditorialWorkingDay;
  category: EditorialCategory;
  currentStep: GuidedWorkflowStep;
  steps: GuidedWorkflowStep[];
  topicProposalBatch?: GuidedWorkflowReference;
  selectedProposal?: GuidedWorkflowReference;
  draftPackage?: GuidedWorkflowReference;
  reviewer?: EditorialReviewer;
  approvalStatus: GuidedWorkflowApprovalStatus;
  nextAction: string;
  createdAt: string;
  updatedAt: string;
};

export const guidedWorkflowSteps: GuidedWorkflowStep[] = [
  "determineCategory",
  "discoverTopics",
  "validateSources",
  "proposeTopics",
  "humanSelectsTopic",
  "generateDraftPackage",
  "review",
  "approve",
  "publishBlog",
  "prepareLinkedIn",
];

export const weekdayCategoryMap: Record<
  EditorialWorkingDay,
  EditorialCategory
> = {
  monday: "ia-na-educacao",
  tuesday: "politica-municipal",
  wednesday: "laboratorios",
  thursday: "estrategia",
  friday: "financiamento",
};

export function getEditorialCategoryForWeekday(
  weekday: EditorialWorkingDay
): EditorialCategory {
  return weekdayCategoryMap[weekday];
}

export function getWorkflowStepIndex(step: GuidedWorkflowStep) {
  return guidedWorkflowSteps.indexOf(step);
}

export function getNextWorkflowStep(
  currentStep: GuidedWorkflowStep
): GuidedWorkflowStep | undefined {
  const currentIndex = getWorkflowStepIndex(currentStep);
  return guidedWorkflowSteps[currentIndex + 1];
}

export function createInitialWorkflow(params: {
  id: string;
  weekday: EditorialWorkingDay;
  createdAt: string;
  reviewer?: EditorialReviewer;
}): GuidedEditorialWorkflow {
  const category = getEditorialCategoryForWeekday(params.weekday);

  return {
    id: params.id,
    weekday: params.weekday,
    category,
    currentStep: "determineCategory",
    steps: guidedWorkflowSteps,
    reviewer: params.reviewer,
    approvalStatus: "not_started",
    nextAction:
      "Confirmar a linha editorial do dia e iniciar descoberta de tópicos com fontes verificáveis.",
    createdAt: params.createdAt,
    updatedAt: params.createdAt,
  };
}

export function attachTopicProposalBatch(
  workflow: GuidedEditorialWorkflow,
  batch: TopicProposalBatch,
  path?: string
): GuidedEditorialWorkflow {
  return {
    ...workflow,
    currentStep: "humanSelectsTopic",
    topicProposalBatch: {
      id: batch.id,
      path,
      status: batch.status,
    },
    approvalStatus: "pending_human_selection",
    nextAction:
      "Aguardar seleção humana do tópico e do ângulo editorial antes de gerar o rascunho final.",
    updatedAt: batch.generatedAt,
  };
}

export function mapWorkflowStatusToEditorialStatus(
  workflow: GuidedEditorialWorkflow
): EditorialStatus {
  if (workflow.approvalStatus === "approved") return "approved";
  if (workflow.approvalStatus === "rejected") return "rejected";

  if (workflow.currentStep === "review") return "pending_review";
  if (workflow.currentStep === "generateDraftPackage") return "draft";
  if (workflow.currentStep === "humanSelectsTopic") return "proposed";

  return "idea";
}
