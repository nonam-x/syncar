import { SignUp } from "@clerk/nextjs";
import { Brand } from "@/components/ui/Brand";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 gradient-mesh relative landing-page">
      {/* Back to Home link */}
      <div className="absolute top-8 left-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#eceae4] dark:border-[#23252a] bg-white dark:bg-[#0f1011] text-[#1c1c1c]/70 dark:text-[#f7f8f8]/70 hover:text-[#1c1c1c] dark:hover:text-[#f7f8f8] hover:border-[#1c1c1c]/25 dark:hover:border-[#f7f8f8]/25 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Syncar
        </Link>
      </div>

      <div className="flex flex-col items-center gap-5 w-full max-w-[360px] z-10">
        <Brand size="md" layout="vertical" />
        <div className="w-full relative">
          <SignUp
            fallbackRedirectUrl="/inbox"
            forceRedirectUrl="/inbox"
          />
        </div>
      </div>
    </div>
  );
}
