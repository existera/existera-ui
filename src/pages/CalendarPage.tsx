
"use client";

import { useMemo, useState } from "react";
import ExCalendar from "@/lib/components/Calendar/ExCalendar";
import type { ExCalendarEvent } from "@/lib/components/Calendar/types/ExCalendarType";
import PageContent from "@/shared/documentation/PageContent";

function sampleEvents(): ExCalendarEvent[] {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const date = (day: number, hour = 0, minute = 0) =>
    new Date(year, month, day, hour, minute);

  const events: ExCalendarEvent[] = [
    // ========================================
    // TEAM MEETINGS
    // ========================================
    {
      id: "team-sync",
      title: "Weekly team sync",
      start: date(5, 9, 0),
      end: date(5, 10, 0),
      color: "primary",
      location: "Meeting Room A",
      description: "Weekly team updates, priorities, and blockers.",
    },
    {
      id: "design-review",
      title: "Design review",
      start: date(7, 10, 0),
      end: date(7, 11, 30),
      color: "secondary",
      location: "Design Studio",
      description: "Review UI designs and gather feedback.",
    },
    {
      id: "sprint-planning",
      title: "Sprint planning",
      start: date(12, 9, 0),
      end: date(12, 10, 30),
      color: "primary",
      location: "Meeting Room B",
      description: "Plan upcoming development tasks.",
    },
    {
      id: "product-review",
      title: "Product review",
      start: date(15, 13, 0),
      end: date(15, 14, 0),
      color: "success",
      location: "Conference Room",
      description: "Review product progress and priorities.",
    },
    {
      id: "retrospective",
      title: "Sprint retrospective",
      start: date(23, 15, 0),
      end: date(23, 16, 0),
      color: "secondary",
      location: "Meeting Room A",
      description: "Discuss achievements and improvements.",
    },

    // ========================================
    // DEVELOPMENT & FOCUS TIME
    // ========================================
    {
      id: "development",
      title: "Development session",
      start: date(8, 9, 0),
      end: date(8, 12, 0),
      color: "primary",
      description: "Focused development work.",
    },
    {
      id: "code-review",
      title: "Code review",
      start: date(8, 13, 0),
      end: date(8, 14, 0),
      color: "success",
      location: "Online",
      description: "Review pull requests and implementation details.",
    },
    {
      id: "focus-time",
      title: "Focus time",
      start: date(14, 10, 0),
      end: date(14, 12, 0),
      color: "secondary",
      location: "Online",
      description: "Uninterrupted time for priority tasks.",
    },
    {
      id: "testing",
      title: "QA testing",
      start: date(19, 10, 0),
      end: date(19, 12, 0),
      color: "warning",
      location: "Online",
      description: "Test new features before release.",
    },

    // ========================================
    // CLIENT & BUSINESS
    // ========================================
    {
      id: "client-call",
      title: "Client meeting",
      start: date(9, 14, 0),
      end: date(9, 15, 0),
      color: "success",
      location: "Google Meet",
      description: "Discuss project requirements and feedback.",
    },
    {
      id: "demo",
      title: "Product demo",
      start: date(16, 10, 0),
      end: date(16, 11, 0),
      color: "primary",
      location: "Google Meet",
      description: "Demonstrate the latest product improvements.",
    },
    {
      id: "stakeholder-meeting",
      title: "Stakeholder meeting",
      start: date(26, 13, 0),
      end: date(26, 14, 0),
      color: "secondary",
      location: "Conference Room",
      description: "Discuss project updates and next steps.",
    },

    // ========================================
    // ALL-DAY EVENTS & DEADLINES
    // ========================================
    {
      id: "submission-deadline",
      title: "Project deadline",
      start: date(13),
      end: date(14),
      allDay: true,
      color: "danger",
      description: "Final submission for the current project.",
    },
    {
      id: "release-day",
      title: "Release day",
      start: date(22),
      end: date(23),
      allDay: true,
      color: "success",
      description: "Scheduled production release.",
    },

    // ========================================
    // MULTI-DAY EVENTS
    // ========================================
    {
      id: "team-workshop",
      title: "Team workshop",
      start: date(20),
      end: date(22),
      allDay: true,
      color: "warning",
      description: "Two-day workshop for the product team.",
    },
    {
      id: "conference",
      title: "Developer conference",
      start: date(27),
      end: date(30),
      allDay: true,
      color: "primary",
      description: "Three-day technology conference.",
    },
  ];

  return events;
}

export default function CalendarPage() {
  const events = useMemo(() => sampleEvents(), []);
  const [selected, setSelected] = useState<ExCalendarEvent | null>(null);

  const sections = [
    { name: "Calendar", link: "#calendar" },
    { name: "Integration", link: "#integration" },
  ];

  const exampleCode = `<ExCalendar
  events={events}
  size="sm"
  defaultView="month"
  locale="id-ID"
  weekStartsOn={1}
  onEventClick={setSelected}
/>`;

  return (
    <PageContent section={sections}>
      <div className="flex min-w-0 flex-col gap-10 text-foreground">

        {/* PAGE HEADER */}
        <header className="space-y-3">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Components / Data Display</p>
            <h1 className="text-3xl font-semibold tracking-tight">Calendar</h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted">
            Organize schedules, manage events, and explore activities with flexible day, week, and month views.
          </p>
        </header>

        {/* CALENDAR DEMO */}
        <section id="calendar" className="section-anchor flex min-w-0 flex-col gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">Overview</h2>
            <p className="text-sm text-muted">
              Browse scheduled meetings, tasks, and events. Switch between calendar views to explore your schedule.
            </p>
          </div>

          <div className="h-[650px] min-h-[420px] min-w-0">
            <ExCalendar
              events={events}
              size="lg"
              defaultView="month"
              locale="id-ID"
              weekStartsOn={1}
              onEventClick={setSelected}
            />
          </div>

          <p className="text-xs text-muted">
            Showing {events.length} sample events for the current month.
          </p>
        </section>

        {/* SELECTED EVENT */}
        <section className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold">Selected event</h2>
            <p className="text-xs text-muted">
              Click any event in the calendar to inspect its data.
            </p>
          </div>

          <pre aria-live="polite" aria-atomic="true" className="ex-textarea-scroll max-h-72 overflow-auto rounded-xl bg-surface-2 p-4 text-xs leading-6">
            {selected ? JSON.stringify(selected, null, 2) : "No event selected."}
          </pre>
        </section>

        {/* INTEGRATION */}
        <section id="integration" className="section-anchor flex flex-col gap-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight">Integration</h2>
            <p className="text-sm leading-6 text-muted">
              Provide an array of events and configure the initial view, locale, and interaction callbacks.
            </p>
          </div>

          <pre className="ex-textarea-scroll overflow-auto rounded-xl border border-border bg-surface-2 p-5 text-xs leading-6">
            <code>{exampleCode}</code>
          </pre>

          <p className="text-xs leading-6 text-muted">
            Each event requires an id, title, start, and end. Optional properties include allDay, color, location, and description. Event end dates are exclusive. Dates use the browser's local timezone.
          </p>
        </section>
      </div>
    </PageContent>
  );
}
