import type { CalendarEvent } from "@/types";

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

function dayOffset(days: number, hours: number, minutes = 0) {
  return new Date(today.getTime() + days * 86400000 + hours * 3600000 + minutes * 60000).toISOString();
}

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "evt_001",
    userId: "user_mock",
    calendarId: "primary",
    summary: "Q3 Planning — All Hands",
    description: "Quarterly planning session with the full team. Agenda: OKRs, roadmap review, resource allocation.",
    location: "Google Meet",
    start: { dateTime: dayOffset(0, 9, 0), timeZone: "UTC" },
    end:   { dateTime: dayOffset(0, 10, 30), timeZone: "UTC" },
    status: "confirmed",
    hangoutLink: "https://meet.google.com/abc-def-ghi",
    attendees: [
      { email: "sarah.chen@stripe.com", displayName: "Sarah Chen", responseStatus: "accepted" },
      { email: "marcus@linear.app", displayName: "Marcus Webb", responseStatus: "accepted" },
      { email: "you@syncar.io", displayName: "You", responseStatus: "accepted", self: true },
    ],
    colorId: "1",
  },
  {
    id: "evt_002",
    userId: "user_mock",
    calendarId: "primary",
    summary: "1:1 with Priya",
    description: "Weekly sync — design feedback, roadmap priorities.",
    start: { dateTime: dayOffset(0, 14, 0), timeZone: "UTC" },
    end:   { dateTime: dayOffset(0, 14, 45), timeZone: "UTC" },
    status: "confirmed",
    attendees: [
      { email: "priya@notion.so", displayName: "Priya Sharma", responseStatus: "accepted" },
      { email: "you@syncar.io", displayName: "You", responseStatus: "accepted", self: true },
    ],
    colorId: "2",
  },
  {
    id: "evt_003",
    userId: "user_mock",
    calendarId: "primary",
    summary: "Deep Work — AI Integration",
    description: "Focused work block: Chat use-case implementation and Gemini tool calling.",
    start: { dateTime: dayOffset(1, 10, 0), timeZone: "UTC" },
    end:   { dateTime: dayOffset(1, 13, 0), timeZone: "UTC" },
    status: "confirmed",
    attendees: [],
    colorId: "9",
  },
  {
    id: "evt_004",
    userId: "user_mock",
    calendarId: "primary",
    summary: "Partnership Call — Stripe",
    description: "Follow-up on Q3 partnership proposal with Sarah Chen's team.",
    location: "Zoom",
    start: { dateTime: dayOffset(1, 15, 0), timeZone: "UTC" },
    end:   { dateTime: dayOffset(1, 16, 0), timeZone: "UTC" },
    status: "confirmed",
    attendees: [
      { email: "sarah.chen@stripe.com", displayName: "Sarah Chen", responseStatus: "accepted" },
      { email: "legal@stripe.com", displayName: "Legal Team", responseStatus: "needsAction" },
      { email: "you@syncar.io", displayName: "You", responseStatus: "accepted", self: true },
    ],
    colorId: "5",
  },
  {
    id: "evt_005",
    userId: "user_mock",
    calendarId: "primary",
    summary: "Product Review",
    description: "Monthly product review with stakeholders. Demo of new AI features.",
    start: { dateTime: dayOffset(2, 11, 0), timeZone: "UTC" },
    end:   { dateTime: dayOffset(2, 12, 30), timeZone: "UTC" },
    status: "confirmed",
    hangoutLink: "https://meet.google.com/xyz-uvw-rst",
    attendees: [
      { email: "david@superhuman.com", displayName: "David Park", responseStatus: "tentative" },
      { email: "jordan@raycast.com", displayName: "Jordan Kim", responseStatus: "accepted" },
      { email: "you@syncar.io", displayName: "You", responseStatus: "accepted", self: true },
    ],
    colorId: "3",
  },
  {
    id: "evt_006",
    userId: "user_mock",
    calendarId: "primary",
    summary: "Raycast Collaboration Call",
    description: "Exploratory call about AI productivity tooling collaboration.",
    start: { dateTime: dayOffset(3, 16, 0), timeZone: "UTC" },
    end:   { dateTime: dayOffset(3, 16, 30), timeZone: "UTC" },
    status: "tentative",
    attendees: [
      { email: "jordan@raycast.com", displayName: "Jordan Kim", responseStatus: "accepted" },
      { email: "you@syncar.io", displayName: "You", responseStatus: "needsAction", self: true },
    ],
    colorId: "6",
  },
  {
    id: "evt_007",
    userId: "user_mock",
    calendarId: "primary",
    summary: "Sprint Retrospective",
    start: { dateTime: dayOffset(4, 9, 30), timeZone: "UTC" },
    end:   { dateTime: dayOffset(4, 10, 30), timeZone: "UTC" },
    status: "confirmed",
    hangoutLink: "https://meet.google.com/mno-pqr-stu",
    attendees: [
      { email: "marcus@linear.app", displayName: "Marcus Webb", responseStatus: "accepted" },
      { email: "you@syncar.io", displayName: "You", responseStatus: "accepted", self: true },
    ],
    colorId: "2",
  },
];

export const EVENT_COLORS: Record<string, string> = {
  "1": "var(--evt-red)",
  "2": "var(--evt-purple)",
  "3": "var(--evt-green)",
  "4": "var(--evt-amber)",
  "5": "var(--evt-pink)",
  "6": "var(--evt-teal)",
  "7": "var(--evt-violet)",
  "9": "var(--evt-gray)",
};
