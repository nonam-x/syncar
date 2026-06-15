"use client";

import { useState } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { motion } from "framer-motion";
import { useDrafts, useDeleteDraft } from "@/lib/hooks/api";
import { FileText, Pencil, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { formatRelativeTime } from "@/lib/utils";
import { useUIStore } from "@/lib/store/ui.store";
import type { EmailDraft } from "@/types";

export default function DraftsPage() {
  const { setComposerOpen } = useUIStore();
  const { data: drafts = [], isLoading, error } = useDrafts();
  const deleteDraft = useDeleteDraft();
  const [draftToDelete, setDraftToDelete] = useState<string | null>(null);

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <TopNav title="Drafts" subtitle="Error loading drafts" />
        <div className="flex-1 overflow-y-auto p-6">
          <ErrorState message={(error as Error).message} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <TopNav title="Drafts" subtitle={isLoading ? "Loading…" : `${drafts.length} unsent messages`} />
      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <LoadingState />
        ) : drafts.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-8 h-8" />}
            title="No drafts"
            description="Saved drafts will appear here"
            action={
              <button
                onClick={() => setComposerOpen(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                style={{ background: "var(--accent)" }}
              >
                Compose
              </button>
            }
          />
        ) : (
          <div className="max-w-2xl mx-auto space-y-3">
            {drafts.map((draft: EmailDraft, i: number) => (
              <motion.div
                key={draft.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-start gap-4 p-4 rounded-xl cursor-pointer hover:opacity-90 transition-all"
                style={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--warning-muted)", color: "var(--warning)" }}
                >
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                      {draft.subject || "(No subject)"}
                    </p>
                    <span className="text-xs flex-shrink-0 ml-2" style={{ color: "var(--foreground-muted)" }}>
                      {formatRelativeTime(new Date(draft.updatedAt))}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>
                    To: {draft.to?.map((r) => r.name || r.email).join(", ") || "—"}
                  </p>
                  <p className="text-xs mt-1 truncate" style={{ color: "var(--foreground-subtle)" }}>
                    {draft.body}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setComposerOpen(true)}
                    className="p-1.5 rounded-md hover:opacity-70 transition-all"
                    style={{ color: "var(--accent)" }}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDraftToDelete(draft.id);
                    }}
                    className="p-1.5 rounded-md hover:opacity-70 transition-all"
                    style={{ color: "var(--danger)" }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!draftToDelete}
        onClose={() => setDraftToDelete(null)}
        onConfirm={() => {
          if (draftToDelete) {
            deleteDraft.mutate(draftToDelete);
            setDraftToDelete(null);
          }
        }}
        title="Delete Draft"
        description="Are you sure you want to delete this draft? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        isLoading={deleteDraft.isPending}
      />
    </div>
  );
}
