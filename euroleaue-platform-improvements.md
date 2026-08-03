Now I have the full picture. Two things to address: **what's missing from the actual project** to qualify as mid-level PE work, and **how to present it on the portfolio page**.

---

## What the Project Already Has (strong)

Don't undersell this:
- 15 reusable Terraform modules with `for_each` + `locals` flatten — enterprise-grade pattern
- Single-table DynamoDB design with 5 GSIs — sophisticated data modeling
- CloudFront + OAC (modern, not deprecated OAI)
- Remote state: S3 + DynamoDB lock
- Least-privilege IAM with scoped policies
- Cost optimization work: LIST# precomputed records replacing full-table Scans
- Live deployment, real data — 20 teams, 36 vendors, 104 items, **€0.09/month**
- Self-commissioned code review with 11 findings

That's genuine mid-level infrastructure work. The problem is it stops at *"I provisioned it"*.

---

## What's Missing for Mid-Level Platform Engineer

A Platform Engineer doesn't just build the thing — they **own the full lifecycle**. Three pillars are absent:

### 1. CI/CD — the defining gap

This is the single most damaging absence. Every deployment is currently manual (`terraform apply`, `aws s3 sync`). No `.github/workflows/` directory exists at all.

Minimum required:

| Workflow | Trigger | What it does |
|---|---|---|
| `terraform-plan.yml` | PR opened | OIDC auth → `terraform plan` → posts diff as PR comment |
| `terraform-apply.yml` | Merge to `main` | OIDC auth → `terraform apply` |
| `deploy-frontend.yml` | Merge to `main` | `aws s3 sync` + CloudFront invalidation |
| `deploy-backend.yml` | Merge to `main` | Zip Lambda → `aws lambda update-function-code` |

Without this, the project signals *"I can write Terraform"* not *"I own infrastructure delivery"*.

### 2. Observability — running blind in production

Currently: `print()` statements, 1-day log retention, no alarms, no traces.

Minimum required:
- **Lambda Powertools** — structured JSON logs (replaces all `print()` calls, 30-minute change)
- **X-Ray tracing** — enabled per-function via `tracing_config` in the module (already has the variable, just not set)
- **CloudWatch dashboard** — API latency P50/P99, error rate, Lambda duration — one `aws_cloudwatch_dashboard` Terraform resource
- **SNS alarm** — trigger on `5XXError > 0` for 5 minutes — one `aws_cloudwatch_metric_alarm`

### 3. Security hardening — 2 critical findings open

| Finding | Fix | Effort |
|---|---|---|
| XSS: `innerHTML` with API data | Replace with `textContent` / `createElement` across 3 JS files | 1–2 hours |
| `CORS: *` on all API routes | Scope to the CloudFront domain | 15 minutes |
| Full event logged to CloudWatch | Remove `print(f"Received event: {event}")` | 5 minutes |
| IAM ARN account wildcard | Replace `eu-west-1:*` with specific account ID | 10 minutes |

The XSS is critical — any poisoned DynamoDB record executes arbitrary JS in visitors' browsers. A Platform Engineer who does a code review and leaves a Critical open is worse than one who never reviewed.

---

## Medium Gaps (round out the story)

| Gap | Why it matters at Mid-Level |
|---|---|
| **Custom domain** | Raw CloudFront URLs in "production" signals prototype. Route53 + ACM = 1 Terraform module each. |
| **Python 3.12** | 3.9 is EOL. A PE catches this in code review. You did catch it — fix it. |
| **Multi-environment** | Even just `environments/dev/` and `environments/prod/` with separate `tfvars` shows you understand environment promotion. |
| **Committed `tfplan`** | Binary plan file in VCS is a visible red flag to any engineer reviewing the repo. `.gitignore` it. |
| **Stale ARCHITECTURE.md** | Documents planned state (4 Lambdas, REST API, Cognito). Actual has 2 Lambdas, HTTP API v2, no auth. A PE keeps docs as up-to-date as code. |
| **GSI2–GSI5 orphaned** | Deployed, billing, but no data. Either populate PRODUCT# / PARTNERSHIP# entities or remove the GSIs. Dead infra signals an unfinished migration. |

---

## Prioritised Remediation Order

```
Week 1 — Security (quick wins, high impact on credibility)
  ✦ Fix XSS: innerHTML → textContent / createElement
  ✦ Tighten CORS to CloudFront domain
  ✦ Remove raw event logging from handlers
  ✦ Scope IAM ARNs to account ID
  ✦ Remove tfplan from git, add to .gitignore

Week 2 — CI/CD (the PE-defining pillar)
  ✦ GitHub OIDC → IAM role (Terraform)
  ✦ terraform-plan.yml on PR
  ✦ terraform-apply.yml + deploy-frontend.yml + deploy-backend.yml on merge

Week 3 — Observability
  ✦ Add Lambda Powertools + structured logging
  ✦ Enable X-Ray per function
  ✦ CloudWatch dashboard (Terraform resource)
  ✦ SNS alarm on 5XXError

Week 4 — Polish
  ✦ Custom domain: Route53 + ACM modules
  ✦ Bump Lambda runtime to Python 3.12
  ✦ Update ARCHITECTURE.md to actual state
  ✦ Populate or remove orphaned GSI data
```

After Week 2 this is a credible mid-level PE project. After Week 4 it's a strong one.

---

## Portfolio Case Study Page — `/portfolio/euroleague-tech-platform`

The page structure for this specific project:

```
[Hero]
  Title: EuroleagueTech Platform
  Status: LIVE ●  |  Cloud · Platform Engineering
  One-liner: "Serverless platform surfacing technology intelligence
               across all 20 Euroleague teams."
  [Live site ↗]  [GitHub ↗]

[The Problem]
  2–3 sentences: no single source of truth for Euroleague tech vendors.
  Manual, fragmented, no queryable dataset.

[Architecture]  ← Mermaid diagram of ACTUAL state (not the planned one)
  CloudFront → S3 (frontend)
  CloudFront → API GW (HTTP v2) → Lambda (vendors / teams) → DynamoDB

[Key Decisions]  ← 3–4 cards, each with a rationale
  "Single-table DynamoDB"   → why, trade-offs
  "for_each + locals flatten" → scalability without duplication
  "LIST# precomputed records" → cost optimization, replaced Scan
  "OAC over OAI"            → why modern matters

[By the numbers]
  €0.09/month  |  15 Terraform modules  |  20 teams  |  36 vendors  |  104 DynamoDB items

[What's next]  ← honest, not a promise
  CI/CD pipeline  |  Lambda Powertools  |  WAF  |  Custom domain

[Links]
  GitHub  |  Live site
```

The "Key Decisions" section is what separates a portfolio case study from a README. It shows reasoning, not just output. That's the mid-level PE signal.

Created 3 todos