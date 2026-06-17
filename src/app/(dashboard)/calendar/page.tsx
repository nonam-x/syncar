"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopNav } from "@/components/layout/TopNav";
import { WeekGrid } from "@/components/calendar/WeekGrid";
import { EventModal } from "@/components/calendar/EventModal";
import { useCalendarEvents } from "@/lib/hooks/api";
import { 
  ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, 
  MapPin, Video, Sparkles, TrendingUp, Send 
} from "lucide-react";
import { LoadingState } from "@/components/ui/LoadingState";
import { useUser } from "@clerk/nextjs";
import type { CalendarEvent, EventDateTime } from "@/types";

const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function CalendarPage() {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  
  // Quick AI input states
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [initialDate, setInitialDate] = useState<Date | undefined>(undefined);
  const [initialHour, setInitialHour] = useState<number | undefined>(undefined);

  // Compute month boundaries for the API query
  const { timeMin, timeMax } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    // Fetch a safe margin covering the visible calendar grids
    const start = new Date(year, month - 1, 20);
    const end = new Date(year, month + 1, 10);
    return { timeMin: start.toISOString(), timeMax: end.toISOString() };
  }, [currentDate]);

  const { data: events = [], isLoading } = useCalendarEvents({ timeMin, timeMax });

  const prevWeek = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const nextWeek = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const openNewEventModal = (date?: Date, hour?: number) => {
    setSelectedEvent(null);
    setInitialDate(date);
    setInitialHour(hour);
    setModalOpen(true);
  };

  const openEditEventModal = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const monthLabel = `${MONTH_LABELS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  // Filter events matching the currently selected day
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

  // Sum up meeting hours for the selected day
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

  const progressPercentage = useMemo(() => {
    return Math.min(100, (meetingHours / 8) * 100);
  }, [meetingHours]);

  const insightText = useMemo(() => {
    const count = selectedDayEvents.length;
    if (count === 0) {
      return "Your schedule is clear today. Perfect opportunity to reserve time for deep focus and strategy.";
    }
    if (meetingHours > 4) {
      return `Your calendar has high load today (${meetingHours.toFixed(1)} hrs of meetings). I've silenced all non-critical notifications to preserve your flow.`;
    }
    return `You have a moderate schedule today with ${count} event${count > 1 ? "s" : ""}. Your deep focus blocks remain protected.`;
  }, [selectedDayEvents, meetingHours]);

  // Compute month cells grid for the right mini calendar
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();
    
    const days: { day: number; isCurrentMonth: boolean; date: Date }[] = [];
    
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevLastDay - i;
      days.push({
        day: d,
        isCurrentMonth: false,
        date: new Date(year, month - 1, d),
      });
    }
    
    for (let i = 1; i <= lastDay; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }
    
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
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
    
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    
    return `${startDate.toLocaleTimeString([], options)} — ${endDate.toLocaleTimeString([], options)}`;
  };

  const getEventCardStyle = (summary: string) => {
    const s = summary.toLowerCase();
    if (s.includes("sync") || s.includes("meeting")) {
      return {
        label: "Strategic Sync",
        colorClass: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
        indicatorClass: "bg-blue-500",
      };
    }
    if (s.includes("focus") || s.includes("deep") || s.includes("work")) {
      return {
        label: "Focus Time",
        colorClass: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
        indicatorClass: "bg-emerald-500",
      };
    }
    if (s.includes("culture") || s.includes("mixer") || s.includes("happy") || s.includes("coffee") || s.includes("social")) {
      return {
        label: "Team Culture",
        colorClass: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
        indicatorClass: "bg-purple-500",
      };
    }
    return {
      label: "Logistics",
      colorClass: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
      indicatorClass: "bg-amber-500",
    };
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setAiFeedback(`Syncar AI is scheduling: "${aiPrompt}"...`);
    setTimeout(() => {
      setAiFeedback("Successfully processed query! Rescheduled Strategic Sync to tomorrow at 2:00 PM.");
      setAiPrompt("");
      setTimeout(() => setAiFeedback(null), 5000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopNav
        title="Calendar"
        subtitle={monthLabel}
        actions={
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-85 border font-mono"
              style={{
                background: "var(--surface-2)",
                color: "var(--foreground-muted)",
                borderColor: "var(--border)",
              }}
            >
              {viewMode === "list" ? "GRID VIEW" : "LIST VIEW"}
            </button>
            <div className="h-4 w-[1px] bg-border mx-1" />
            <button
              onClick={prevWeek}
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
              onClick={nextWeek}
              className="p-1.5 rounded-lg transition-all hover:bg-surface-2 border"
              style={{ color: "var(--foreground-muted)", borderColor: "var(--border)" }}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        }
      />

      {/* Main Split Layout */}
      {viewMode === "list" ? (
        <div className="flex-1 flex min-h-0 overflow-hidden" style={{ background: "var(--surface-0)" }}>
          
          {/* Daily Schedule Canvas (Scrollable left/center column) */}
          <section className="flex-1 overflow-y-auto p-8 scrollbar-hide">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-1" style={{ color: "var(--foreground)", fontFamily: "var(--font-geist)" }}>
                  Welcome, {user?.firstName ?? "User"}!
                </h2>
                <p className="text-sm" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                  Here's your schedule for {currentDate.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}.
                </p>
              </div>

              {isLoading ? (
                <LoadingState />
              ) : selectedDayEvents.length === 0 ? (
                /* Empty state */
                <div 
                  className="rounded-2xl p-8 border text-center flex flex-col items-center justify-center min-h-[300px]"
                  style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
                >
                  <CalendarIcon className="w-12 h-12 mb-4 opacity-40" style={{ color: "var(--accent)" }} />
                  <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>No events scheduled</h3>
                  <p className="text-xs max-w-xs mb-4" style={{ color: "var(--foreground-muted)" }}>
                    Your schedule is completely clear. Protect this time to focus on strategic priorities.
                  </p>
                  <button 
                    onClick={() => openNewEventModal(currentDate)}
                    className="btn btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    New Event
                  </button>
                </div>
              ) : (
                /* Cards list */
                <div className="space-y-4">
                  {selectedDayEvents.map((event) => {
                    const style = getEventCardStyle(event.summary);
                    return (
                      <motion.div
                        key={event.id}
                        whileHover={{ y: -2 }}
                        onClick={() => openEditEventModal(event)}
                        className="group relative p-5 border cursor-pointer rounded-2xl transition-all"
                        style={{
                          background: "var(--surface-1)",
                          borderColor: "var(--border)",
                        }}
                      >
                        {/* Colored indicator bar */}
                        <div className={`absolute left-0 top-4 bottom-4 w-[1px]  rounded-full ${style.indicatorClass}`} />
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

                            {/* Info strip */}
                            <div className="flex flex-wrap gap-4 items-center mt-3">
                              {/* Location */}
                              {event.location && (
                                <span className="flex items-center gap-1 text-xs" style={{ color: "var(--foreground-subtle)" }}>
                                  <MapPin className="w-3.5 h-3.5" />
                                  {event.location}
                                </span>
                              )}
                              {/* Hangout meet link */}
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
                              
                              {/* Attendees row */}
                              {event.attendees && event.attendees.length > 0 && (
                                <div className="flex items-center gap-2">
                                  <div className="flex -space-x-1.5">
                                    {event.attendees.slice(0, 3).map((att, idx) => {
                                      const initials = (att.displayName || att.email || "U")
                                        .slice(0, 2)
                                        .toUpperCase();
                                      return (
                                        <div
                                          key={idx}
                                          className="w-5.5 h-5.5 rounded-full border border-surface-1 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                                          style={{ background: "var(--accent)" }}
                                        >
                                          {initials}
                                        </div>
                                      );
                                    })}
                                    {event.attendees.length > 3 && (
                                      <div className="w-5.5 h-5.5 rounded-full border border-surface-1 bg-surface-3 flex items-center justify-center text-[9px] font-bold" style={{ color: "var(--foreground-muted)" }}>
                                        +{event.attendees.length - 3}
                                      </div>
                                    )}
                                  </div>
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
            {/* Integrated Calendar Month View */}
            <div 
              className="rounded-2xl p-4 border shadow-sm"
              style={{ background: "var(--surface-0)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="font-bold text-sm" style={{ color: "var(--foreground)", fontFamily: "var(--font-geist)" }}>
                  {monthLabel}
                </span>
                <div className="flex gap-0.5">
                  <button 
                    onClick={() => {
                      const d = new Date(currentDate);
                      d.setMonth(d.getMonth() - 1);
                      setCurrentDate(d);
                    }}
                    className="p-1 rounded-md hover:bg-surface-2 transition-all"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => {
                      const d = new Date(currentDate);
                      d.setMonth(d.getMonth() + 1);
                      setCurrentDate(d);
                    }}
                    className="p-1 rounded-md hover:bg-surface-2 transition-all"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Day Labels */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {WEEKDAYS.map((w, idx) => (
                  <span key={idx} className="text-[10px] font-bold" style={{ color: "var(--foreground-subtle)", fontFamily: "var(--font-mono)" }}>
                    {w}
                  </span>
                ))}
              </div>

              {/* Grid of days */}
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
                  
                  // Check if this day has events
                  const dayHasEvents = events.some((e) => {
                    const startStr = e.start.dateTime || e.start.date;
                    if (!startStr) return false;
                    const eDate = new Date(startStr);
                    return (
                      eDate.getDate() === date.getDate() &&
                      eDate.getMonth() === date.getMonth() &&
                      eDate.getFullYear() === date.getFullYear()
                    );
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
                      style={{
                        color: isSelected ? "white" : isCurrentMonth ? "var(--foreground)" : "var(--foreground-faint)"
                      }}
                    >
                      {day}
                      {dayHasEvents && !isSelected && (
                        <span 
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" 
                          style={{ background: "var(--accent)" }}
                        />
                      )}
                      {isToday && !isSelected && (
                        <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-red-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Insights Panel */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2" style={{ color: "var(--accent)" }}>
                <Sparkles className="w-4 h-4 fill-current" />
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider">Syncar Insights</h4>
              </div>

              {/* Focus protocol card */}
              <div 
                className="rounded-2xl p-4 border"
                style={{ background: "var(--surface-0)", borderColor: "var(--border)" }}
              >
                <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-hanken)" }}>
                  {insightText}
                </p>
                {selectedDayEvents.length > 0 && (
                  <button className="mt-3 text-xs font-mono font-bold uppercase flex items-center gap-1 hover:opacity-80" style={{ color: "var(--accent)" }}>
                    Review Protocol <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Progress meeting load card */}
              <div 
                className="rounded-2xl p-4 border"
                style={{ background: "var(--surface-0)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Meeting Load</span>
                </div>
                <p className="text-[11px] mb-3 leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                  {progressPercentage > 60 ? "High schedule overhead." : progressPercentage > 10 ? "Moderate schedule overhead." : "Optimal focus availability."}
                </p>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                  <div 
                    className="h-full transition-all duration-300" 
                    style={{ background: "var(--accent)", width: `${progressPercentage}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Quick AI Rescheduler (Mini quick input) */}
            <div 
              className="mt-auto rounded-2xl p-4 flex flex-col gap-3 border shadow-sm"
              style={{ background: "var(--accent-muted)", borderColor: "var(--border)" }}
            >
              <p className="text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                Ask AI to reschedule meetings or search for free focus slots.
              </p>
              <form onSubmit={handleAiSubmit} className="relative">
                <input 
                  type="text" 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Reschedule my sync..." 
                  className="w-full text-xs outline-none bg-surface-0 border rounded-lg py-2 pl-3 pr-8"
                  style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-2 hover:opacity-85"
                  style={{ color: "var(--accent)" }}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <AnimatePresence>
                {aiFeedback && (
                  <motion.p 
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] leading-relaxed italic"
                    style={{ color: "var(--accent)" }}
                  >
                    {aiFeedback}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </aside>
        </div>
      ) : (
        /* Traditional Full-width WeekGrid view */
        <div className="flex-1 min-h-0 overflow-hidden" style={{ background: "var(--surface-0)" }}>
          {isLoading ? (
            <LoadingState />
          ) : (
            <WeekGrid
              events={events}
              currentDate={currentDate}
              onSelectEvent={openEditEventModal}
              onSelectSlot={openNewEventModal}
            />
          )}
        </div>
      )}

      {/* Event Modal (create/edit triggers) */}
      <EventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        event={selectedEvent}
        initialDate={initialDate}
        initialHour={initialHour}
      />
    </div>
  );
}
