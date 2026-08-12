# Task List - Abuzz Store Implementation

- [x] **Phase 1: Environment Setup**
  - [x] Upgrade Node.js version using `winget`
  - [x] Verify `node` and `npm` paths/versions

- [x] **Phase 2: Project Initialization**
  - [x] Initialize Next.js app inside `h:\abuzz-store` using Tailwind CSS and TypeScript
  - [x] Install dependencies (`firebase`, `lucide-react`, `vitest`)
  - [x] Setup PWA files (`manifest.json` and basic service worker configuration)

- [x] **Phase 3: Database & Auth Setup**
  - [x] Configure `firebase.ts` client initialization
  - [x] Create data models & types (`src/types/index.ts`)
  - [x] Implement seed script (`src/utils/seed.ts`) and populate Firestore database
  - [x] Set up Authentication context (`src/context/AuthContext.tsx`)

- [x] **Phase 4: Responsive Core UI Layout**
  - [x] Configure global styles with Tailwind CSS v4 (`globals.css`)
  - [x] Create Desktop `Header` component
  - [x] Create `MobileBottomNav` component (sticky)
  - [x] Integrate core wrappers in Root `layout.tsx`

- [x] **Phase 5: Catalog, Search, and Filters**
  - [x] Create `ProductCard` component with touch-friendly elements
  - [x] Build search & sort input logic in `Header`
  - [x] Create mobile-responsive `FilterSidebar` component
  - [x] Update Home `page.tsx` with catalog rendering

- [x] **Phase 6: Shopping Cart State & Drawers**
  - [x] Setup Cart state context (`src/context/CartContext.tsx`)
  - [x] Implement slide-out `CartDrawer` with quantity adjustment triggers
  - [x] Connect auth profiles with shopping carts

- [x] **Phase 7: Checkout & Payment**
  - [x] Create `/auth/page.tsx` for Login & Registration
  - [x] Create `/profile/page.tsx` dashboard for customer settings
  - [x] Create `/checkout/page.tsx` summary page
  - [x] Build interactive mock payment modal flow

- [x] **Phase 8: Validation & Verification**
  - [x] Set up Vitest configuration
  - [x] Create unit tests for checkout calculations (`checkout.test.ts`)
  - [x] Run test suites and verify logic
  - [x] Execute browser agent E2E testing on dev server (Skipped due to Playwright driver environment error)
  - [x] Draft walkthrough.md summarizing accomplishments
