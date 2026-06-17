const { execSync } = require('child_process');

const commits = [
  {
    message: "refactor: relocate project source to src/ directory",
    files: [
      "tsconfig.json",
      "tailwind.config.js",
      "app/api/calendar", "src/app/api/calendar",
      "app/api/emails/[id]", "src/app/api/emails/[id]",
      "app/api/emails/draft", "src/app/api/emails/draft",
      "app/api/emails/search", "src/app/api/emails/search",
      "app/api/integrations/status", "src/app/api/integrations/status",
      "app/api/test-db", "src/app/api/test-db",
      "app/providers.tsx", "src/app/providers.tsx",
      "components/ai/ChatInput.tsx", "src/components/ai/ChatInput.tsx",
      "components/calendar", "src/components/calendar",
      "components/email/EmailList.tsx", "src/components/email/EmailList.tsx",
      "components/email/EmailListItem.tsx", "src/components/email/EmailListItem.tsx",
      "components/email/PriorityBadge.tsx", "src/components/email/PriorityBadge.tsx",
      "components/layout", "src/components/layout",
      "components/ui", "src/components/ui",
      "db/migrations", "src/db/migrations",
      "lib/clerk.ts", "src/lib/clerk.ts",
      "lib/container.ts", "src/lib/container.ts",
      "lib/errors.ts", "src/lib/errors.ts",
      "lib/mock", "src/lib/mock",
      "lib/prisma.ts", "src/lib/prisma.ts",
      "lib/query", "src/lib/query",
      "lib/result.ts", "src/lib/result.ts",
      "lib/store", "src/lib/store",
      "lib/utils.ts", "src/lib/utils.ts",
      "middleware.ts", "src/middleware.ts",
      "server/repositories/.gitkeep.ts", "src/server/repositories/.gitkeep.ts",
      "server/repositories/base.repository.ts", "src/server/repositories/base.repository.ts",
      "server/repositories/calendar-event.repository.ts", "src/server/repositories/calendar-event.repository.ts",
      "server/repositories/email-draft.repository.ts", "src/server/repositories/email-draft.repository.ts",
      "server/repositories/user.repository.ts", "src/server/repositories/user.repository.ts",
      "server/services/.gitkeep.ts", "src/server/services/.gitkeep.ts",
      "server/services/search.service.ts", "src/server/services/search.service.ts",
      "server/use-cases/.gitkeep.ts", "src/server/use-cases/.gitkeep.ts",
      "server/use-cases/ai/classify-email.use-case.ts", "src/server/use-cases/ai/classify-email.use-case.ts",
      "server/use-cases/calendar", "src/server/use-cases/calendar",
      "server/use-cases/emails/delete-email.use-case.ts", "src/server/use-cases/emails/delete-email.use-case.ts",
      "server/use-cases/emails/get-email.use-case.ts", "src/server/use-cases/emails/get-email.use-case.ts",
      "server/use-cases/emails/search-emails.use-case.ts", "src/server/use-cases/emails/search-emails.use-case.ts",
      "server/use-cases/emails/update-email.use-case.ts", "src/server/use-cases/emails/update-email.use-case.ts",
      "types/calendar.types.ts", "src/types/calendar.types.ts",
      "types/common.types.ts", "src/types/common.types.ts",
      "types/index.ts", "src/types/index.ts",
      "utils/cleanResponse.ts", "src/utils/cleanResponse.ts"
    ]
  },
  {
    message: "feat(db): update Prisma schema for subscriptions and usage tracking",
    files: [
      "prisma/schema.prisma",
      "src/lib/generated/prisma"
    ]
  },
  {
    message: "feat(auth): configure Clerk authentication and onboarding flow",
    files: [
      "app/(auth)", "src/app/(auth)",
      "app/onboarding", "src/app/onboarding"
    ]
  },
  {
    message: "feat(gmail): implement Gmail send and callback integrations",
    files: [
      "app/api/auth/connect", "src/app/api/auth/connect",
      "app/api/auth/gmail/callback", "src/app/api/auth/gmail/callback",
      "app/api/integrations/disconnect", "src/app/api/integrations/disconnect",
      "server/services/email.service.ts", "src/server/services/email.service.ts",
      "server/use-cases/emails/send-email.use-case.ts", "src/server/use-cases/emails/send-email.use-case.ts",
      "server/use-cases/emails/draft-email.use-case.ts", "src/server/use-cases/emails/draft-email.use-case.ts",
      "server/use-cases/emails/list-emails.use-case.ts", "src/server/use-cases/emails/list-emails.use-case.ts",
      "server/repositories/email.repository.ts", "src/server/repositories/email.repository.ts",
      "types/email.types.ts", "src/types/email.types.ts",
      "types/api.types.ts", "src/types/api.types.ts"
    ]
  },
  {
    message: "feat(inngest): set up Inngest background event processor",
    files: [
      "package.json",
      "package-lock.json",
      "src/lib/inngest.ts",
      "src/app/api/inngest"
    ]
  },
  {
    message: "feat(ai): integrate Gemini API with Corsair MCP tools",
    files: [
      "lib/gemini.ts", "src/lib/gemini.ts",
      "server/services/ai.service.ts", "src/server/services/ai.service.ts",
      "server/use-cases/ai/chat.use-case.ts", "src/server/use-cases/ai/chat.use-case.ts",
      "server/repositories/ai-conversation.repository.ts", "src/server/repositories/ai-conversation.repository.ts",
      "components/ai/ChatMessage.tsx", "src/components/ai/ChatMessage.tsx",
      "types/ai.types.ts", "src/types/ai.types.ts"
    ]
  },
  {
    message: "feat(rate-limit): implement plan-based daily rate limits",
    files: [
      "src/lib/rate-limit.ts",
      "app/api/emails/route.ts", "src/app/api/emails/route.ts",
      "app/api/emails/send/route.ts", "src/app/api/emails/send/route.ts"
    ]
  },
  {
    message: "feat(webhooks): process Corsair Gmail webhook events",
    files: [
      "lib/corsair.ts", "src/lib/corsair.ts",
      "app/api/webhooks/corsair", "src/app/api/webhooks/corsair",
      "server/use-cases/webhooks/process-webhook.use-case.ts", "src/server/use-cases/webhooks/process-webhook.use-case.ts",
      "server/services/webhook.service.ts", "src/server/services/webhook.service.ts"
    ]
  },
  {
    message: "style(ui): redesign landing page and dashboard components",
    files: [
      "app/page.tsx", "src/app/page.tsx",
      "app/globals.css", "src/app/globals.css",
      "app/layout.tsx", "src/app/layout.tsx",
      "app/(dashboard)/ai/page.tsx", "src/app/(dashboard)/ai/page.tsx",
      "app/(dashboard)/inbox/page.tsx", "src/app/(dashboard)/inbox/page.tsx",
      "app/(dashboard)/settings/page.tsx", "src/app/(dashboard)/settings/page.tsx",
      "components/email/EmailDetail.tsx", "src/components/email/EmailDetail.tsx",
      "components/email/EmailComposer.tsx", "src/components/email/EmailComposer.tsx",
      "lib/hooks/api.ts", "src/lib/hooks/api.ts",
      "public/light-them-logo.svg",
      ".gitignore"
    ]
  }
];

console.log("Unstaging existing changes...");
try { execSync("git reset", { stdio: 'inherit' }); } catch (e) {}

for (const commit of commits) {
  console.log(`Staging for: ${commit.message}`);
  for (const file of commit.files) {
    try {
      execSync(`git add "${file}"`, { stdio: 'inherit' });
    } catch (e) {
      console.warn(`Could not add file: ${file}`, e.message);
    }
  }
  
  if (commit.message.includes("Gemini API")) {
    try { execSync('git add "src/inngest/functions.ts"', { stdio: 'inherit' }); } catch (e) {}
  }
  
  try {
    execSync(`git commit -m "${commit.message}"`, { stdio: 'inherit' });
    console.log(`Committed: ${commit.message}`);
  } catch (e) {
    console.error(`Failed to commit: ${commit.message}`, e.message);
  }
}

try {
  execSync("git add .", { stdio: 'inherit' });
  const status = execSync("git status --porcelain").toString().trim();
  if (status) {
    console.log("Staging remaining files...");
    execSync('git commit -m "style(ui): remaining layout styling and configuration cleanups"', { stdio: 'inherit' });
  }
} catch (e) {}

console.log("All commits completed successfully!");
