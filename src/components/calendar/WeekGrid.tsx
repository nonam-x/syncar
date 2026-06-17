"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { CalendarEvent } from "@/types";
import { EventCard } from "./EventCard";
import { cn } from "@/lib/utils";

interface WeekGridProps {
  events: CalendarEvent[];
  currentDate?: Date;
  onSelectEvent?: (event: CalendarEvent) => void;
  onSelectSlot?: (date: Date, hour: number) => void;
}

const HOURS = Array.from({ length: 16 }, (_, i) => i + 6); // 6 AM to 9 PM

function getDayStart(dateInput: Date | string) {
  const d = dateInput instanceof Date ? new Date(dateInput.getTime()) : new Date(dateInput);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekDays(dateInput: Date | string): Date[] {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  const day = date.getDay();
  const monday = new Date(date.getTime());
  monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday.getTime());
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function getEventPositioning(event: CalendarEvent, dayStart: Date) {
  if (!event.start.dateTime || !event.end.dateTime) return null;
  const start = new Date(event.start.dateTime);
  const end   = new Date(event.end.dateTime);
  const dayStartMs = getDayStart(dayStart).getTime();
  const gridStart  = dayStartMs + 6 * 3600000; // 6 AM
  const gridEnd    = dayStartMs + 22 * 3600000; // 10 PM
  const gridLength = gridEnd - gridStart;
  const startOffset = Math.max(0, start.getTime() - gridStart);
  const duration    = Math.min(end.getTime() - start.getTime(), gridEnd - start.getTime());
  return {
    top:    (startOffset / gridLength) * 100,
    height: Math.max((duration / gridLength) * 100, 2),
  };
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export function WeekGrid({ events, currentDate = new Date(), onSelectEvent, onSelectSlot }: WeekGridProps) {
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);
  const today = getDayStart(new Date());

  return (
    <div className="flex flex-col h-full">
      {/* Day headers */}
      <div className="flex flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
        {/* Time gutter */}
        <div className="w-14 flex-shrink-0" />
        {weekDays.map((day, i) => {
          const isToday = getDayStart(day).getTime() === today.getTime();
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center py-2 text-xs"
              style={{ borderLeft: "1px solid var(--border)" }}
            >
              <span
                style={{
                  color: isToday ? "var(--accent)" : "var(--foreground-muted)",
                  fontWeight: isToday ? 600 : 400,
                }}
              >
                {DAY_LABELS[i]}
              </span>
              <span
                className={cn(
                  "text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full mt-0.5",
                  isToday && "text-white"
                )}
                style={{
                  background: isToday ? "var(--accent)" : "transparent",
                  color: isToday ? "white" : "var(--foreground)",
                }}
              >
                {day.getDate()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex flex-1 overflow-y-auto">
        {/* Hour labels */}
        <div className="w-14 flex-shrink-0 select-none">
          {HOURS.map((h) => (
            <div
              key={h}
              className="h-14 flex items-start justify-end pr-2 pt-0.5 text-xs"
              style={{ color: "var(--foreground-subtle)" }}
            >
              {h === 12 ? "12 PM" : h < 12 ? `${h} AM` : `${h - 12} PM`}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, dayIdx) => {
          const isToday = getDayStart(day).getTime() === today.getTime();
          const dayEvents = events.filter((e) => {
            if (!e.start.dateTime) return false;
            const eDay = getDayStart(new Date(e.start.dateTime));
            return eDay.getTime() === getDayStart(day).getTime();
          });

          return (
            <div
              key={dayIdx}
              className="flex-1 relative"
              style={{
                borderLeft: "1px solid var(--border)",
                background: isToday ? "var(--accent-muted)" : "transparent",
              }}
            >
              {/* Hour lines */}
              {HOURS.map((h) => (
                <div
                  key={h}
                  onClick={() => onSelectSlot?.(day, h)}
                  className="h-14 cursor-pointer hover:opacity-30 hover:bg-neutral-500/10 transition-all"
                  style={{ borderBottom: "1px solid var(--border-subtle)" }}
                />
              ))}

              {/* Events */}
              {dayEvents.map((event) => {
                const pos = getEventPositioning(event, day);
                if (!pos) return null;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent?.(event);
                    }}
                    className="absolute left-0.5 right-0.5"
                    style={{
                      top: `${pos.top}%`,
                      height: `${pos.height}%`,
                      minHeight: "24px",
                      zIndex: 1,
                    }}
                  >
                    <EventCard event={event} compact={pos.height < 6} />
                  </motion.div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
