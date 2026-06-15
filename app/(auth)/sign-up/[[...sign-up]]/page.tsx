import { SignUp } from "@clerk/nextjs";
import { Brand } from "@/components/ui/Brand";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <div className="flex flex-col items-center gap-8">
        <Brand size="lg" layout="vertical" />
        <SignUp
          fallbackRedirectUrl="/inbox"
          forceRedirectUrl="/inbox"
        />
      </div>
    </div>
  );
}
