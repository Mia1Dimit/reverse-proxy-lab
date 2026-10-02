export const PROJECT_DETAILS = {
  'reverse-proxy-lab': 'This site is a place to compare ways of routing several small services behind one address. Traefik serves the current pages; a separate Go proxy explores request forwarding and load balancing. The AWS-native version is still a plan, not a deployed alternative.',
  'file-secure-exchange': 'An AWS document exchange experiment focused on short-lived access instead of public file links. The first phase implements a presigned S3 upload/download broker with Cognito roles, Lambda, and DynamoDB records; document classification and further hardening are future work.',
  'linkedin-llm': 'A local career assistant built around LinkedIn data. It explores fetching and enriching personal network data, indexing it in ChromaDB, and combining retrieval with AWS Bedrock for a streaming chat interface. Authentication and deployment are still on the roadmap.',
  'euroleaguetech-platform': 'A sports technology research hub that makes Euroleague team and vendor information easier to browse. It pairs a small static site with a serverless AWS API and DynamoDB, using Terraform to explore repeatable infrastructure and a searchable data model.',
  'terraform-modules': 'A collection of independent Terraform building blocks for AWS services including networking, Lambda, API Gateway, S3, and IAM. Each module exposes inputs and outputs so application stacks can compose the resources they need without repeating the same definitions.',
  'iac-doc-generator': 'A starter example for keeping Terraform module documentation close to the code. It uses terraform-docs and pre-commit hooks to update module READMEs when inputs and outputs change, rather than building a documentation parser from scratch.',
  'sam-jenkins-pipeline': 'A practical CI/CD example for an AWS SAM application with several Lambda API endpoints. Jenkins builds, packages, and deploys the app to different environments; the test stages are scaffolding, so this is a pipeline exercise rather than a production template.',
  'basketball-academy-agent': 'A basketball academy website paired with a Q&A chatbot for schedules, teams, and registration questions. The frontend is React, while an n8n workflow connects Google Sheets and Gemini; player profiling and training recommendations are not part of this project.',
  'asset-inventory-automation': 'A Python tool for taking inventory of Azure resources in a subscription and resource group. Configurable extractors collect service metadata and private endpoint mappings, then export the results as JSON or Excel for review.',
  'serverless-archiveiq': 'An event-driven document classification experiment on AWS. An S3 upload triggers Lambda, which sends the document to a Bedrock AgentCore runtime and records classification results in DynamoDB and S3. The repository covers a tested development environment, not a general search or Glacier archive product.',
  'overengineered-weekend': 'A deliberately oversized solution to a bedtime reminder. Terraform wires EventBridge Scheduler, Lambda, SNS, DynamoDB, and monitoring together to explore how much cloud infrastructure a tiny notification can involve; production was run and then torn down to limit costs.',
  'muscle-insight': 'A research project on estimating muscle fatigue from wireless surface EMG sensors. The work combines BLE data collection, signal processing, per-person calibration, and regression experiments to turn raw muscle signals into fatigue measures.',
};

export const PROJECT_USE_CASES = {
  'reverse-proxy-lab': 'A small business could put its website and related services behind one HTTPS address so visitors can find everything in one place.',
  'file-secure-exchange': 'A clinic administrator could send a sensitive referral to an approved recipient through an expiring link while retaining a record of access.',
  'linkedin-llm': 'A job seeker could find people in their network working in a target industry and use the sourced answers to decide whom to contact.',
  'euroleaguetech-platform': 'A sports analyst can look up technology vendors associated with Euroleague clubs when researching adoption trends or potential partners.',
  'terraform-modules': 'A platform team can assemble a new AWS environment from shared Terraform modules while keeping resource naming and tags consistent across applications.',
  'iac-doc-generator': 'An infrastructure team can keep Terraform module documentation current so colleagues can reuse modules without relying on stale instructions.',
  'sam-jenkins-pipeline': 'A platform team could release a small serverless API to testing and production through a repeatable pipeline instead of deploying by hand.',
  'basketball-academy-agent': 'A parent can ask about teams, practice schedules, or registration on the academy site without waiting for staff to reply.',
  'asset-inventory-automation': 'An IT operations team can review Azure resources and private network connections in a shared spreadsheet before an audit or migration.',
  'serverless-archiveiq': 'A team handling incoming invoices and contracts could upload them to S3 and have them automatically classified for review instead of sorting them by hand.',
  'overengineered-weekend': 'Someone trying to stick to a bedtime routine could receive regular reminders without setting a new alarm each night.',
  'muscle-insight': 'A sports scientist could track changes in an athlete\'s muscle-fatigue signals during training to inform rest and recovery decisions.',
};
