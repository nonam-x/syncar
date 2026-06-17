"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, AlignLeft, Users, Trash2, Save } from "lucide-react";
import { useCreateCalendarEvent, useUpdateCalendarEvent, useDeleteCalendarEvent } from "@/lib/hooks/api";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import type { CalendarEvent } from "@/types";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null; // Null means create mode
  initialDate?: Date;
  initialHour?: number;
}

export function EventModal({ isOpen, onClose, event, initialDate, initialHour }: EventModalProps) {
  const createEvent = useCreateCalendarEvent();
  const updateEvent = useUpdateCalendarEvent();
  const deleteEvent = useDeleteCalendarEvent();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [summary, setSummary] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [attendeesStr, setAttendeesStr] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setErrorMsg("");
      if (event) {
        setSummary(event.summary);
        setLocation(event.location || "");
        setDescription(event.description || "");
        setAttendeesStr(event.attendees.map(a => a.email).join(", "));
        
        if (event.start.dateTime) {
          const startDate = new Date(event.start.dateTime);
          const endDate = new Date(event.end.dateTime!);
          
          setDateStr(startDate.toISOString().split("T")[0]);
          
          const pad = (n: number) => String(n).padStart(2, "0");
          setStartTime(`${pad(startDate.getHours())}:${pad(startDate.getMinutes())}`);
          setEndTime(`${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`);
        } else if (event.start.date) {
          setDateStr(event.start.date);
          setStartTime("09:00");
          setEndTime("10:00");
        }
      } else {
        // Create mode
        setSummary("");
        setLocation("");
        setDescription("");
        setAttendeesStr("");
        
        const baseDate = initialDate || new Date();
        setDateStr(baseDate.toISOString().split("T")[0]);
        
        const hour = initialHour !== undefined ? initialHour : 9;
        const pad = (n: number) => String(n).padStart(2, "0");
        setStartTime(`${pad(hour)}:00`);
        setEndTime(`${pad(hour + 1)}:00`);
      }
    }
  }, [isOpen, event, initialDate, initialHour]);

  const handleSave = () => {
    if (!summary.trim()) {
      setErrorMsg("Title is required");
      return;
    }

    const startDateTime = new Date(`${dateStr}T${startTime}:00`).toISOString();
    const endDateTime = new Date(`${dateStr}T${endTime}:00`).toISOString();

    const attendeeList = attendeesStr
      .split(",")
      .map(e => e.trim())
      .filter(Boolean)
      .map(email => ({ email }));

    const eventPayload = {
      summary,
      location: location || undefined,
      description: description || undefined,
      start: { dateTime: startDateTime },
      end: { dateTime: endDateTime },
      attendees: attendeeList.length > 0 ? attendeeList : undefined,
    };

    if (event) {
      updateEvent.mutate(
        { id: event.id, ...eventPayload },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (err: any) => {
            setErrorMsg(err.message || "Failed to update event");
          }
        }
      );
    } else {
      createEvent.mutate(
        eventPayload,
        {
          onSuccess: () => {
            onClose();
          },
          onError: (err: any) => {
            setErrorMsg(err.message || "Failed to create event");
          }
        }
      );
    }
  };

  const handleDelete = () => {
    if (!event) return;
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!event) return;
    deleteEvent.mutate(
      { id: event.id, calendarId: event.calendarId },
      {
        onSuccess: () => {
          setShowDeleteConfirm(false);
          onClose();
        },
        onError: (err: any) => {
          setShowDeleteConfirm(false);
          setErrorMsg(err.message || "Failed to delete event");
        }
      }
    );
  };

  const isPending = createEvent.isPending || updateEvent.isPending || deleteEvent.isPending;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border-strong)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-4 flex-shrink-0"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  {event ? "Event Details" : "Create Event"}
                </h3>
                <button onClick={onClose} style={{ color: "var(--foreground-muted)" }} className="hover:opacity-75 transition-opacity">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-sm">
                {errorMsg && (
                  <div
                    className="p-3 rounded-lg text-xs font-medium border"
                    style={{
                      background: "var(--danger-muted)",
                      color: "var(--danger)",
                      borderColor: "rgba(181, 58, 42, 0.15)"
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                {/* Summary / Title */}
                <div>
                  <input
                    type="text"
                    placeholder="Event title"
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    disabled={isPending}
                    className="w-full bg-transparent border-b outline-none pb-1 font-medium text-base borderless-focus transition-colors"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                </div>

                {/* Date */}
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: "var(--foreground-muted)" }} />
                  <input
                    type="date"
                    value={dateStr}
                    onChange={e => setDateStr(e.target.value)}
                    disabled={isPending}
                    className="bg-transparent outline-none flex-1 py-1 px-2 rounded-md border"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                </div>

                {/* Time range */}
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 flex-shrink-0" style={{ color: "var(--foreground-muted)" }} />
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="time"
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
                      disabled={isPending}
                      className="bg-transparent outline-none py-1 px-2 rounded-md border w-24 text-center"
                      style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                    />
                    <span style={{ color: "var(--foreground-muted)" }}>to</span>
                    <input
                      type="time"
                      value={endTime}
                      onChange={e => setEndTime(e.target.value)}
                      disabled={isPending}
                      className="bg-transparent outline-none py-1 px-2 rounded-md border w-24 text-center"
                      style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-1.5" style={{ color: "var(--foreground-muted)" }} />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    disabled={isPending}
                    className="bg-transparent outline-none flex-1 py-1.5 px-2 rounded-md border"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                </div>

                {/* Attendees */}
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 flex-shrink-0 mt-1.5" style={{ color: "var(--foreground-muted)" }} />
                  <input
                    type="text"
                    placeholder="Attendees (comma-separated emails)"
                    value={attendeesStr}
                    onChange={e => setAttendeesStr(e.target.value)}
                    disabled={isPending}
                    className="bg-transparent outline-none flex-1 py-1.5 px-2 rounded-md border"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                </div>

                {/* Description */}
                <div className="flex items-start gap-3">
                  <AlignLeft className="w-4 h-4 flex-shrink-0 mt-1.5" style={{ color: "var(--foreground-muted)" }} />
                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    disabled={isPending}
                    rows={3}
                    className="bg-transparent outline-none flex-1 py-1.5 px-2 rounded-md border resize-none"
                    style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div
                className="px-6 py-4 flex-shrink-0 flex items-center justify-between"
                style={{ borderTop: "1px solid var(--border)", background: "var(--surface-3)" }}
              >
                {event ? (
                  <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-85 transition-opacity"
                    style={{ background: "var(--danger-muted)", color: "var(--danger)" }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    disabled={isPending}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border"
                    style={{ color: "var(--foreground-muted)", borderColor: "var(--border)" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isPending}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ background: "var(--accent)" }}
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <ConfirmDialog
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={confirmDelete}
            title="Delete Event"
            description="Are you sure you want to delete this event? This action will remove the event from Google Calendar and cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            type="danger"
            isLoading={deleteEvent.isPending}
          />
        </>
      )}
    </AnimatePresence>
  );
}
