import { DemoProvider } from "@/lib/demo/demo.context";
import { DemoShell } from "@/components/demo/DemoShell";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider>
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <DemoShell>{children}</DemoShell>
      </div>
    </DemoProvider>
  );
}
