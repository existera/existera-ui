import { ArrowRight, CalendarDays } from "lucide-react";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExDatePicker from "../lib/components/DatePicker/ExDatePicker";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import { useState } from "react";

export default function DatePickerPage() {
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
          <h2 className="text-3xl font-semibold">Date Picker</h2>
          <p>
            Date Picker allows users to select a date through an interactive calendar instead of typing it manually. It supports
            customizable display formats, validation states, date constraints, icons, and flexible styling, making it ideal for forms,
            scheduling, booking, and any workflow that requires accurate date selection.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Use the Date Picker to let users choose a date from a calendar. Clicking the input opens the calendar popover, allowing users
              to navigate between months and years before selecting a date.
            </p>
          </div>

          <ExCanvas>
            <div className="max-w-56">
              <ExDatePicker />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDatePicker />`}</ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Adjust the corner radius to better match your application's visual style. Use the default radius for standard interfaces or
              the full radius for a softer, pill-shaped appearance.
            </p>
          </div>

          <ExCanvas>
            <div className="flex max-w-56 flex-col gap-3">
              <ExDatePicker radius="default" />
              <ExDatePicker radius="full" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDatePicker radius="default" />
<ExDatePicker radius="full" />`}</ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Choose from multiple sizes to maintain visual consistency across different layouts and form densities.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExDatePicker size="xs" placeholder="Extra Small" />
              <ExDatePicker size="sm" placeholder="Small" />
              <ExDatePicker size="md" placeholder="Medium" />
              <ExDatePicker size="lg" placeholder="Large" />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExDatePicker size="xs" placeholder="Extra Small" />
<ExDatePicker size="sm" placeholder="Small" />
<ExDatePicker size="md" placeholder="Medium" />
<ExDatePicker size="lg" placeholder="Large" />`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Add leading or trailing icons to improve recognition, provide additional context, or indicate available actions without
              changing the component's behavior.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5">
              <ExDatePicker leftIcon={<CalendarDays className="size-4" />} />

              <ExDatePicker leftIcon={<CalendarDays className="size-4" />} rightIcon={<ArrowRight className="size-4" />} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExDatePicker leftIcon={<CalendarDays className="size-4" />} />

<ExDatePicker
  leftIcon={<CalendarDays className="size-4" />}
  rightIcon={<ArrowRight className="size-4" />}
/>`}
          </ExCodeBlock>
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
            <div className="flex flex-col gap-5">
              <ExDatePicker disabled state="default" placeholder="Default" leftIcon={<CalendarDays className="size-4" />} />
              <ExDatePicker state="default" placeholder="Default"  leftIcon={<CalendarDays className="size-4" />} />

              <ExDatePicker state="default" placeholder="Loading" loading leftIcon={<CalendarDays className="size-4" />} />

              <ExDatePicker state="success" placeholder="Success" leftIcon={<CalendarDays className="size-4" />} />

              <ExDatePicker state="error" placeholder="Error" leftIcon={<CalendarDays className="size-4" />} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExDatePicker
  disabled
  state="default"
  placeholder="Default"
  leftIcon={<CalendarDays className="size-4" />}
/>
<ExDatePicker
  state="default"
  placeholder="Default"
  leftIcon={<CalendarDays className="size-4" />}
/>

<ExDatePicker
  state="default"
  placeholder="Loading"
  loading
  leftIcon={<CalendarDays className="size-4" />}
/>

<ExDatePicker
  state="success"
  placeholder="Success"
  leftIcon={<CalendarDays className="size-4" />}
/>

<ExDatePicker
  state="error"
  placeholder="Error"
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
            <div className="flex flex-col gap-5">
              <ExDatePicker clearable />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDatePicker clearable />`}</ExCodeBlock>
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
              <ExDatePicker>
                <ExDatePicker.Prefix>Date</ExDatePicker.Prefix>
              </ExDatePicker>

              <ExDatePicker>
                <ExDatePicker.Suffix>UTC+7</ExDatePicker.Suffix>
              </ExDatePicker>

              <ExDatePicker radius="full">
                <ExDatePicker.Prefix>Start</ExDatePicker.Prefix>
                <ExDatePicker.Suffix>Required</ExDatePicker.Suffix>
              </ExDatePicker>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExDatePicker>
  <ExDatePicker.Prefix>Date</ExDatePicker.Prefix>
</ExDatePicker>

<ExDatePicker>
  <ExDatePicker.Suffix>UTC+7</ExDatePicker.Suffix>
</ExDatePicker>

<ExDatePicker radius="full">
  <ExDatePicker.Prefix>Start</ExDatePicker.Prefix>
  <ExDatePicker.Suffix>Required</ExDatePicker.Suffix>
</ExDatePicker>`}
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
              <ExDatePicker startDate={startDate} endDate={endDate} />
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
              <ExDatePicker disabledDate={disabledDate} />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">{`<ExDatePicker disabledDate={[${disabledDate}]} />`}</ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
