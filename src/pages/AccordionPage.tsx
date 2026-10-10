import { Bell, CreditCard, Shield, User } from "lucide-react";
import ExAccordion from "../lib/components/Accordion/ExAccordion";
import ExAccordionItem from "../lib/components/Accordion/ExAccordionItem";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";

export default function AccordionPage() {
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
      name: "Variant",
      link: "#variant",
    },
    {
      name: "Size",
      link: "#size",
    },
    {
      name: "Icon",
      link: "#icon",
    },
    {
      name: "Multiple",
      link: "#multiple",
    },
  ];
  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Accordion</h2>
          <p>
            Accordions are interactive components used to show and hide content
            sections in a compact space. They help organize large amounts of
            information into digestible chunks while maintaining a clean visual
            hierarchy. Users can expand sections to reveal more details and
            collapse them to reduce cognitive load.
          </p>
        </section>

        <section id="basic-usage" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-md text-muted">
              The most basic implementation of the Accordion component. By
              setting
              <code className="mx-1 rounded bg-surface-3 px-1.5 py-0.5 font-mono text-xs">
                defaultOpenIndex
              </code>
              to
              <code className="mx-1 rounded bg-surface-3 px-1.5 py-0.5 font-mono text-xs">
                0
              </code>
              , the first accordion item is expanded by default. Only one item
              can be opened at a time.
            </p>
          </div>

          <div className="grid gap-3">
            <ExCanvas>
              <div className="w-full max-w-100">
                <ExAccordion defaultOpenIndex={0}>
                  <ExAccordionItem title="What is a UI system?">
                    A UI system is a collection of reusable components, design
                    patterns, and guidelines that help maintain consistency and
                    improve development efficiency across an application.
                  </ExAccordionItem>

                  <ExAccordionItem title="Does this accordion manage its own state?">
                    Yes. By default, the accordion uses internal state
                    management, making it simple to use without requiring
                    additional configuration.
                  </ExAccordionItem>

                  <ExAccordionItem title="Can multiple sections be expanded?">
                    Yes. Enable the <code>allowMultiple</code> prop to allow
                    users to expand more than one accordion item simultaneously.
                  </ExAccordionItem>
                </ExAccordion>
              </div>
            </ExCanvas>

            <ExCodeBlock language="html">
              {`<ExAccordion defaultOpenIndex={0}>
  <ExAccordionItem title="What is a UI system?">
    A UI system is a collection of reusable components, design
    patterns, and guidelines that help maintain consistency and
    improve development efficiency across an application.
  </ExAccordionItem>

  <ExAccordionItem title="Does this accordion manage its own state?">
    Yes. By default, the accordion uses internal state management,
    making it simple to use without requiring additional
    configuration.
  </ExAccordionItem>

  <ExAccordionItem title="Can multiple sections be expanded?">
    Yes. Enable the allowMultiple prop to allow users to
    expand more than one accordion item simultaneously.
  </ExAccordionItem>
</ExAccordion>`}
            </ExCodeBlock>
          </div>
        </section>

        <section id="variant" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Variant</h3>
            <p className="text-md text-muted">
              Accordion supports multiple visual styles to match different
              layouts and design requirements. Use the
              <code className="mx-1 rounded bg-surface-3 px-1.5 py-0.5 font-mono text-xs">
                variant
              </code>
              prop to switch between the available appearances.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Default</h4>

              <ExCanvas>
                <ExAccordion variant="default">
                  <ExAccordionItem title="What is a UI system?">
                    A UI system is a collection of reusable components, design
                    patterns, and guidelines that help maintain consistency
                    across an application.
                  </ExAccordionItem>

                  <ExAccordionItem title="Does this accordion manage its own state?">
                    Yes. The accordion manages its own open and closed state by
                    default.
                  </ExAccordionItem>

                  <ExAccordionItem title="Can multiple items be expanded?">
                    Yes. Enable the <code>allowMultiple</code> prop to allow
                    multiple sections to remain open simultaneously.
                  </ExAccordionItem>
                </ExAccordion>
              </ExCanvas>

              <ExCodeBlock language="html">
                {`<ExAccordion variant="default">
  <ExAccordionItem title="What is a UI system?">
    ...
  </ExAccordionItem>

  <ExAccordionItem title="Does this accordion manage its own state?">
    ...
  </ExAccordionItem>

  <ExAccordionItem title="Can multiple items be expanded?">
    ...
  </ExAccordionItem>
</ExAccordion>`}
              </ExCodeBlock>
            </div>

            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Transparent</h4>

              <ExCanvas>
                <ExAccordion variant="transparent">
                  <ExAccordionItem title="What is a UI system?">
                    A UI system is a collection of reusable components, design
                    patterns, and guidelines that help maintain consistency
                    across an application.
                  </ExAccordionItem>

                  <ExAccordionItem title="Does this accordion manage its own state?">
                    Yes. The accordion manages its own open and closed state by
                    default.
                  </ExAccordionItem>

                  <ExAccordionItem title="Can multiple items be expanded?">
                    Yes. Enable the <code>allowMultiple</code> prop to allow
                    multiple sections to remain open simultaneously.
                  </ExAccordionItem>
                </ExAccordion>
              </ExCanvas>

              <ExCodeBlock language="html">
                {`<ExAccordion variant="transparent">
  <ExAccordionItem title="What is a UI system?">
    ...
  </ExAccordionItem>

  <ExAccordionItem title="Does this accordion manage its own state?">
    ...
  </ExAccordionItem>

  <ExAccordionItem title="Can multiple items be expanded?">
    ...
  </ExAccordionItem>
</ExAccordion>`}
              </ExCodeBlock>
            </div>
          </div>
        </section>

        <section id="size" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-md text-muted">
              Use the
              <code className="mx-1 rounded bg-surface-3 px-1.5 py-0.5 font-mono text-xs">
                size
              </code>
              prop to adjust the typography of the accordion. Four predefined
              sizes are available to fit different layouts and content
              densities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Extra Small (xs)</h4>

              <ExCanvas>
                <ExAccordion size="xs">
                  <ExAccordionItem title="What is a UI system?">
                    A UI system is a collection of reusable components and
                    design guidelines that help create consistent user
                    interfaces.
                  </ExAccordionItem>

                  <ExAccordionItem title="Does this accordion manage its own state?">
                    Yes. The accordion uses internal state management by
                    default.
                  </ExAccordionItem>

                  <ExAccordionItem title="Can multiple sections be expanded?">
                    Yes. Enable the allowMultiple prop to allow multiple items
                    to remain open.
                  </ExAccordionItem>
                </ExAccordion>
              </ExCanvas>

              <ExCodeBlock language="html">
                {`<ExAccordion size="xs">
  ...
</ExAccordion>`}
              </ExCodeBlock>
            </div>

            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Small (sm)</h4>

              <ExCanvas>
                <ExAccordion size="sm">
                  <ExAccordionItem title="What is a UI system?">
                    A UI system is a collection of reusable components and
                    design guidelines that help create consistent user
                    interfaces.
                  </ExAccordionItem>

                  <ExAccordionItem title="Does this accordion manage its own state?">
                    Yes. The accordion uses internal state management by
                    default.
                  </ExAccordionItem>

                  <ExAccordionItem title="Can multiple sections be expanded?">
                    Yes. Enable the allowMultiple prop to allow multiple items
                    to remain open.
                  </ExAccordionItem>
                </ExAccordion>
              </ExCanvas>

              <ExCodeBlock language="html">
                {`<ExAccordion size="sm">
  ...
</ExAccordion>`}
              </ExCodeBlock>
            </div>

            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Medium (md)</h4>

              <ExCanvas>
                <ExAccordion size="md">
                  <ExAccordionItem title="What is a UI system?">
                    A UI system is a collection of reusable components and
                    design guidelines that help create consistent user
                    interfaces.
                  </ExAccordionItem>

                  <ExAccordionItem title="Does this accordion manage its own state?">
                    Yes. The accordion uses internal state management by
                    default.
                  </ExAccordionItem>

                  <ExAccordionItem title="Can multiple sections be expanded?">
                    Yes. Enable the allowMultiple prop to allow multiple items
                    to remain open.
                  </ExAccordionItem>
                </ExAccordion>
              </ExCanvas>

              <ExCodeBlock language="html">
                {`<ExAccordion size="md">
  ...
</ExAccordion>`}
              </ExCodeBlock>
            </div>

            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Large (lg)</h4>

              <ExCanvas>
                <ExAccordion size="lg">
                  <ExAccordionItem
                    title="What is a UI system?"
                    icon={<User size={16} />}
                  >
                    A UI system is a collection of reusable components and
                    design guidelines that help create consistent user
                    interfaces.
                  </ExAccordionItem>

                  <ExAccordionItem title="Does this accordion manage its own state?">
                    Yes. The accordion uses internal state management by
                    default.
                  </ExAccordionItem>

                  <ExAccordionItem title="Can multiple sections be expanded?">
                    Yes. Enable the allowMultiple prop to allow multiple items
                    to remain open.
                  </ExAccordionItem>
                </ExAccordion>
              </ExCanvas>

              <ExCodeBlock language="html">
                {`<ExAccordion size="lg">
  ...
</ExAccordion>`}
              </ExCodeBlock>
            </div>
          </div>
        </section>

        <section id="icon" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-md text-muted">
              Icons provide additional visual context and help users quickly
              identify the purpose of each accordion section. Use the
              <code className="mx-1 rounded bg-surface-3 px-1.5 py-0.5 font-mono text-xs">
                icon
              </code>
              prop to display an icon alongside the accordion title.
            </p>
          </div>

          <div className="grid gap-3">
            <ExCanvas>
              <div className="w-full max-w-100">
                <ExAccordion defaultOpenIndex={0}>
                  <ExAccordionItem
                    icon={<User size={16} />}
                    title="Profile Information"
                  >
                    View and update your personal details such as your name,
                    profile picture, email address, and contact information.
                  </ExAccordionItem>

                  <ExAccordionItem icon={<Shield size={16} />} title="Security">
                    Change your password, enable two-factor authentication, and
                    manage active login sessions to keep your account secure.
                  </ExAccordionItem>

                  <ExAccordionItem
                    icon={<Bell size={16} />}
                    title="Notifications"
                  >
                    Customize how you receive email, push, and in-app
                    notifications for account activity and product updates.
                  </ExAccordionItem>

                  <ExAccordionItem
                    icon={<CreditCard size={16} />}
                    title="Billing & Payments"
                  >
                    Manage your subscription, payment methods, invoices, and
                    billing history in one place.
                  </ExAccordionItem>
                </ExAccordion>
              </div>
            </ExCanvas>

            <ExCodeBlock language="html">
              {`<ExAccordion defaultOpenIndex={0}>
  <ExAccordionItem
    icon={<User size={16} />}
    title="Profile Information"
  >
    View and update your personal details such as your name,
    profile picture, email address, and contact information.
  </ExAccordionItem>

  <ExAccordionItem
    icon={<Shield size={16} />}
    title="Security"
  >
    Change your password, enable two-factor authentication,
    and manage active login sessions.
  </ExAccordionItem>

  <ExAccordionItem
    icon={<Bell size={16} />}
    title="Notifications"
  >
    Customize your notification preferences.
  </ExAccordionItem>

  <ExAccordionItem
    icon={<CreditCard size={16} />}
    title="Billing & Payments"
  >
    Manage your subscription, payment methods,
    and billing history.
  </ExAccordionItem>
</ExAccordion>`}
            </ExCodeBlock>
          </div>
        </section>

        <section id="multiple" className="grid gap-5 section-anchor">
          <div>
            <h3 className="text-2xl font-semibold">Multiple</h3>
            <p className="text-md text-muted">
              Allow multiple accordion items to remain expanded at the same time
              by enabling the
              <code className="mx-1 rounded bg-surface-3 px-1.5 py-0.5 font-mono text-xs">
                allowMultiple
              </code>
              prop. You can also specify multiple initially expanded items using
              <code className="mx-1 rounded bg-surface-3 px-1.5 py-0.5 font-mono text-xs">
                defaultOpenIndex
              </code>
              with an array of indexes.
            </p>
          </div>

          <div className="grid gap-3">
            <ExCanvas>
              <div className="w-full max-w-100">
                <ExAccordion defaultOpenIndex={[0, 2]} allowMultiple>
                  <ExAccordionItem
                    icon={<User size={16} />}
                    title="Profile Information"
                  >
                    View and update your personal information, including your
                    name, profile photo, email address, and contact details.
                  </ExAccordionItem>

                  <ExAccordionItem icon={<Shield size={16} />} title="Security">
                    Manage your password, two-factor authentication, and active
                    login sessions to keep your account protected.
                  </ExAccordionItem>

                  <ExAccordionItem
                    icon={<Bell size={16} />}
                    title="Notifications"
                  >
                    Configure email, push, and in-app notification preferences
                    for updates and account activity.
                  </ExAccordionItem>

                  <ExAccordionItem
                    icon={<CreditCard size={16} />}
                    title="Billing & Payments"
                  >
                    Review your subscription, payment methods, invoices, and
                    billing history from one place.
                  </ExAccordionItem>
                </ExAccordion>
              </div>
            </ExCanvas>

            <ExCodeBlock language="html">
              {`<ExAccordion defaultOpenIndex={[0, 2]} allowMultiple>
  <ExAccordionItem
    icon={<User size={16} />}
    title="Profile Information"
  >
    View and update your personal information, including your name,
    profile photo, email address, and contact details.
  </ExAccordionItem>

  <ExAccordionItem
    icon={<Shield size={16} />}
    title="Security"
  >
    Manage your password, two-factor authentication, and active
    login sessions to keep your account protected.
  </ExAccordionItem>

  <ExAccordionItem
    icon={<Bell size={16} />}
    title="Notifications"
  >
    Configure email, push, and in-app notification preferences for
    updates and account activity.
  </ExAccordionItem>

  <ExAccordionItem
    icon={<CreditCard size={16} />}
    title="Billing & Payments"
  >
    Review your subscription, payment methods, invoices, and
    billing history from one place.
  </ExAccordionItem>
</ExAccordion>`}
            </ExCodeBlock>
          </div>
        </section>
      </div>
    </PageContent>
  );
}
