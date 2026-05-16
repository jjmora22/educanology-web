import type { EditorialCategory, EditorialStatus, PublicationChannels } from "./types";

export type EditorialContentDecision =
  | "new_article"
  | "update_existing"
  | "follow_up"
  | "correction"
  | "linkedin_only"
  | "reject_duplicate";

export type EditorialDuplicationRisk = "low" | "medium" | "high";

export type EditorialUpdateRecommendation = {
  action: EditorialContentDecision;
  reason: string;
  targetContentId?: string;
  requiresHumanReview: boolean;
};

export type EditorialContentRelation = {
  contentId: string;
  relation:
    | "same_topic"
    | "related_topic"
    | "follow_up_to"
    | "updates"
    | "corrects"
    | "source_overlap";
  notes?: string;
};

export type EditorialIndexEntry = {
  id: string;
  title: string;
  slug?: string;
  category: EditorialCategory;
  status: EditorialStatus;
  publicationChannels: PublicationChannels;
  publishedAt?: string;
  lastUpdatedAt?: string;
  summary: string;
  mainTopic: string;
  subtopics: string[];
  keywords: string[];
  sourceUrls: string[];
  relatedContent: EditorialContentRelation[];
  updatePolicy: {
    reviewFrequency: "monthly" | "quarterly" | "twice_yearly" | "yearly" | "as_needed";
    updateTriggers: string[];
    notes?: string;
  };
  duplicationRisk: EditorialDuplicationRisk;
  recommendedAction: EditorialUpdateRecommendation;
};

export type EditorialIndex = {
  version: string;
  updatedAt: string;
  purpose: string;
  entries: EditorialIndexEntry[];
};

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateKeywordOverlap(
  sourceKeywords: string[],
  targetKeywords: string[]
): number {
  const source = new Set(sourceKeywords.map(normalizeText).filter(Boolean));
  const target = new Set(targetKeywords.map(normalizeText).filter(Boolean));

  if (source.size === 0 || target.size === 0) return 0;

  let matches = 0;

  for (const keyword of source) {
    if (target.has(keyword)) matches += 1;
  }

  return matches / Math.min(source.size, target.size);
}

export function suggestEditorialAction(args: {
  keywordOverlap: number;
  hasNewSourceOrPolicyUpdate?: boolean;
  hasDistinctAngleOrAudience?: boolean;
  correctsExistingClaim?: boolean;
  enoughSubstanceForArticle?: boolean;
  targetContentId?: string;
}): EditorialUpdateRecommendation {
  if (args.correctsExistingClaim) {
    return {
      action: "correction",
      reason: "A proposta corrige ou clarifica conteúdo existente.",
      targetContentId: args.targetContentId,
      requiresHumanReview: true,
    };
  }

  if (args.keywordOverlap >= 0.75 && !args.hasNewSourceOrPolicyUpdate) {
    return {
      action: "reject_duplicate",
      reason:
        "A proposta tem elevada sobreposição temática e não acrescenta fonte, atualização ou ângulo substancial.",
      targetContentId: args.targetContentId,
      requiresHumanReview: true,
    };
  }

  if (args.keywordOverlap >= 0.5 && args.hasNewSourceOrPolicyUpdate) {
    return {
      action: "update_existing",
      reason:
        "A proposta sobrepõe-se a conteúdo existente, mas acrescenta informação, fonte ou implicação prática nova.",
      targetContentId: args.targetContentId,
      requiresHumanReview: true,
    };
  }

  if (args.keywordOverlap >= 0.35 && args.hasDistinctAngleOrAudience) {
    return {
      action: "follow_up",
      reason:
        "A proposta está relacionada com conteúdo existente, mas tem ângulo ou público suficientemente distinto.",
      targetContentId: args.targetContentId,
      requiresHumanReview: true,
    };
  }

  if (args.enoughSubstanceForArticle === false) {
    return {
      action: "linkedin_only",
      reason:
        "A proposta é útil para comunicação, mas ainda não tem profundidade suficiente para artigo completo.",
      requiresHumanReview: true,
    };
  }

  return {
    action: "new_article",
    reason: "A proposta parece ter tema próprio e substância suficiente para artigo.",
    requiresHumanReview: true,
  };
}
