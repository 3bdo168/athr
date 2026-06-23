# Product Requirements Document (PRD)

## Ather Agency Website Platform

| Field | Value |
|-------|-------|
| **Product** | Ather Agency — Digital Marketing & Web Development Platform |
| **Version** | 1.0 |
| **Last Updated** | June 22, 2026 |
| **Status** | Live / In Active Development |
| **Domain** | [atheragency.com](https://atheragency.com) |
| **Repository** | `agency-website` |

---

## 1. Executive Summary

Ather Agency (وكالة أثر) is a full-stack web platform for a digital marketing and web development agency based in Tanta, Egypt. The product serves three audiences:

1. **Prospective clients** — discover services, view portfolio work, explore transparent pricing, and initiate projects.
2. **Agency administrators** — manage content, leads, orders, clients, and internal operations from a centralized admin panel.
3. **Approved clients** — access a client portal to track engagement with the agency.

The platform is bilingual (Arabic / English), mobile-responsive, and built on a modern React + Firebase stack. Lead capture flows through contact forms, checkout requests, WhatsApp integration, and newsletter signups. Pricing is displayed in Egyptian Pounds (EGP).

---

## 2. Problem Statement

Digital marketing agencies often rely on fragmented tools — static websites, spreadsheets for leads, manual WhatsApp follow-ups, and no client-facing portal. This creates friction for prospects evaluating services, slows down sales follow-up, and limits transparency around pricing and deliverables.

**Ather Agency's platform solves this by:**

- Presenting a professional, conversion-focused marketing site with real portfolio case studies and clear pricing.
- Centralizing inbound leads (messages, orders, waitlist) in Firestore for admin review.
- Providing a CMS-like admin panel to update content without code changes.
- Offering a gated client portal for approved customers.
- Supporting Arabic and English to serve local and regional markets.

---

## 3. Goals & Success Metrics

### 3.1 Business Goals

| Goal | Description |
|------|-------------|
| **Generate qualified leads** | Convert site visitors into contact form submissions, checkout requests, and WhatsApp conversations. |
| **Build trust** | Showcase portfolio, testimonials, stats, and transparent pricing to reduce sales friction. |
| **Streamline operations** | Give the admin team one place to manage content, tasks, orders, and client approvals. |
| **Retain clients** | Provide a client portal foundation for project tracking and asset delivery. |

### 3.2 Success Metrics (KPIs)

| Metric | Target / Measurement |
|--------|----------------------|
| Contact form submissions | Monthly count in `messages` collection |
| Order/checkout requests | Monthly count in `orders` collection |
| Waitlist signups | Monthly count in `waitlist` collection |
| Newsletter subscribers | Growth in `newsletter` collection |
| Client portal activations | Approved clients in `clients` collection |
| Portfolio engagement | Case study page views |
| Ad performance | Click counts on `ads` documents |
| Conversion rate | Visitors → contact or checkout |

---

## 4. Target Users & Personas

### 4.1 Prospect (Public Visitor)

- **Who:** Small business owners, startups, and brands in Egypt and the MENA region seeking digital marketing or web development services.
- **Needs:** Understand services, see proof of work, compare pricing tiers, and contact the agency quickly.
- **Behaviors:** Browses on mobile, may prefer Arabic, often initiates contact via WhatsApp.

### 4.2 Agency Admin

- **Who:** Ather Agency owner/operator (single authorized admin account).
- **Needs:** Manage all site content, review leads, approve clients, track tasks, and configure pricing/payments.
- **Behaviors:** Logs in via email/password, uses admin panel daily for operations.

### 4.3 Approved Client

- **Who:** Existing or onboarded agency clients with an approved account.
- **Needs:** View account status, eventually track projects and download deliverables.
- **Behaviors:** Signs in with Google OAuth, expects a simple dashboard experience.

---

## 5. Product Scope

### 5.1 In Scope (Current Release)

| Area | Scope |
|------|-------|
| Public marketing site | Home, About, Portfolio, Pricing, Services, Contact, Legal pages |
| Lead capture | Contact form, checkout flow, newsletter, waitlist |
| Admin panel | Full CMS and operations dashboard |
| Client portal | Authentication, approval workflow, dashboard (projects/assets placeholder) |
| Localization | Arabic / English with RTL support |
| Theming | Light / dark mode |
| SEO | Per-page meta tags via react-helmet-async |
| Ads | Configurable promotional banners with click tracking |

### 5.2 Out of Scope (Current Release)

| Item | Notes |
|------|-------|
| Online payment processing | Checkout redirects to WhatsApp; manual payment methods configured in admin |
| Multi-admin roles | Single admin email authorization |
| Automated email campaigns | Newsletter stores emails; no ESP integration yet |
| Full client project management | Projects and Assets pages are "Coming Soon" placeholders |
| Native mobile apps | Web-only responsive experience |

### 5.3 Future Considerations

- Client project status tracking and file delivery in the portal
- Payment gateway integration (e.g., Paymob, Stripe)
- Email automation for newsletter and lead nurturing
- Multi-admin support with role-based permissions
- Analytics dashboard (Google Analytics / custom events)
- Blog / content marketing section
- Live chat beyond WhatsApp button

---

## 6. User Journeys

### 6.1 Prospect → Lead

```
Visit Home → Browse Services/Portfolio → View Pricing → Select Package
  → Checkout (name, WhatsApp, industry) → Order saved to Firestore
  → WhatsApp opens with pre-filled message → Success page
```

Alternative paths:
- **Contact form** → Message saved to Firestore → Success page
- **Newsletter signup** → Email saved to `newsletter` or `waitlist`
- **WhatsApp floating button** → Direct chat with agency

### 6.2 Client Onboarding

```
Visit /client/login → Enter phone number → Google Sign-In
  → Profile created with status: pending
  → Admin reviews in /admin/clients → Approves or rejects
  → Approved client → /client dashboard
  → Pending/rejected → /client/pending
```

### 6.3 Admin Daily Workflow

```
Login at /admin/login → Dashboard overview
  → Review new messages, orders, waitlist entries
  → Manage tasks, portfolio, pricing, ads
  → Approve pending clients
  → Update services, offers, testimonials
```

---

## 7. Feature Requirements

### 7.1 Public Marketing Site

#### 7.1.1 Home Page (`/`)

| Section | Requirement |
|---------|-------------|
| Hero | Agency tagline, CTAs (Start Project, View Work), key stats |
| Client Logos | Social proof from partner/client logos |
| Services Preview | Grid of core service offerings with links |
| Stats | Key agency metrics |
| Process | Step-by-step how-we-work section |
| Portfolio Preview | Featured case studies with links to full portfolio |
| Testimonials | Client quotes pulled from Firestore |
| FAQ | Common questions |
| Newsletter | Email capture with duplicate detection |
| CTA | Book a free strategy call |
| Ad Banners | Configurable ads at `home_top`, `home_middle`, `home_bottom` placements |

#### 7.1.2 About Page (`/about`)

- Agency story, mission, and values
- Team imagery and culture presentation
- Reuses Stats, Process, and Newsletter sections

#### 7.1.3 Portfolio (`/portfolio`, `/portfolio/:projectId`)

- Filterable project grid by category (Social Media, Web Design, Video Editing, Graphic Design)
- Individual case study pages with project details
- Content managed via admin Portfolio Control
- CTA to pricing and contact

#### 7.1.4 Services Pages

Dedicated landing pages for core offerings:

| Route | Service |
|-------|---------|
| `/services/social-media` | Social Media Management |
| `/services/web-design` | Web Design & Development |
| `/services/video-editing` | Video Editing |
| `/services/posters` | Poster / Graphic Design |

Each page should describe the service, highlight benefits, and drive users toward pricing or contact.

#### 7.1.5 Pricing Page (`/pricing`)

| Feature | Requirement |
|---------|-------------|
| Social Media tiers | Starter, Pro, Enterprise monthly packages (EGP) |
| Web Development tiers | Landing page, full website, custom platform (one-time EGP) |
| Package Builder | Budget slider; user selects services within budget; out-of-range options locked |
| Deals / Discounts | Upfront payment discounts (3-month, 6-month, annual) |
| FAQ | Pricing-related questions |
| Checkout CTA | Links to `/checkout` with plan name and total as query params |
| Dynamic pricing | Loads tier data from Firestore `pricing` collection with static fallbacks |
| Ad placement | `pricing_top` banner support |

#### 7.1.6 Contact Page (`/contact`)

- Contact form: name, email, phone, company, message
- Saves to Firestore `messages` collection with `read: false`
- Displays agency email, phone, and address (Tanta, Egypt)
- Redirects to success page on submission

#### 7.1.7 Checkout Page (`/checkout`)

- Accepts `plan` and `total` query parameters from pricing
- Collects: name, WhatsApp number, industry
- Saves order to Firestore `orders` with status `pending_contact`
- Opens WhatsApp with pre-formatted order message to agency number
- Redirects to `/success`

#### 7.1.8 Legal Pages

- Privacy Policy (`/privacy`) — bilingual
- Terms of Service (`/terms`) — bilingual

#### 7.1.9 Global UI Features

| Feature | Requirement |
|---------|-------------|
| Navigation | Home, Portfolio, Pricing, Contact, Get Started CTA |
| Footer | Social links (Instagram, LinkedIn), quick links, branding |
| Language toggle | Arabic ↔ English via `LanguageContext` |
| Dark mode | Toggle via `ThemeContext`; persisted preference |
| Custom cursor | Branded cursor on desktop |
| WhatsApp button | Floating action button on all public pages |
| Scroll to top | On route change |
| 404 page | Custom not-found page |
| SEO component | Title, description, OG image per page |

---

### 7.2 Admin Panel (`/admin/*`)

Protected by email-based admin check. Only the configured admin email may access admin routes.

#### 7.2.1 Dashboard (`/admin`)

- Overview stats: total projects, live services, unread messages, total orders
- Recent portfolio items
- Active task count

#### 7.2.2 Clients (`/admin/clients`)

- View all client profiles
- Approve, reject, or manage client status (`pending` | `approved` | `rejected`)
- View client contact details (name, email, phone)

#### 7.2.3 Orders (`/admin/orders`)

- View checkout/order requests
- Fields: name, WhatsApp, industry, package, expected total, status, timestamp

#### 7.2.4 Waitlist (`/admin/waitlist`)

- Manage waitlist signups from pricing or newsletter flows

#### 7.2.5 Messages (`/admin/messages`)

- Inbox for contact form submissions
- Mark as read/unread
- Quick reply via mailto link

#### 7.2.6 Tasks (`/admin/tasks`)

- Internal task management
- Fields: title, description, status (e.g., In Progress, Completed), priority, due date
- Admin-only CRUD

#### 7.2.7 Services (`/admin/services`)

- Manage service offerings displayed on the site

#### 7.2.8 Pricing (`/admin/pricing`)

- Configure social media and web development tier prices
- Manage package builder service options and pricing
- Updates reflected on public pricing page

#### 7.2.9 Payment (`/admin/payment`)

- Configure manual payment methods (e.g., InstaPay, Vodafone Cash numbers)
- Stored in Firestore `settings` collection; publicly readable

#### 7.2.10 Offers (`/admin/offers`)

- Manage promotional offers and deals

#### 7.2.11 Portfolio (`/admin/portfolio`)

- CRUD for portfolio items and case study content
- Categories, images, descriptions, metrics

#### 7.2.12 Testimonials (`/admin/testimonials`)

- CRUD for client testimonials shown on home page

#### 7.2.13 Ads (`/admin/ads`)

- Create/manage promotional banners
- Fields: title, description, image, link, placement, start/end dates, display duration, active status
- Click tracking via Firestore increment
- Placements: `home_top`, `home_middle`, `home_bottom`, `pricing_top`, etc.

#### 7.2.14 Authentication (`/admin/login`)

- Email/password login via Firebase Auth
- Route guard redirects non-admin users

---

### 7.3 Client Portal (`/client/*`)

#### 7.3.1 Login (`/client/login`)

- Phone number collection (required before sign-in)
- Google OAuth sign-in via Firebase
- Creates client profile in `clients/{uid}` with `status: pending` on first login

#### 7.3.2 Pending Approval (`/client/pending`)

- Shown when client status is `pending` or `rejected`
- Informs user that admin approval is required

#### 7.3.3 Dashboard (`/client`)

- Welcome message with client name
- Account status badge (Active when approved)
- Quick actions: Projects, Assets, Contact Team
- Profile summary (name, email, phone)

#### 7.3.4 Settings (`/client/settings`)

- View and update client profile information

#### 7.3.5 Projects (`/client/projects`) — Planned

- **Current state:** Coming Soon placeholder
- **Target:** Display active and completed projects with status updates

#### 7.3.6 Assets (`/client/assets`) — Planned

- **Current state:** Coming Soon placeholder
- **Target:** Secure download of project deliverables (logos, designs, reports)

---

## 8. Data Model (Firestore Collections)

| Collection | Access | Purpose |
|------------|--------|---------|
| `messages` | Public create; admin read/write | Contact form submissions |
| `orders` | Public create; admin read/write | Checkout/order requests |
| `pricing` | Public read; admin write | Dynamic pricing configuration |
| `portfolioItems` | Public read; admin write | Portfolio and case studies |
| `testimonials` | Public read; admin write | Client testimonials |
| `services` | Public read; admin write | Service listings |
| `offers` | Public read; admin write | Promotional offers |
| `ads` | Public read/update (clicks); admin create/delete | Promotional banners |
| `tasks` | Admin only | Internal task management |
| `waitlist` | Public create; admin read/write | Waitlist signups |
| `settings` | Public read; admin write | Payment info and site settings |
| `clients` | Owner read/write; admin full access | Client profiles and approval status |
| `newsletter` | Public create (via helpers) | Newsletter email subscriptions |

### Client Profile Schema

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "photoURL": "string | null",
  "status": "pending | approved | rejected",
  "role": "client",
  "createdAt": "timestamp"
}
```

### Order Schema

```json
{
  "name": "string",
  "whatsapp": "string",
  "industry": "string",
  "package": "string",
  "expectedTotal": "string",
  "status": "pending_contact",
  "createdAt": "timestamp"
}
```

---

## 9. Technical Requirements

### 9.1 Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 8 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4, PostCSS |
| Animation | Framer Motion |
| Backend | Firebase (Auth, Firestore) |
| Charts | Recharts (admin analytics) |
| Email | EmailJS (browser) |
| SEO | react-helmet-async |
| Notifications | react-hot-toast |
| Testing | Playwright (E2E) |
| Linting | ESLint 9 |

### 9.2 Architecture

- Single-page application (SPA) with client-side routing
- Context providers for: Auth, Admin, Theme, Language, Client Auth
- Route guards: `AdminRoute`, `ClientRoute`
- Firebase helpers abstract Firestore CRUD operations
- Static fallbacks for pricing data when Firestore is unavailable

### 9.3 Deployment

- Frontend: Static build via `vite build` (Netlify-compatible with `_redirects` for SPA)
- Firebase: Firestore security rules in `firestore.rules`
- Environment: Firebase config in `src/firebase/config.js`

### 9.4 Security Requirements

| Requirement | Implementation |
|-------------|----------------|
| Admin authorization | Email check in route guards and Firestore rules |
| Client data isolation | Clients can only read/write their own `clients/{uid}` document |
| Public write restrictions | Only `create` allowed on messages, orders, waitlist |
| Ad click tracking | Public `update` on ads limited to increment fields |
| Catch-all deny | All unspecified collections denied by default |

### 9.5 Performance Requirements

- First contentful paint under 3 seconds on 4G mobile
- Lazy-load images in portfolio and case studies
- Minimize Firestore reads via caching and snapshot listeners where appropriate
- Responsive layout from 320px to 1920px+ viewports

### 9.6 Accessibility & Localization

- Bilingual UI: English (LTR) and Arabic (RTL)
- Semantic HTML structure
- Dark mode with sufficient contrast
- Form validation with user-facing error messages

---

## 10. Integrations

| Integration | Purpose |
|-------------|---------|
| **Firebase Auth** | Admin email/password login; client Google OAuth |
| **Firebase Firestore** | All dynamic data storage |
| **WhatsApp (wa.me)** | Checkout order handoff and floating contact button |
| **EmailJS** | Optional email notifications |
| **Social Media** | Instagram, LinkedIn links in footer |

### Agency Contact Details

| Channel | Value |
|---------|-------|
| Email | atheragancy@gmail.com |
| Phone / WhatsApp | 01140507026 |
| Location | Tanta, Egypt |

---

## 11. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| **Availability** | 99% uptime for static frontend; Firebase SLA for backend |
| **Browser support** | Latest Chrome, Firefox, Safari, Edge; mobile Safari and Chrome |
| **Maintainability** | Component-based architecture; centralized translations |
| **Scalability** | Firestore scales with document growth; no server management |
| **Privacy** | Privacy policy page; minimal PII collection |
| **Branding** | Consistent Ather Agency visual identity (blue/violet palette, "A" logo) |

---

## 12. Acceptance Criteria (Release Checklist)

### Public Site
- [ ] All public routes render without errors in EN and AR
- [ ] Contact form saves to Firestore and shows success state
- [ ] Checkout saves order and opens WhatsApp with correct message
- [ ] Pricing page loads tiers from Firestore with fallback defaults
- [ ] Portfolio filters and case study pages work
- [ ] Dark mode and language toggle persist across navigation
- [ ] SEO meta tags present on all major pages

### Admin Panel
- [ ] Only authorized admin email can access `/admin/*`
- [ ] CRUD operations work for portfolio, testimonials, services, ads, pricing
- [ ] Messages and orders appear in admin inbox
- [ ] Client approval flow updates client status correctly

### Client Portal
- [ ] Google sign-in creates client profile
- [ ] Pending clients cannot access dashboard
- [ ] Approved clients see dashboard with profile info

---

## 13. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Single admin account | Bus factor, no delegation | Future: multi-admin roles |
| No payment gateway | Manual payment friction | WhatsApp handoff + admin payment config |
| Public Firestore writes | Spam/abuse on messages/orders | Rate limiting (future); admin review workflow |
| Client portal incomplete | Client disappointment | Clear "Coming Soon" states; roadmap communication |
| Firebase config exposure | API key abuse | Firestore rules enforce authorization |

---

## 14. Appendix

### A. Route Map

```
Public
  /                          Home
  /about                     About
  /portfolio                 Portfolio listing
  /portfolio/:projectId      Case study
  /pricing                   Pricing
  /checkout                  Order checkout
  /contact                   Contact
  /success                   Confirmation
  /privacy                   Privacy policy
  /terms                     Terms of service
  /services/social-media     Social media service
  /services/web-design       Web design service
  /services/video-editing    Video editing service
  /services/posters          Poster design service

Client
  /client/login              Client login
  /client/pending            Pending approval
  /client                    Client dashboard
  /client/settings           Client settings
  /client/projects           Projects (planned)
  /client/assets             Assets (planned)

Admin
  /admin/login               Admin login
  /admin                     Dashboard
  /admin/clients             Client management
  /admin/orders              Orders
  /admin/waitlist            Waitlist
  /admin/messages            Messages
  /admin/tasks               Tasks
  /admin/services            Services
  /admin/pricing             Pricing config
  /admin/payment             Payment methods
  /admin/offers              Offers
  /admin/portfolio           Portfolio CMS
  /admin/testimonials        Testimonials CMS
  /admin/ads                 Ad management
```

### B. Service Categories

- SEO & Content
- Social Media Management
- Paid Advertising (Google, Meta)
- Brand Identity
- Email Marketing
- Analytics & Reports
- Web Design & Development
- Video Editing
- Graphic Design / Posters

### C. Pricing Model Summary

| Category | Billing | Currency |
|----------|---------|----------|
| Social Media Management | Monthly subscription | EGP |
| Web Development | One-time project fee | EGP |
| Custom Package Builder | Variable based on selections | EGP |
| Discounts | 3-month, 6-month, annual upfront | Percentage off |

---

*This document reflects the current state of the `agency-website` codebase as of June 2026. Update it as features ship or requirements change.*
