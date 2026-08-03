// Case study detail content per project slug.
// Each entry maps to /portfolio/:slug

export const PROJECT_DETAILS = {
  'euroleaguetech-platform': {
    why: `Sports analysts and tech researchers had no single source of truth for technology vendor usage across Euroleague clubs.
Every attempt to map "which teams use which vendors" required manual research across 20 different club websites, press releases, and LinkedIn pages.
The data existed — it just wasn't structured or queryable.`,

    decisions: [
      {
        title: 'DynamoDB single-table design',
        detail: 'All entities (teams, vendors, relationships) live in one table with composite keys. Query patterns were defined upfront — this eliminated JOIN complexity and kept Lambda cold starts under 100ms.',
      },
      {
        title: 'CloudFront as the API layer',
        detail: 'CloudFront caches API responses at the edge. Most reads are cache hits — Lambda only runs for cache misses or admin writes. This cut Lambda invocations by ~90% in production.',
      },
      {
        title: '15 Terraform modules, not a monolith',
        detail: 'Each AWS resource group (CloudFront, Lambda, DynamoDB, IAM, Route53) is a standalone module. Teams can deploy or update one module without touching others. Module boundaries match AWS service boundaries.',
      },
      {
        title: 'No VPC by default',
        detail: 'Lambda runs outside a VPC. VPCs add cold start latency and NAT gateway costs. Since all data is in DynamoDB (not a private RDS), there was no reason to pay the VPC tax.',
      },
    ],

    techRationale: [
      { tech: 'CloudFront',  reason: 'Edge caching for low-latency global access. Also handles TLS and custom domain.' },
      { tech: 'Lambda',      reason: 'Serverless compute. No idle cost. Scales automatically with traffic spikes.' },
      { tech: 'DynamoDB',    reason: 'Single-table design for O(1) lookups on all query patterns.' },
      { tech: 'Terraform',   reason: '15 composable modules. Reproducible infra, peer-reviewable changes, no ClickOps.' },
      { tech: 'API Gateway', reason: 'HTTP API (not REST API) — cheaper, faster cold starts, enough for this use case.' },
    ],

    outcome: '20 Euroleague teams mapped, vendor relationships queryable via API, zero operational overhead post-deployment.',
  },
};
