import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { prisma } from "@/lib/prisma";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  // Check if both integrations are connected
  const accounts = await prisma.corsairAccount.findMany({
    where: {
      tenantId: userId,
    },
    include: {
      integration: true,
    },
  });

  const gmailConnected = accounts.some((acc) => acc.integration.name === "gmail");
  const calendarConnected = accounts.some((acc) => acc.integration.name === "googlecalendar");

  if (!gmailConnected || !calendarConnected) {
    redirect("/onboarding");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
