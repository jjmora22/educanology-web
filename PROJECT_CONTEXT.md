# Educanology Web – Project Context

## 1. Project Purpose

This repository contains the public website for Educanology, a Portugal-based education consulting company focused on educational strategy, public policy, responsible AI in education, active learning, teacher training, FabLabs, MakerSpaces, school modernization and fundable education projects.

The website presents Educanology’s institutional positioning, services, editorial content, legal pages, contact options and virtual educational agent.

Educanology’s positioning is:

- Education
- AI
- Policy

The site should communicate credibility, strategic depth and practical transformation capacity for municipalities, schools, governments, foundations, training centres and organizations.

## 2. Current Stack

The project uses:

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- Vercel for deployment
- GitHub for version control
- LocalStorage-based cookie consent
- Static blog data stored in TypeScript
- Virtual agent connected through `/api/chat`

The project is deployed through Vercel. The production branch is `main`.

Feature work should be developed in separate branches and merged through Pull Requests.

## 3. Main Folder Structure

```text
app/
  page.tsx
  blog/
    page.tsx
    [slug]/
      page.tsx
    categoria/
      [category]/
        page.tsx
  aviso-legal/
    page.tsx
  politica-de-privacidade/
    page.tsx
  politica-de-cookies/
    page.tsx
  termos-de-utilizacao/
    page.tsx
  api/
    chat/
      route.ts

components/
  CookieConsent.tsx
  EducanologyAgent.tsx
  FloatingConversion.tsx
  SiteHeader.tsx
  SiteFooter.tsx

lib/
  blog/
    posts.ts

knowledge/
  educanology-base.md

public/
  images/
```

## 4. Key Components

### `components/SiteHeader.tsx`

Shared site header used by the homepage and blog pages.

Navigation should work from both the homepage and internal pages. Use absolute anchor links when needed:

- `/#desafio`
- `/#transformacao`
- `/#municipios`
- `/#ia`
- `/#metodo`
- `/#financiamento`
- `/#especialistas`
- `/blog`

The header should remain visually consistent across the site and must be usable on mobile.

### `components/SiteFooter.tsx`

Shared footer used across blog pages and, where appropriate, the homepage.

Footer links should include legal pages and institutional navigation.

### `components/CookieConsent.tsx`

Cookie consent component.

Cookie preferences are stored in the browser using `localStorage`, under the key:

```text
educanology-cookie-consent
```

Current preference structure:

```ts
{
  necessary: true,
  analytics: boolean,
  functional: boolean,
  marketing: boolean
}
```

Non-essential cookies, analytics scripts and marketing tools must not be loaded before the user gives consent.

### `components/EducanologyAgent.tsx`

Virtual educational agent.

The agent helps orient and qualify opportunities related to:

- Educational consulting
- AI in education
- Active learning
- Teacher training
- FabLabs
- MakerSpaces
- School modernization
- Fundable education projects

The agent is informational only.

It does not replace formal consulting, does not assume commercial commitments and must not be treated as binding legal, financial, technical or institutional advice.

The agent displays a confidentiality warning:

```text
O agente orienta e qualifica oportunidades.
Não substitui uma consultoria formal nem assume compromissos comerciais.
Por favor, não introduza informação sensível, confidencial
ou dados pessoais desnecessários.
```

### `components/FloatingConversion.tsx`

Shared floating conversion component.

It includes:

- Educanology virtual agent
- 45-minute meeting call-to-action button

The mobile experience must avoid clutter and must not overlap with the cookie consent interface.

## 5. Blog Structure

The blog is currently static and based on local TypeScript data in:

```text
lib/blog/posts.ts
```

The blog includes:

```text
/blog
/blog/[slug]
/blog/categoria/[category]
```

Blog content should be serious, institutional and useful. Avoid generic filler content.

## 6. Editorial Categories

The blog is structured around five strategic editorial channels:

### 1. IA na Educação

Responsible AI in education, school AI adoption, teacher support, learning personalization, AI governance and safe implementation.

Category slug:

```text
ia-na-educacao
```

### 2. Política Municipal

Municipal education policy, lifelong learning, local education ecosystems, public strategy and territorial learning.

Category slug:

```text
politica-municipal
```

### 3. Laboratórios

STEAM labs, FabLabs, MakerSpaces, educational technology infrastructure, project-based learning and purposeful equipment deployment.

Category slug:

```text
laboratorios
```

### 4. Estratégia

Educational transformation, implementation strategy, change management, digital transition and measurable impact.

Category slug:

```text
estrategia
```

### 5. Financiamento

European funding, municipal education projects, fundable strategies, proposal preparation and investment logic.

Category slug:

```text
financiamento
```

## 7. Blog Post Data Model

Blog posts should include, where possible:

```ts
type BlogPost = {
  title: string;
  slug: string;
  date: string;
  category: string;
  categorySlug: string;
  summary: string;
  readingTime: string;
  coverImage: string;
  coverAlt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
  faq?: {
    question: string;
    answer: string;
  }[];
  linkedInDraft?: string;
};
```

The `linkedInDraft` field is for internal use only and should not be displayed publicly unless explicitly requested.

## 8. Editorial Tone

Primary language: Portuguese from Portugal.

Tone:

- Institutional
- Strategic
- Clear
- Practical
- Credible
- Public-sector friendly
- Suitable for municipalities, schools, governments and foundations

Avoid:

- Overly promotional language
- Unsupported claims
- Invented funding calls, deadlines or legal statements
- Brazilian Portuguese wording when European Portuguese is expected
- Excessive jargon
- AI hype without practical implementation logic

## 9. Legal and Privacy Rules

The website includes:

- Legal notice
- Privacy policy
- Cookie policy
- Terms of use

Any changes involving privacy, cookies, analytics, user data or the virtual agent must respect these rules:

1. Do not collect unnecessary personal data.
2. Do not ask users to provide sensitive, confidential or unnecessary personal information.
3. Do not load analytics or marketing scripts before consent.
4. Do not expose API keys or secrets in frontend code.
5. Do not send more user data than necessary to external AI providers.
6. Do not make the virtual agent assume legal, financial, technical or commercial commitments.
7. Do not publish or send anything automatically without human approval.

## 10. AI Agent Rules

The virtual agent may:

- Orient users
- Qualify opportunities
- Explain Educanology’s areas of work
- Ask for basic contact details when needed
- Prepare a contact request
- Suggest next steps

The virtual agent must not:

- Promise services
- Confirm pricing
- Accept contracts
- Provide binding legal or financial advice
- Ask for sensitive data
- Store unnecessary information
- Publish content automatically
- Send LinkedIn posts automatically
- Create institutional commitments on behalf of Educanology

## 11. Future Editorial Agent

The planned editorial agent should support the following workflow:

```text
Topic selection
↓
Draft article generation
↓
LinkedIn draft generation
↓
Human review
↓
Approval
↓
Publication
↓
Optional LinkedIn publication after approval
```

The target editorial rhythm is one article per working day, Monday to Friday, rotating through the five editorial categories:

```text
Monday: IA na Educação
Tuesday: Política Municipal
Wednesday: Laboratórios
Thursday: Estratégia
Friday: Financiamento
```

Publication must require approval by Daniel or Juan José before going live.

## 12. SEO and AI Discoverability

Every public page and blog article should aim for:

- Clear title
- Clear meta description
- Proper heading hierarchy
- Descriptive URLs
- Category links
- Internal links
- Useful summary
- FAQ when appropriate
- Open Graph metadata
- Images with meaningful alt text
- No keyword stuffing

Future technical improvements may include:

```text
app/sitemap.ts
app/robots.ts
public/llms.txt
Google Analytics 4 with consent-based loading
metadataBase in app/layout.tsx
```

## 13. Development Rules

When using Codex, Claude or any coding agent:

1. Work in a feature branch.
2. Explain the intended change before modifying files.
3. Keep changes minimal and focused.
4. Do not modify unrelated files.
5. Avoid large refactors unless explicitly requested.
6. Do not add dependencies without approval.
7. Do not modify legal text without explicit instruction.
8. Do not modify cookie consent logic without explicit instruction.
9. Do not change production configuration without approval.
10. Run or request `npm run build` after meaningful changes.
11. Summarize all files created or modified.

Preferred workflow:

```bash
git checkout main
git pull
git checkout -b feature/name-of-change
```

After implementation:

```bash
npm run build
git status
git diff --stat
git add <specific files>
git commit -m "Clear commit message"
git push -u origin feature/name-of-change
```

Then open a Pull Request:

```text
base: main
compare: feature/name-of-change
```

## 14. Production and Deployment

Production is deployed from:

```text
main
```

Feature branches generate Vercel Preview deployments.

Do not merge into `main` until:

- The build passes
- The preview has been reviewed
- Mobile layout has been checked
- No obvious visual issues remain
- The user approves the change

## 15. Current Next Priorities

The next likely priorities are:

1. Add `metadataBase` in `app/layout.tsx`.
2. Add `app/sitemap.ts`.
3. Add `app/robots.ts`.
4. Consider `public/llms.txt`.
5. Implement Google Analytics 4 with consent-based loading.
6. Improve the editorial workflow for blog posts.
7. Build a human-approved editorial agent.
8. Prepare LinkedIn draft generation for approved posts.