import { SendHorizonal } from "lucide-react";
import useToast from "../lib/components/Toast/useToast";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import ExCanvas from "../shared/components/ExCanvas";
import ExButton from "../lib/components/Button/ExButton";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";

export default function ToastPage() {
  const section: OnThisPage[] = [
    {
      name: "Introduction",
      link: "#intro",
    },
    {
      name: "Basic Usage",
      link: "#basic-usage",
    },
    {
      name: "Type",
      link: "#type",
    },
    {
      name: "Title & Description",
      link: "#title-desc",
    },
    {
      name: "Advance Usage",
      link: "#advance-usage",
    },
  ];

  const toast = useToast();

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h1 className="text-3xl font-semibold tracking-tight">Toast</h1>
          <p>
            Toast displays brief, non-intrusive notifications to provide feedback for user actions or system events. It supports multiple
            variants, customizable positions, auto-dismiss behavior, and fully custom content for interactive notifications.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Display a toast notification by calling the <code>show()</code> method from the <code>useToast()</code> hook. Customize its
              content, position, type, and duration to match different notification scenarios.
            </p>
          </div>

          <ExCanvas>
            <ExButton
              onClick={() =>
                toast.show({
                  type: "default",
                  position: "top-center",
                  title: "This is toast",
                  duration: 2000,
                  layout: "stack",
                })
              }>
              Call Toast
            </ExButton>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExToastProvider>
  <App />
</ExToastProvider>

<ExButton
  onClick={() =>
    toast.show({
      type: "default",
      position: "top-center",
      title: "This is toast",
      duration: 2000,
    })
  }
>
  Call Toast
</ExButton>`}
          </ExCodeBlock>
        </section>

        <section id="type" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Type</h3>
            <p className="text-muted text-md">
              Toast supports multiple semantic types to communicate different kinds of feedback. Each type applies a distinct visual style
              and icon, making it easier for users to quickly recognize informational, successful, warning, or error notifications.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-3">
              <ExButton
                onClick={() =>
                  toast.show({
                    type: "default",
                    position: "top-center",
                    title: "This is toast",
                    duration: 2000,
                  })
                }>
                Default
              </ExButton>
              <ExButton
                onClick={() =>
                  toast.show({
                    type: "info",
                    position: "top-center",
                    title: "This is toast",
                    duration: 2000,
                  })
                }>
                Info
              </ExButton>
              <ExButton
                onClick={() =>
                  toast.show({
                    type: "warning",
                    position: "top-center",
                    title: "This is toast",
                    duration: 2000,
                  })
                }>
                Warning
              </ExButton>
              <ExButton
                onClick={() =>
                  toast.show({
                    type: "success",
                    position: "top-center",
                    title: "This is toast",
                    duration: 2000,
                  })
                }>
                Success
              </ExButton>
              <ExButton
                onClick={() =>
                  toast.show({
                    type: "danger",
                    position: "top-center",
                    title: "This is toast",
                    duration: 2000,
                  })
                }>
                Danger
              </ExButton>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExButton
  onClick={() =>
    toast.show({
      type: "default",
      position: "top-center",
      title: "This is toast",
      duration: 2000,
    })
  }
>
  Default
</ExButton>
<ExButton
  onClick={() =>
    toast.show({
      type: "info",
      position: "top-center",
      title: "This is toast",
      duration: 2000,
    })
  }
>
  Info
</ExButton>
<ExButton
  onClick={() =>
    toast.show({
      type: "warning",
      position: "top-center",
      title: "This is toast",
      duration: 2000,
    })
  }
>
  Warning
</ExButton>
<ExButton
  onClick={() =>
    toast.show({
      type: "success",
      position: "top-center",
      title: "This is toast",
      duration: 2000,
    })
  }
>
  Success
</ExButton>
<ExButton
  onClick={() =>
    toast.show({
      type: "danger",
      position: "top-center",
      title: "This is toast",
      duration: 2000,
    })
  }
>
  Danger
</ExButton>`}
          </ExCodeBlock>
        </section>

        <section id="title-desc" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Title & Description</h3>
            <p className="text-muted text-md">
              Provide a title and description to communicate the purpose of a notification clearly. Use the title for a concise summary and
              the description for additional context when needed.
            </p>
          </div>

          <ExCanvas>
            <ExButton
              onClick={() =>
                toast.show({
                  type: "success",
                  position: "bottom-right",
                  title: "Success",
                  description: "Data has been saved!",
                  duration: 2000,
                })
              }>
              Call Toast
            </ExButton>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExButton
  onClick={() =>
    toast.show({
      type: "success",
      position: "bottom-right",
      title: "Success",
      description: "Data has been saved!",
      duration: 2000,
    })
  }
>
  Call Toast
</ExButton>`}
          </ExCodeBlock>
        </section>

        <section id="advance-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Advanced Usage</h3>
            <p className="text-muted text-md">
              Replace the default title and description by providing a custom <code>content</code> property. This allows toast notifications
              to render any React element, making it suitable for interactive experiences such as chat previews, quick replies, upload
              progress, authentication prompts, or other rich notification layouts. <b>No Duration, close by button</b>
            </p>
          </div>

          <ExCanvas>
            <button
              className="bg-surface-4 px-3 py-1 rounded-md cursor-pointer"
              onClick={() =>
                toast.show({
                  type: "default",
                  position: "bottom-right",
                  content: (
                    <div className="w-full">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success text-xs font-semibold text-white">
                          JD
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <span className="truncate text-sm font-semibold">John Doe</span>

                            <span className="text-[11px] text-muted">now</span>
                          </div>

                          <p className="truncate text-xs text-muted">Are we still meeting tomorrow at 10 AM?</p>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Reply..."
                          className="
                    h-8 flex-1 rounded-full
                    border border-border
                    bg-background
                    px-3
                    text-xs
                    outline-none
                    placeholder:text-muted
                    focus:border-success
                  "
                        />

                        <button
                          type="button"
                          className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-success
                    text-white
                    transition-colors
                    hover:opacity-90
                  ">
                          <SendHorizonal size={14} />
                        </button>
                      </div>
                    </div>
                  ),
                })
              }>
              Custom
            </button>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<button
  onClick={() =>
    toast.show({
      type: "default",
      position: "bottom-right",
      content: (
        <div className="w-full">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success text-xs font-semibold text-white">
              JD
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="truncate text-sm font-semibold">
                  John Doe
                </span>

                <span className="text-[11px] text-muted">now</span>
              </div>

              <p className="truncate text-xs text-muted">
                Are we still meeting tomorrow at 10 AM?
              </p>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Reply..."
              className="
                h-8 flex-1 rounded-full
                border border-border
                bg-background
                px-3
                text-xs
                outline-none
                placeholder:text-muted
                focus:border-success
              "
            />

            <button
              type="button"
              className="
                flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-full
                bg-success
                text-white
                transition-colors
                hover:opacity-90
              "
            >
              <SendHorizonal size={14} />
            </button>
          </div>
        </div>
      ),
    })
  }
>
  Custom
</button>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
