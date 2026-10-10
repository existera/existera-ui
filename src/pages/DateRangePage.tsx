import { CalendarDays, Calendars } from "lucide-react";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExDateRange from "../lib/components/DateRange/ExDateRange";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import { useState } from "react";

export default function DateRangePage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Radius", link: "#radius" },
    { name: "Size", link: "#size" },
    { name: "Icon", link: "#icon" },
    { name: "State", link: "#state" },
    { name: "Clearable", link: "#clearable" },
    { name: "Prefix & Suffix", link: "#prefix-suffix" },
    { name: "Start & End Date", link: "#start-end-date" },
    { name: "Disable Date", link: "#disable-date" },
  ];

  const formatDate = (date: Date) =>
    `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  const today = new Date();
  const end = new Date(today);
  end.setDate(today.getDate() + 10);
  const [startDate] = useState(formatDate(today));
  const [endDate] = useState(formatDate(end));
  const generateDisabledDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = new Set<number>();
    while (days.size < 10) {
      days.add(Math.floor(Math.random() * daysInMonth) + 1);
    }
    return [...days].sort((a, b) => a - b).map((day) => formatDate(new Date(year, month, day)));
  };
  const [disabledDate] = useState<string[]>(generateDisabledDates);

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Date Range</h2>
          <p>
            Date Range allows users to select a start and end date from an interactive calendar. It provides an intuitive way to define a
            date interval for booking, reporting, filtering, scheduling, and other workflows that require a continuous range of dates.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Use Date Range when users need to select both a start and an end date. Selecting the first date sets the beginning of the
              range, while selecting the second date completes it. The calendar makes it easy to navigate between months and years before
              confirming the selection.
            </p>
          </div>

          <ExCanvas>
            <div className="max-w-75">
              <ExDateRange />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDateRange />`}</ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Adjust the border radius to match your application's visual style. Choose the default radius for a balanced appearance or the
              full radius for a more rounded, pill-shaped input.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-75">
              <ExDateRange radius="default" />
              <ExDateRange radius="full" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDateRange radius="default" />
<ExDateRange radius="full" />`}</ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Choose from multiple sizes to match the density and layout of your interface. Each size adjusts the input height, spacing, and
              typography while preserving consistent functionality and appearance.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-75">
              <ExDateRange size="xs" />
              <ExDateRange size="sm" />
              <ExDateRange size="md" />
              <ExDateRange size="lg" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDateRange size="xs" />
<ExDateRange size="sm" />
<ExDateRange size="md" />
<ExDateRange size="lg" />`}</ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Add icons to the left or right side of the input to provide visual context or reinforce its purpose. Icons can improve
              discoverability while maintaining a clean and consistent interface.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3 max-w-75">
              <ExDateRange leftIcon={<CalendarDays className="size-4" />} rightIcon={<CalendarDays className="size-4" />} />
              <ExDateRange leftIcon={<Calendars className="size-4" />} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDateRange
  leftIcon={<CalendarDays className="size-4" />}
  rightIcon={<CalendarDays className="size-4" />}
/>

<ExDateRange
  leftIcon={<Calendars className="size-4" />}
/>`}</ExCodeBlock>
        </section>

        <section id="state" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">State</h3>
            <p className="text-muted text-md">
              Use visual states to communicate validation results, loading status, or input feedback, helping users understand the current
              status of the field at a glance.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5 max-w-75">
              <ExDateRange
                disabled
                state="default"
                startDatePlaceholder="Default"
                endDatePlaceholder="Default"
                leftIcon={<CalendarDays className="size-4" />}
              />
              <ExDateRange
                state="default"
                startDatePlaceholder="Default"
                endDatePlaceholder="Default"
                leftIcon={<CalendarDays className="size-4" />}
              />

              <ExDateRange
                state="default"
                startDatePlaceholder="Loading"
                endDatePlaceholder="Loading"
                loading
                leftIcon={<CalendarDays className="size-4" />}
              />

              <ExDateRange
                state="success"
                startDatePlaceholder="Success"
                endDatePlaceholder="Success"
                leftIcon={<CalendarDays className="size-4" />}
              />

              <ExDateRange
                state="error"
                startDatePlaceholder="Error"
                endDatePlaceholder="Error"
                leftIcon={<CalendarDays className="size-4" />}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExDateRange
  state="default"
  startDatePlaceholder="Default"
  endDatePlaceholder="Default"
  leftIcon={<CalendarDays className="size-4" />}
/>

<ExDateRange
  state="default"
  startDatePlaceholder="Loading"
  endDatePlaceholder="Loading"
  loading
  leftIcon={<CalendarDays className="size-4" />}
/>

<ExDateRange
  state="success"
  startDatePlaceholder="Success"
  endDatePlaceholder="Success"
  leftIcon={<CalendarDays className="size-4" />}
/>

<ExDateRange
  state="error"
  startDatePlaceholder="Error"
  endDatePlaceholder="Error"
  leftIcon={<CalendarDays className="size-4" />}
/>`}
          </ExCodeBlock>
        </section>

        <section id="clearable" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Clearable</h3>
            <p className="text-muted text-md">
              Enable the clear button to allow users to remove the currently selected date with a single click, making it easier to correct
              or reset the field.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col max-w-70 gap-5">
              <ExDateRange clearable />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDateRange clearable />`}</ExCodeBlock>
        </section>

        <section id="prefix-suffix" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Prefix & Suffix</h3>
            <p className="text-muted text-md">
              Prefix and suffix slots allow additional labels or contextual information to be displayed alongside the input without
              affecting the selected date value. They are useful for indicating field purpose, timezone, status, or other supplemental
              information.
            </p>
          </div>

          <ExCanvas>
            <div className="flex max-w-sm flex-col gap-5">
              <ExDateRange>
                <ExDateRange.Prefix>Date</ExDateRange.Prefix>
              </ExDateRange>

              <ExDateRange>
                <ExDateRange.Suffix>UTC+7</ExDateRange.Suffix>
              </ExDateRange>

              <ExDateRange radius="full">
                <ExDateRange.Prefix>Start</ExDateRange.Prefix>
                <ExDateRange.Suffix>Required</ExDateRange.Suffix>
              </ExDateRange>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExDateRange>
  <ExDateRange.Prefix>Date</ExDateRange.Prefix>
</ExDateRange>

<ExDateRange>
  <ExDateRange.Suffix>UTC+7</ExDateRange.Suffix>
</ExDateRange>

<ExDateRange radius="full">
  <ExDateRange.Prefix>Start</ExDateRange.Prefix>
  <ExDateRange.Suffix>Required</ExDateRange.Suffix>
</ExDateRange>`}
          </ExCodeBlock>
        </section>

        <section id="start-end-date" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Start & End Date</h3>
            <p className="text-muted text-md">
              Limit date selection by defining a start and end date. Users can only select dates within the specified range, while dates
              outside the range are displayed as disabled and cannot be selected.
            </p>
          </div>

          <ExCanvas>
            <div className="max-w-56">
              <ExDateRange startDate={startDate} endDate={endDate} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDatePicker 
  startDate="${startDate}" 
  endDate="${endDate}"
/>`}</ExCodeBlock>
        </section>

        <section id="disable-date" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Disabled Date</h3>
            <p className="text-muted text-md">
              Disable specific dates by providing them through the <code>disabledDate</code> prop. Disabled dates remain visible in the
              calendar but cannot be selected, making them ideal for holidays, unavailable dates, or blocked schedules.
            </p>
          </div>

          <ExCanvas>
            <div className="max-w-56">
              <ExDateRange disabledDate={disabledDate} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDatePicker disabledDate={[${disabledDate}]} />`}</ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
