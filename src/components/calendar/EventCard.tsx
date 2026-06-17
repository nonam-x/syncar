"use client";

import { motion } from "framer-motion";
import type { CalendarEvent } from "@/types";
import { EVENT_COLORS } from "@/lib/mock/calendar.mock";
import { cn, formatTime } from "@/lib/utils";
import { Users, MapPin, Video } from "lucide-react";

interface EventCardProps {
  event: CalendarEvent;
  style?: React.CSSProperties;
  compact?: boolean;
}

export function EventCard({ event, style, compact }: EventCardProps) {
  const color = event.colorId ? EVENT_COLORS[event.colorId] ?? "var(--accent)" : "var(--accent)";
  const startTime = event.start.dateTime ? new Date(event.start.dateTime) : null;
  const endTime   = event.end.dateTime   ? new Date(event.end.dateTime)   : null;
  const isTentative = event.status === "tentative";

  return (
    <motion.div
      whileHover={{ scale: 1.01, zIndex: 10 }}
      transition={{ duration: 0.1 }}
      className={cn(
        "rounded-md px-2 py-1 cursor-pointer overflow-hidden transition-all",
        isTentative && "opacity-70"
      )}
      style={{
        background: `color-mix(in srgb, ${color} 10%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
        borderLeft: `3px solid ${color}`,
        ...style,
      }}
    >
      <p
        className="text-xs font-semibold leading-snug truncate"
        style={{ color }}
      >
        {event.summary}
      </p>
      {!compact && startTime && endTime && (
        <p className="text-xs mt-0.5 truncate" style={{ color: `${color}cc` }}>
          {formatTime(startTime)} – {formatTime(endTime)}
        </p>
      )}
      {!compact && event.attendees.length > 0 && (
        <div className="flex items-center gap-1 mt-1">
          {event.hangoutLink && <Video className="w-2.5 h-2.5" style={{ color: `${color}cc` }} />}
          {event.location && <MapPin className="w-2.5 h-2.5" style={{ color: `${color}cc` }} />}
          {event.attendees.length > 0 && (
            <div className="flex items-center gap-0.5">
              <Users className="w-2.5 h-2.5" style={{ color: `${color}cc` }} />
              <span className="text-xs" style={{ color: `${color}cc` }}>
                {event.attendees.length}
              </span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
