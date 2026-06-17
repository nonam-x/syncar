import { create } from "zustand";

export type ActiveView =
  | "inbox"
  | "priority"
  | "drafts"
  | "sent"
  | "calendar"
  | "ai"
  | "search"
  | "settings";

interface UIStore {
  // Sidebar
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  toggleSidebar: () => void;

  // Active view
  activeView: ActiveView;
  setActiveView: (v: ActiveView) => void;

  // Email selection
  selectedEmailId: string | null;
  setSelectedEmailId: (id: string | null) => void;

  // Composer
  composerOpen: boolean;
  composerPreset: {
    to?: string;
    subject?: string;
    body?: string;
    threadId?: string;
  } | null;
  setComposerOpen: (v: boolean, preset?: UIStore["composerPreset"]) => void;

  // Command palette
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (v: boolean) => void;

  // Search modal
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;

  // Theme
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarCollapsed: false,
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  toggleSidebar: () =>
    set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  activeView: "inbox",
  setActiveView: (v) => set({ activeView: v }),

  selectedEmailId: null,
  setSelectedEmailId: (id) => set({ selectedEmailId: id }),

  composerOpen: false,
  composerPreset: null,
  setComposerOpen: (v, preset = null) => set({ composerOpen: v, composerPreset: preset }),

  commandPaletteOpen: false,
  setCommandPaletteOpen: (v) => set({ commandPaletteOpen: v }),

  searchOpen: false,
  setSearchOpen: (v) => set({ searchOpen: v }),

  theme: "light",
  setTheme: (theme) => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      localStorage.setItem("theme", theme);
    }
    set({ theme });
  },
  toggleTheme: () => {
    set((s) => {
      const nextTheme = s.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        const root = window.document.documentElement;
        if (nextTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
        localStorage.setItem("theme", nextTheme);
      }
      return { theme: nextTheme };
    });
  },
}));
