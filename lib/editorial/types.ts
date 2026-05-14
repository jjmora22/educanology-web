export type EditorialCategory =
  | "ia-na-educacao"
  | "politica-municipal"
  | "laboratorios"
  | "estrategia"
  | "financiamento";

export type EditorialStatus =
  | "idea"
  | "researched"
  | "proposed"
  | "selected"
  | "draft"
  | "pending_review"
  | "approved"
  | "scheduled"
  | "published"
  | "rejected";

export type EditorialWorkingDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export type EditorialVoice = "Daniel" | "Juan Jose" | "combined";

export type EditorialReviewer = "Daniel" | "Juan Jose";

export type EditorialSourceType =
  | "official"
  | "institutional"
  | "funding_portal"
  | "research"
  | "news"
  | "other";

export type EditorialSourceConfidence = "high" | "medium" | "low";

export type EditorialSource = {
  title: string;
  url: string;
  publisher?: string;
  publishedAt?: string;
  sourceType: EditorialSourceType;
  confidence: EditorialSourceConfidence;
  requiresHumanVerification: boolean;
  confirmedFacts: string[];
  notes?: string;
};

export type EditorialImage = {
  id: string;
  contentId: string;
  category: EditorialCategory;
  concept: string;
  prompt: string;
  negativePrompt: string;
  blogHeroFormat: "16:9";
  linkedInFormat: "1.91:1" | "1:1" | "4:5";
  altText: string;
  visualCategoryStyle: string;
  generatedImageUrl?: string;
  linkedInImageUrl?: string;
  approvalStatus: "draft" | "pending_review" | "approved" | "rejected";
  reviewer?: EditorialReviewer;
  notes?: string;
};

export type LinkedInDraft = {
  hook: string;
  mainText: string;
  cta: string;
  hashtags: string[];
  suggestedFirstComment?: string;
  blogLink?: string;
  imageReference?: string;
};

export type PublicationChannelStatus =
  | "not_planned"
  | "draft"
  | "approved"
  | "scheduled"
  | "published";

export type PublicationChannels = {
  blog: {
    status: PublicationChannelStatus;
    url?: string;
    publishedAt?: string;
  };
  linkedIn: {
    status: PublicationChannelStatus;
    url?: string;
    publishedAt?: string;
  };
};

export type EditorialContent = {
  id: string;
  status: EditorialStatus;
  category: EditorialCategory;
  workingDay: EditorialWorkingDay;
  title: string;
  slug?: string;
  summary: string;
  angle: string;
  mainVoice: EditorialVoice;
  reviewer?: EditorialReviewer;
  sources: EditorialSource[];
  confirmedFacts: string[];
  interpretation: string[];
  blogDraft?: string;
  linkedInDraft?: LinkedInDraft;
  visualBrief?: EditorialImage;
  publicationChannels: PublicationChannels;
  createdAt: string;
  updatedAt: string;
  scheduledFor?: string;
  publishedAt?: string;
};
