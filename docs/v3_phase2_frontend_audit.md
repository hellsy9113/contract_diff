# V3 Phase 2 Frontend Audit

## Scope

This audit documents the current v2 frontend and Supabase state before adding v3 clause comparison. The existing PDF-based comparison flow must remain intact.

## Current Findings

### 1. Existing upload components

- `src/components/contract/UploadCard.tsx`
- `src/components/contract/FilePreview.tsx`
- `src/components/contract/CompareButton.tsx`
- `src/components/contract/EmptyState.tsx`
- `src/components/contract/LoadingState.tsx`

### 2. Existing compare button/component

- `src/components/contract/CompareButton.tsx`

### 3. Existing hook used for file upload/compare

- Active v2 hook: `src/hooks/useContractCompare.ts`
- Legacy/unused workflow hook: `src/hooks/useContractUpload.ts`

### 4. Existing API route used to call the Python engine

- Browser does not call a Next.js compare proxy yet.
- v2 browser flow calls Python directly through `src/lib/contractEngine.ts`.
- Placeholder Next.js route exists at `src/app/api/compare/route.ts` but currently returns `501`.

### 5. Existing v2 PDF download/render behavior

- `src/lib/contractEngine.ts` posts both PDFs to the engine `/compare` endpoint and expects an annotated PDF blob.
- `src/hooks/useContractCompare.ts` converts the PDF blob into an object URL.
- `src/components/contract/PdfResultViewer.tsx` renders the PDF in an iframe and exposes download/open actions.
- `src/app/(dashboard)/dashboard/page.tsx` orchestrates the current upload-to-PDF workflow.

### 6. Existing auth/session handling

- Auth middleware gate: `src/middleware.ts`
- Public auth pages and callback flow:
  - `src/app/(public)/login/page.tsx`
  - `src/app/(public)/signup/page.tsx`
  - `src/app/(public)/forgot-password/page.tsx`
  - `src/app/(public)/reset-password/page.tsx`
  - `src/app/(public)/auth/callback/route.ts`
- Auth APIs:
  - `src/app/api/(auth)/login/route.ts`
  - `src/app/api/(auth)/signup/route.ts`
  - `src/app/api/(auth)/callback/route.ts`
  - `src/app/api/modify/route.ts`

### 7. Existing Supabase client/server setup

- Browser client: `src/lib/supabase/client.ts`
- Server cookie client: `src/lib/supabase/server.ts`
- Middleware cookie client: `src/lib/supabase/middleware.ts`
- Service-role admin client: `src/lib/supabaseAdmin.ts`

### 8. Existing database tables related to comparisons

- No existing SQL migrations or comparison tables were found in the repo.
- No existing v2 comparison persistence layer is present.

### 9. Existing dashboard routes

- `/dashboard` → `src/app/(dashboard)/dashboard/page.tsx`

### 10. Components that are safe to reuse

SAFE_TO_REUSE

- `src/components/contract/UploadCard.tsx`
- `src/components/contract/FilePreview.tsx`
- `src/components/contract/CompareButton.tsx`
- `src/components/contract/ChangeBadge.tsx`
- `src/components/layout/dashboardNavbar.tsx`
- `src/lib/contract/files.ts`
- `src/lib/contract/format.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabaseAdmin.ts`

### 11. Components that should remain v2-only

V2_ONLY_DO_NOT_TOUCH

- `src/lib/contractEngine.ts`
- `src/hooks/useContractCompare.ts`
- `src/components/contract/PdfResultViewer.tsx`
- `src/components/contract/ResultActions.tsx`
- `src/app/(dashboard)/dashboard/page.tsx` current PDF output logic
- `src/app/api/compare/route.ts` placeholder v2 API endpoint

### 12. Components/modules that can be reused with an adapter

REUSE_WITH_ADAPTER

- `src/components/contract/UploadCard.tsx`
  - Can power the v3 upload page if wrapped in a dedicated compare panel.
- `src/components/contract/CompareButton.tsx`
  - Can be reused for v3 compare-and-save flow with different copy.
- `src/components/layout/dashboardNavbar.tsx`
  - Can add links to v3 routes without removing v2 navigation.

### 13. New components/modules needed for v3

NEW_V3_REQUIRED

- `src/types/comparison-v3.ts`
- `src/lib/comparison-v3/api.ts`
- `src/lib/comparison-v3/db.ts`
- `src/lib/comparison-v3/mappers.ts`
- `src/app/api/comparisons/v3/route.ts`
- `src/app/api/comparisons/v3/[comparisonId]/route.ts`
- `src/components/comparison-v3/CompareUploadPanel.tsx`
- `src/components/comparison-v3/ComparisonSummaryBar.tsx`
- `src/components/comparison-v3/ClauseComparisonPage.tsx`
- `src/components/comparison-v3/ClauseDiffCard.tsx`
- `src/components/comparison-v3/DiffTokenRenderer.tsx`
- `src/components/comparison-v3/ComparisonStatusBadge.tsx`
- `src/components/comparison-v3/DeleteComparisonButton.tsx`
- `src/app/(dashboard)/dashboard/compare/page.tsx`
- `src/app/(dashboard)/dashboard/comparisons/page.tsx`
- `src/app/(dashboard)/dashboard/comparisons/[comparisonId]/page.tsx`
- Supabase migration for `comparisons` and `comparison_clauses`

## Summary Classification

### SAFE_TO_REUSE

- Upload card, file preview, compare button, file validation helpers
- Supabase server/browser/admin setup
- Dashboard navbar with additive v3 links only

### REUSE_WITH_ADAPTER

- Upload workflow UI patterns
- Shared comparison CTA
- Dashboard shell/navigation

### V2_ONLY_DO_NOT_TOUCH

- Direct-to-engine PDF compare flow
- Annotated PDF result viewer and download behavior
- Existing `/dashboard` PDF comparison experience

### NEW_V3_REQUIRED

- All persistence, v3 API, v3 types, saved comparison pages, clause-diff renderer, and database schema

## Non-Functional Notes

- The current repo has no test runner configured beyond linting.
- Current `npm run build` may be blocked in offline environments because `next/font` fetches remote fonts.
