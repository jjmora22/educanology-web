import type {
  EditorialCategory,
  EditorialReviewer,
  EditorialSourceConfidence,
  EditorialSourceType,
  EditorialWorkingDay,
} from "@/lib/editorial/types";

export type TopicProposalStatus =
  | "pending_human_selection"
  | "selected"
  | "rejected"
  | "archived";

export type TopicProposalApprovalDecision =
  | "pending"
  | "approved"
  | "rejected"
  | "needs_revision";

export type TopicProposalSource = {
  title: string;
  url: string;
  publisher?: string;
  sourceType: EditorialSourceType;
  confidence: EditorialSourceConfidence;
  requiresHumanVerification: boolean;
  confirmedFacts: string[];
  notes?: string;
};

export type TopicProposalRecommendation = {
  priority: "high" | "medium" | "low";
  score: number;
  rationale: string;
};

export type TopicProposal = {
  id: string;
  status: TopicProposalStatus;
  title: string;
  category: EditorialCategory;
  workingDay: EditorialWorkingDay;
  whyItMatters: string;
  confirmedFacts: string[];
  interpretation: string[];
  suggestedEducanologyAngle: string;
  recommendedReviewer: EditorialReviewer;
  sources: TopicProposalSource[];
  recommendation: TopicProposalRecommendation;
  approvalDecision: TopicProposalApprovalDecision;
  selected: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TopicProposalBatch = {
  id: string;
  status: "pending_human_selection" | "selected" | "closed";
  category: EditorialCategory;
  workingDay: EditorialWorkingDay;
  generatedAt: string;
  proposals: TopicProposal[];
  recommendedProposalId?: string;
  selectedProposalId?: string;
  notes?: string;
};
