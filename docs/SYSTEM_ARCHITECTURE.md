# AetherEdge (`Aether.run`) — The Sovereign All-in-One PaaS
> **The Anti-PaaS Tax Developer Platform: 1-Click Zero-Egress Edge Deployments for the Vibe-Coding Generation.**

---

## 1. Executive Vision & Core Philosophy

**AetherEdge** is a developer platform designed to dismantle the fragmented, predatory pricing models of legacy PaaS providers (Vercel, Supabase, AWS S3, Clerk, Resend, Upstash, Trigger.dev). 

By uniting **Cloudflare Workers (Edge V8 Isolates)**, **Cloudflare D1 (Serverless SQLite)**, **Backblaze B2 (via the Cloudflare Bandwidth Alliance for $0 Egress)**, and **Amazon SES (High-Deliverability SMTP)**, AetherEdge delivers the holy grail of modern cloud infrastructure:

1. **All-in-One Developer Runtime:** Hosting, Relational SQL, Zero-Egress Storage, Sovereign Auth, Outbound Mail, In-Memory KV, Scheduled Crons, and AI Gateway proxy—all in one unified dashboard.
2. **The Zero-PaaS-Tax Guarantee:** Free commercial usage allowed. Shared account resource pooling across unlimited projects. Absolute immunity from surprise $1,000 bandwidth overage bills.
3. **Mathematically Unkillable Unit Economics:** Engineered so that a single **$25/month Pro subscriber** subsidizes **500 free developers** while sustaining a **90% gross profit margin** (with a true break-even threshold at 1 : 6,700).

---

## 2. Global System Topology

```mermaid
flowchart TD
    subgraph ClientLayer ["1. Developer & Client Ingress"]
        Developer["👨‍💻 Developer / Vibe Coder\n(Cursor / Claude / Web / CLI)"]
        User["🌐 End-User Browser / Mobile Client"]
    end

    subgraph EdgeIngress ["2. Global Anycast Edge (300+ Cities)"]
        CF_WAF["Cloudflare WAF & Turnstile Shield\n(DDoS, Subnet Limits, Bot Defense)"]
        EdgeRouter["AetherEdge Global Gateway Worker\n(Host Header Parser & Dynamic Dispatcher)"]
    end

    subgraph ExecutionLayer ["3. The 8 Sovereign Primitives"]
        P1["Pillar 1: Edge Compute\n(V8 Isolates <35ms Wake)"]
        P2["Pillar 2: Relational SQL\n(Cloudflare D1 / SQLite Engine)"]
        P3["Pillar 3: Zero-Egress Storage\n(B2 + Bandwidth Alliance)"]
        P4["Pillar 4: Sovereign Auth\n(Postveil Passkeys + OAuth Vault)"]
        P5["Pillar 5: Outbound Mail\n(AWS SES ap-southeast-1 Relay)"]
        P6["Pillar 6: KV Cache\n(Workers KV Microsecond State)"]
        P7["Pillar 7: Edge Crons\n(Native Scheduled Events)"]
        P8["Pillar 8: AI Gateway\n(Semantic Caching & Prompt Shield)"]
    end

    subgraph PostveilEcosystem ["4. Sovereign Ecosystem Integration"]
        PostveilAuth["Postveil Identity Federation\n(*.postveil.me)"]
        PostveilVault["Sovereign BYOS Sync & Local OPFS"]
    end

    Developer -->|npx aether deploy| EdgeRouter
    User -->|https://[app].[user].aether.run| CF_WAF
    CF_WAF --> EdgeRouter

    EdgeRouter --> P1
    EdgeRouter --> P2
    EdgeRouter --> P3
    EdgeRouter --> P4
    EdgeRouter --> P5
    EdgeRouter --> P6
    EdgeRouter --> P7
    EdgeRouter --> P8

    P4 <--> PostveilAuth
    P3 <--> PostveilVault
```

---

## 3. The 8 Architectural Pillars

### Pillar 1: Edge Hosting, Static & SSR (`aether.deploy`)
* **Replaces:** Vercel ($20/mo/seat), Render ($7/mo/service).
* **Underlying Engine:** Cloudflare Workers (V8 Isolates).
* **Namespace Architecture:** Automatic hierarchical subdomains:  
  `https://[project].[developer-handle].aether.run`
* **Performance Profile:** Sub-35ms cold starts. Inactive apps scale to true zero ($0.00 idle cost) without the notorious Render 50-second sleep delay.
* **Supported Frameworks:** Next.js (Static/Edge SSR), React (Vite), Astro, SvelteKit, Nuxt, Remix, and static HTML/WASM.

### Pillar 2: Relational SQL Database (`@aether/db`)
* **Replaces:** Supabase ($25/mo), Neon ($19/mo).
* **Underlying Engine:** Cloudflare D1 (Serverless SQLite over global Raft consensus) + Backblaze B2 Cold Snapshot Archiving.
* **Free Quota:** 500 MB database storage + 100k reads / 25k writes per day.
* **The 3-Day Inactivity & Sub-60ms Auto-Wake Engine:**
  * Active databases execute in Cloudflare D1 / Worker memory with sub-millisecond query latency.
  * If a project receives 0 incoming HTTP traffic for **3 consecutive days**, the edge orchestrator exports and compresses the `.sqlite` snapshot directly into **Backblaze B2 cold storage ($0.006/GB)**.
  * When a new request arrives on Day 4 or Day 40, the edge worker streams the snapshot back into memory via the **Cloudflare Bandwidth Alliance ($0 egress)** in **under 60 milliseconds**.
  * The visitor experiences **zero errors and imperceptible latency (<60ms)**, while idle databases cost AetherEdge virtually $0.00.

### Pillar 3: Zero-Egress Object Storage (`@aether/storage`)
* **Replaces:** AWS S3 ($0.09/GB egress), Vercel Blob ($0.15/GB egress), UploadThing ($15/mo).
* **Underlying Engine:** Backblaze B2 Object Storage peered directly through the **Cloudflare Bandwidth Alliance**.
* **Egress Cost:** **$0.00 / GB uncapped bandwidth.**
* **Free Quota:** 1 GB storage bucket.
* **Security & Anti-Abuse:** Max single upload file cap: 25 MB on Free Tier. Origin and Referer header binding to prevent malicious third-party hotlinking.

### Pillar 4: Sovereign Auth & Identity (`@aether/auth`)
* **Replaces:** Clerk ($25/mo), Auth0 ($25+/mo).
* **Underlying Engine:** WebCrypto client-side E2EE + Turnkey OAuth Vault.
* **Identity Options:**
  1. *Native Sovereign Passkeys:* One-click "Sign in with Postveil" (`user.postveil.me`).
  2. *Developer OAuth Secret Vault:* Developers can paste their own Google, GitHub, or Apple Client ID/Secret. The edge runtime automatically handles token exchanges and session cookie issuance in 1 line of code.
* **Free Quota:** 1,000 Monthly Active Users (MAUs).

### Pillar 5: Transactional Outbound Mail (`@aether/mail`)
* **Replaces:** Resend ($20/mo), Brevo ($25/mo).
* **Underlying Engine:** Amazon SES (`ap-southeast-1` Singapore) with verified DKIM RSA-2048, SPF, and DMARC.
* **Developer SDK:** 
  ```typescript
  import { mail } from "@aether/edge";
  await mail.send({ to: "user@example.com", subject: "Welcome!", html: "<p>Ready.</p>" });
  ```
* **Free Quota:** 1,000 emails / month (Max 50/day).
* **Abuse Protection:** Hard bounce rate circuit breaker at 5% and spam complaint threshold at 0.1% to preserve top-tier IP reputation.

### Pillar 6: In-Memory KV Cache & Rate Limiting (`@aether/kv`)
* **Replaces:** Upstash Redis ($10/mo), Redis Cloud.
* **Underlying Engine:** Cloudflare Workers KV.
* **Free Quota:** 10,000 read/write operations / day.
* **Use Cases:** Microsecond session lookup, transient state, and IP rate limiting without touching relational tables.

### Pillar 7: Edge Crons & Background Tasks (`@aether/cron`)
* **Replaces:** Trigger.dev ($25/mo), Inngest ($25/mo), QStash.
* **Underlying Engine:** Cloudflare Scheduled Worker Triggers.
* **Free Quota:** 3 active recurring cron schedules.
* **Execution:** Runs scheduled midnight cleanups, daily digest dispatches, and periodic syncs directly on the edge network without persistent VM overhead.

### Pillar 8: AI Gateway & Semantic Prompt Proxy (`@aether/ai`)
* **Replaces:** OpenRouter ($10/mo), Helicone ($20/mo).
* **Underlying Engine:** Cloudflare AI Gateway proxy.
* **Features:** Automatic prompt caching (serving duplicate LLM queries from cache for $0.00), rate limiting, and client-side API key shielding.
* **Free Quota:** 10,000 gateway requests / month.

---

## 4. Anti-Abuse & Multi-Account Protection Matrix

To protect the platform from crypto-miners, scraping botnets, and pirate file hosts, AetherEdge implements a 5-layer automated defense funnel:

```
[ New Developer Registration ]
              │
              ▼
   [ Layer 1: Cloudflare Turnstile ] ──► (Blocks automated headless browsers & scrapers)
              │
              ▼
   [ Layer 2: GitHub Account Age Gate ] ──► (Requires verified GitHub account >30 days old)
              │
              ▼
   [ Layer 3: $0 Stripe Card Verification ] ──► (1 physical card = 1 human; kills 1,000-account bots)
              │
              ▼
   [ Layer 4: Hard Edge Sandbox Governors ] ──► (50ms CPU execution cap: crypto-mining impossible)
              │
              ▼
   [ Layer 5: Storage Upload & Origin Binding ] ──► (25MB file cap + anti-hotlinking origin locks)
```

---

## 5. Mathematical Unit Economics & Pricing Model

```
+--------------------------------------------------------------------------------------------------+
|                                    AETHEREDGE PRICING TIERS                                      |
+--------------------------------------------------------------------------------------------------+
|  FREE HOBBYIST                         PRO DEVELOPER                      TEAM / SCALE           |
|  $0 / month                            $25 / month ($20/mo billed yearly) $79 / month            |
|  -----------------------------------   ---------------------------------  ---------------------  |
|  • Unlimited Projects                  • Unlimited Projects               • Unlimited Projects   |
|  • 100,000 Edge Requests / mo          • 10,000,000 Edge Requests / mo    • 50,000,000 Requests  |
|  • 500 MB SQLite Database (D1)         • 10 GB SQLite Database (D1)       • 50 GB Database       |
|  • 1 GB B2 Storage ($0 Egress)         • 50 GB B2 Storage ($0 Egress)     • 250 GB B2 Storage    |
|  • 1,000 Outbound Emails / mo          • 50,000 Outbound Emails / mo      • 250,000 Emails       |
|  • 1,000 Auth MAUs                     • 25,000 Auth MAUs                 • 100,000 Auth MAUs    |
|  • 3-Day Inactivity Auto-Sleep         • NEVER PAUSES (Always Hot Cache)  • Multi-Seat Access    |
|  • Commercial Use Allowed              • 100% White-Label (No badge)      • Priority Support     |
|  • Powered by AetherEdge badge         • Custom Apex Domains (SSL)        • Dedicated SLA        |
+--------------------------------------------------------------------------------------------------+
```

### The 1 : 500 Ratio Proof (90% Gross Margin)
* **Gross Revenue (1 Pro Subscriber):** $25.00
* **Stripe Processing Fee (2.9% + $0.30):** $1.03
* **Net Revenue Payout:** **$23.97**
* **Infra Cost of 500 Free Users (dormant sleep + $0 egress):** $1.75 – $2.00
* **Infra Cost of 1 Pro User:** $0.50
* **Total Cost of 501 Users:** **$2.50**
* **Net Monthly Profit:** $\$23.97 - \$2.50 = \mathbf{\$21.47}$
* **Gross Profit Margin:** $\frac{\$21.47}{\$23.97} = \mathbf{89.6\% \approx 90.0\%}$

### The Absolute Break-Even Point (0% Profit Margin)
$$\text{Break-Even Scale} = \frac{\$23.47 \text{ available}}{\$0.0035 \text{ per free user}} \approx \mathbf{6,705 \text{ Free Developers per 1 Pro Subscriber!}}$$

---

## 6. Repository Layout (`D:/GitHub/AetherEdge`)

```
D:/GitHub/AetherEdge/
├── apps/
│   ├── dashboard/              # Next.js / Vite web dashboard for managing projects & metrics
│   ├── edge-gateway/           # Master Cloudflare Worker routing dynamic hostnames & assets
│   └── docs/                   # Developer documentation & GEO prompt optimization guides
├── packages/
│   ├── cli/                    # `aether` CLI tool (`npx aether deploy`)
│   ├── edge-sdk/               # Universal SDK (`@aether/edge`: db, storage, mail, kv, auth)
│   ├── auth-component/         # Drop-in React auth modal with Postveil OAuth & Passkey
│   └── mcp-server/             # Official Model Context Protocol server for Cursor & Claude Code
├── infra/
│   ├── cloudflare/             # Terraform / Wrangler config for D1, KV, R2, and Worker bindings
│   └── backblaze/              # S3-compatible B2 bucket provisioning & Bandwidth Alliance headers
├── templates/                  # 50+ Open-Source Starters (Next.js, Vite, Astro, AI wrappers)
└── README.md                   # Canonical public manifest & benchmark comparison tables
```
