"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoMode } from "@/lib/demo/demo.context";
import {
  ChevronLeft, ChevronRight, Calendar as CalendarIcon,
  MapPin, Video, Sparkles, TrendingUp, Send,
} from "lucide-react";
import type { CalendarEvent, EventDateTime } from "@/types";

const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function DemoCalendarPage() {
  const { calendarEvents: events } = useDemoMode();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [rescheduleInput, setRescheduleInput] = useState("");
  const [rescheduleMsg, setRescheduleMsg] = useState("");

  const monthLabel = `${MONTH_LABELS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const selectedDayEvents = useMemo(() => {
    return events.filter((e) => {
      const startStr = e.start.dateTime || e.start.date;
      if (!startStr) return false;
      const eDate = new Date(startStr);
      return (
        eDate.getDate() === currentDate.getDate() &&
        eDate.getMonth() === currentDate.getMonth() &&
        eDate.getFullYear() === currentDate.getFullYear()
      );
    });
  }, [events, currentDate]);

  const meetingHours = useMemo(() => {
    return selectedDayEvents.reduce((acc, e) => {
      const startStr = e.start.dateTime || e.start.date;
      const endStr = e.end.dateTime || e.end.date;
      if (!startStr || !endStr) return acc;
      const start = new Date(startStr);
      const end = new Date(endStr);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return acc;
      return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    }, 0);
  }, [selectedDayEvents]);

  const progressPercentage = useMemo(() => Math.min(100, (meetingHours / 8) * 100), [meetingHours]);

  const insightText = useMemo(() => {
    const count = selectedDayEvents.length;
    if (count === 0) return "Your schedule is clear today. Perfect opportunity to reserve time for deep focus and strategy.";
    if (meetingHours > 4) return `Your calendar has high load today (${meetingHours.toFixed(1)} hrs). Syncar has silenced non-critical notifications to preserve your flow.`;
    return `You have a moderate schedule today with ${count} event${count > 1 ? "s" : ""}. Your deep focus blocks remain protected.`;
  }, [selectedDayEvents, meetingHours]);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();
    const days: { day: number; isCurrentMonth: boolean; date: Date }[] = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevLastDay - i;
      days.push({ day: d, isCurrentMonth: false, date: new Date(year, month - 1, d) });
    }
    for (let i = 1; i <= lastDay; i++) {
      days.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, isCurrentMonth: false, date: new Date(year, month + 1, i) });
    }
    return days;
  }, [currentDate]);

  const formatTimeRange = (start: EventDateTime, end: EventDateTime) => {
    const startStr = start.dateTime || start.date;
    const endStr = end.dateTime || end.date;
    if (!startStr || !endStr) return "";
    if (start.date) return "ALL DAY";
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
    return `${startDate.toLocaleTimeString([], options)} — ${endDate.toLocaleTimeString([], options)}`;
  };

  const getEventCardStyle = (summary: string) => {
    const s = summary.toLowerCase();
    if (s.includes("sync") || s.includes("meeting") || s.includes("call") || s.includes("review") || s.includes("retro") || s.includes("hands")) {
      return { label: "Strategic Sync", colorClass: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20", indicatorClass: "bg-blue-500" };
    }
    if (s.includes("focus") || s.includes("deep") || s.includes("work")) {
      return { label: "Focus Time", colorClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20", indicatorClass: "bg-emerald-500" };
    }
    return { label: "Logistics", colorClass: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20", indicatorClass: "bg-amber-500" };
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Page nav header */}
      <div
        className="flex items-center h-14 px-5 flex-shrink-0 gap-4"
        style={{ background: "var(--surface-1)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold leading-none" style={{ color: "var(--foreground)" }}>Calendar</h1>
          <p className="text-xs mt-0.5 truncate" style={{ color: "var(--foreground-muted)" }}>{monthLabel}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { const d = new Date(currentDate); d.setDate(d.getDate() - 7); setCurrentDate(d); }}
            className="p-1.5 rounded-lg transition-all hover:bg-surface-2 border"
            style={{ color: "var(--foreground-muted)", borderColor: "var(--border)" }}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-surface-2 border"
            style={{ color: "var(--foreground-muted)", borderColor: "var(--border)" }}
          >
            Today
          </button>
          <button
            onClick={() => { const d = new Date(currentDate); d.setDate(d.getDate() + 7); setCurrentDate(d); }}
            className="p-1.5 rounded-lg transition-all hover:bg-surface-2 border"
            style={{ color: "var(--foreground-muted)", borderColor: "var(--border)" }}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex min-h-0 overflow-hidden" style={{ background: "var(--surface-0)" }}>

        {/* Daily schedule canvas */}
        <section className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ color: "var(--foreground)", fontFamily: "var(--font-geist)" }}>
                Welcome, Alex!
              </h2>
              <p className="text-sm" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                Here's your schedule for {currentDate.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}.
              </p>
            </div>

            {selectedDayEvents.length === 0 ? (
              <div
                className="rounded-2xl p-8 border text-center flex flex-col items-center justify-center min-h-[300px]"
                style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
              >
                <CalendarIcon className="w-12 h-12 mb-4 opacity-40" style={{ color: "var(--accent)" }} />
                <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>No events scheduled</h3>
                <p className="text-xs max-w-xs mb-4" style={{ color: "var(--foreground-muted)" }}>
                  Navigate to another day to see mock events, or use the week arrows above.
                </p>
                <button
                  onClick={() => {}}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
                  style={{ background: "var(--accent)", color: "white" }}
                >
                  New Event
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDayEvents.map((event) => {
                  const style = getEventCardStyle(event.summary);
                  return (
                    <motion.div
                      key={event.id}
                      whileHover={{ y: -2 }}
                      className="group relative p-5 border cursor-pointer rounded-2xl transition-all"
                      style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
                    >
                      <div className={`absolute left-0 top-4 bottom-4 w-[1px] rounded-full ${style.indicatorClass}`} />
                      <div className="flex justify-between items-start pl-3">
                        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: "var(--foreground-muted)" }}>
                              {formatTimeRange(event.start, event.end)}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] uppercase font-bold border ${style.colorClass}`}>
                              {style.label}
                            </span>
                          </div>
                          <h3 className="text-base font-bold tracking-tight" style={{ color: "var(--foreground)", fontFamily: "var(--font-geist)" }}>
                            {event.summary}
                          </h3>
                          {event.description && (
                            <p className="text-xs line-clamp-2 mt-1 leading-relaxed" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                              {event.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 items-center mt-3">
                            {event.location && (
                              <span className="flex items-center gap-1 text-xs" style={{ color: "var(--foreground-subtle)" }}>
                                <MapPin className="w-3.5 h-3.5" />
                                {event.location}
                              </span>
                            )}
                            {event.hangoutLink && (
                              <a
                                href={event.hangoutLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 text-xs hover:underline"
                                style={{ color: "var(--accent)" }}
                              >
                                <Video className="w-3.5 h-3.5" />
                                Google Meet
                              </a>
                            )}
                            {event.attendees && event.attendees.length > 0 && (
                              <div className="flex -space-x-1.5">
                                {event.attendees.slice(0, 3).map((att, idx) => {
                                  const initials = (att.displayName || att.email || "U").slice(0, 2).toUpperCase();
                                  return (
                                    <div
                                      key={idx}
                                      className="w-5 h-5 rounded-full border border-surface-1 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                                      style={{ background: "var(--accent)" }}
                                    >
                                      {initials}
                                    </div>
                                  );
                                })}
                                {event.attendees.length > 3 && (
                                  <div className="w-5 h-5 rounded-full border border-surface-1 bg-surface-3 flex items-center justify-center text-[9px] font-bold" style={{ color: "var(--foreground-muted)" }}>
                                    +{event.attendees.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Right Utility Panel */}
        <aside
          className="w-80 flex flex-col gap-6 p-6 overflow-y-auto border-l scrollbar-hide"
          style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
        >
          {/* Mini month calendar */}
          <div className="rounded-2xl p-4 border shadow-sm" style={{ background: "var(--surface-0)", borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="font-bold text-sm" style={{ color: "var(--foreground)", fontFamily: "var(--font-geist)" }}>{monthLabel}</span>
              <div className="flex gap-0.5">
                <button
                  onClick={() => { const d = new Date(currentDate); d.setMonth(d.getMonth() - 1); setCurrentDate(d); }}
                  className="p-1 rounded-md hover:bg-surface-2 transition-all"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { const d = new Date(currentDate); d.setMonth(d.getMonth() + 1); setCurrentDate(d); }}
                  className="p-1 rounded-md hover:bg-surface-2 transition-all"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {WEEKDAYS.map((w, idx) => (
                <span key={idx} className="text-[10px] font-bold" style={{ color: "var(--foreground-subtle)", fontFamily: "var(--font-mono)" }}>{w}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center font-sans text-xs">
              {calendarDays.map(({ day, isCurrentMonth, date }) => {
                const isSelected =
                  date.getDate() === currentDate.getDate() &&
                  date.getMonth() === currentDate.getMonth() &&
                  date.getFullYear() === currentDate.getFullYear();
                const isToday =
                  date.getDate() === new Date().getDate() &&
                  date.getMonth() === new Date().getMonth() &&
                  date.getFullYear() === new Date().getFullYear();
                const dayHasEvents = events.some((e) => {
                  const startStr = e.start.dateTime || e.start.date;
                  if (!startStr) return false;
                  const eDate = new Date(startStr);
                  return eDate.getDate() === date.getDate() && eDate.getMonth() === date.getMonth() && eDate.getFullYear() === date.getFullYear();
                });
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => setCurrentDate(date)}
                    className={`py-1.5 rounded-lg transition-all relative font-medium ${
                      isSelected
                        ? "bg-accent text-white hover:bg-accent font-bold"
                        : isCurrentMonth
                        ? "hover:bg-surface-2"
                        : "text-foreground-faint hover:bg-surface-2"
                    }`}
                    style={{ color: isSelected ? "white" : isCurrentMonth ? "var(--foreground)" : "var(--foreground-faint)" }}
                  >
                    {day}
                    {dayHasEvents && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "var(--accent)" }} />
                    )}
                    {isToday && !isSelected && (
                      <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-red-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Insights */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2" style={{ color: "var(--accent)" }}>
              <Sparkles className="w-4 h-4 fill-current" />
              <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider">Syncar Insights</h4>
            </div>

            <div className="rounded-2xl p-4 border" style={{ background: "var(--surface-0)", borderColor: "var(--border)" }}>
              <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                {insightText}
              </p>
            </div>

            <div className="rounded-2xl p-4 border" style={{ background: "var(--surface-0)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4" style={{ color: "var(--accent)" }} />
                <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Meeting Load</span>
              </div>
              <p className="text-[11px] mb-3 leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                {progressPercentage > 60 ? "High schedule overhead." : progressPercentage > 10 ? "Moderate schedule overhead." : "Optimal focus availability."}
              </p>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                <div className="h-full transition-all duration-300" style={{ background: "var(--accent)", width: `${progressPercentage}%` }} />
              </div>
            </div>
          </div>

          {/* AI rescheduler */}
          <div
            className="mt-auto rounded-2xl p-4 flex flex-col gap-3 border shadow-sm"
            style={{ background: "var(--accent-muted)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-1.5" style={{ color: "var(--accent)" }}>
              <Sparkles className="w-3.5 h-3.5" />
              <p className="text-xs font-semibold">AI Rescheduler</p>
            </div>
            {rescheduleMsg ? (
              <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{rescheduleMsg}</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (rescheduleInput.trim()) {
                    setRescheduleMsg("✅ Done! Your request has been processed.");
                    setRescheduleInput("");
                  }
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={rescheduleInput}
                  onChange={(e) => setRescheduleInput(e.target.value)}
                  placeholder="Reschedule my sync..."
                  className="flex-1 text-xs outline-none rounded-lg py-2 pl-3 pr-2"
                  style={{ background: "var(--surface-0)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                />
                <button
                  type="submit"
                  className="p-2 rounded-lg flex-shrink-0 transition-all hover:opacity-80"
                  style={{ background: "var(--accent)", color: "white" }}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
