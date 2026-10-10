import { useState } from "react";

import ExButton from "../lib/components/Button/ExButton";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExTab from "../lib/components/Tab/ExTab";
import ExTabContent from "../lib/components/Tab/ExTabContent";
import ExTabItem from "../lib/components/Tab/ExTabItem";
import ExTabList from "../lib/components/Tab/ExTabList";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function TabPage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Controlled State", link: "#controlled-state" },
    { name: "Default Value", link: "#default-value" },
    { name: "Badge", link: "#badge" },
    { name: "Disabled Tab", link: "#disabled-tab" },
    { name: "Overflow", link: "#overflow" },
  ];

  const [value, setValue] = useState("profile");

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Tab</h2>
          <p>
            Tabs organize related content into multiple sections while
            displaying only one panel at a time. They help reduce visual clutter
            and allow users to quickly switch between different views without
            leaving the current page.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>

            <p className="text-muted text-md">
              Use <code>defaultValue</code> together with <code>ExTabList</code>
              , <code>ExTabItem</code>, and <code>ExTabContent</code> to build a
              tab interface.
            </p>
          </div>

          <ExCanvas>
            <div className="w-full max-w-md rounded-lg bg-surface p-2">
              <ExTab defaultValue="profile">
                <ExTabList>
                  <ExTabItem value="profile">Profile</ExTabItem>
                  <ExTabItem value="settings">Settings</ExTabItem>
                  <ExTabItem value="billing">Billing</ExTabItem>
                </ExTabList>

                <ExTabContent value="profile">
                  Profile information and account overview.
                </ExTabContent>

                <ExTabContent value="settings">
                  Application preferences and notification settings.
                </ExTabContent>

                <ExTabContent value="billing">
                  Subscription details and payment history.
                </ExTabContent>
              </ExTab>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTab defaultValue="profile">
  <ExTabList>
    <ExTabItem value="profile">Profile</ExTabItem>
    <ExTabItem value="settings">Settings</ExTabItem>
    <ExTabItem value="billing">Billing</ExTabItem>
  </ExTabList>

  <ExTabContent value="profile">
    Profile information
  </ExTabContent>

  <ExTabContent value="settings">
    Settings
  </ExTabContent>

  <ExTabContent value="billing">
    Billing
  </ExTabContent>
</ExTab>`}
          </ExCodeBlock>
        </section>

        <section id="controlled-state" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Controlled State</h3>

            <p className="text-muted text-md">
              Control the active tab externally using the <code>value</code> and{" "}
              <code>onValueChange</code> props.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-4 w-full max-w-md">
              <div className="flex gap-2">
                <ExButton onClick={() => setValue("profile")}>Profile</ExButton>

                <ExButton onClick={() => setValue("settings")}>
                  Settings
                </ExButton>

                <ExButton onClick={() => setValue("billing")}>Billing</ExButton>
              </div>

              <div className="rounded-lg bg-surface p-2">
                <ExTab value={value} onValueChange={setValue}>
                  <ExTabList>
                    <ExTabItem value="profile">Profile</ExTabItem>
                    <ExTabItem value="settings">Settings</ExTabItem>
                    <ExTabItem value="billing">Billing</ExTabItem>
                  </ExTabList>

                  <ExTabContent value="profile">
                    Current tab: Profile
                  </ExTabContent>

                  <ExTabContent value="settings">
                    Current tab: Settings
                  </ExTabContent>

                  <ExTabContent value="billing">
                    Current tab: Billing
                  </ExTabContent>
                </ExTab>
              </div>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`const [value, setValue] = useState("profile");

<ExTab
  value={value}
  onValueChange={setValue}
>
  ...
</ExTab>`}
          </ExCodeBlock>
        </section>

        <section id="default-value" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Default Value</h3>
            <p className="text-muted text-md">
              Specify which tab should be active when the component is first
              rendered.
            </p>
          </div>
          <ExCodeBlock language="tsx">
            {`<ExTab defaultValue="settings">
  ...
</ExTab>`}
          </ExCodeBlock>
        </section>

        <section id="badge" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Badge</h3>

            <p className="text-muted text-md">
              Display additional information such as notification counts or
              status by using the <code>badge</code> prop.
            </p>
          </div>

          <ExCanvas>
            <div className="w-full max-w-md rounded-lg bg-surface p-2">
              <ExTab defaultValue="inbox">
                <ExTabList>
                  <ExTabItem value="inbox" badge={12}>
                    Inbox
                  </ExTabItem>

                  <ExTabItem value="updates" badge={3}>
                    Updates
                  </ExTabItem>

                  <ExTabItem value="archive">Archive</ExTabItem>
                </ExTabList>

                <ExTabContent value="inbox">
                  You have 12 unread messages.
                </ExTabContent>

                <ExTabContent value="updates">
                  There are 3 new updates available.
                </ExTabContent>

                <ExTabContent value="archive">
                  Archived conversations.
                </ExTabContent>
              </ExTab>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTab defaultValue="inbox">
  <ExTabList>
    <ExTabItem
      value="inbox"
      badge={12}
    >
      Inbox
    </ExTabItem>

    <ExTabItem
      value="updates"
      badge={3}
    >
      Updates
    </ExTabItem>

    <ExTabItem value="archive">
      Archive
    </ExTabItem>
  </ExTabList>

  <ExTabContent value="inbox">
    You have 12 unread messages.
  </ExTabContent>

  <ExTabContent value="updates">
    There are 3 new updates available.
  </ExTabContent>

  <ExTabContent value="archive">
    Archived conversations.
  </ExTabContent>
</ExTab>`}
          </ExCodeBlock>
        </section>

        <section id="disabled-tab" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Disabled Tab</h3>
            <p className="text-muted text-md">
              Prevent users from selecting a specific tab by using the{" "}
              <code>disabled</code> prop.
            </p>
          </div>

          <ExCanvas>
            <div className="w-full max-w-md rounded-lg bg-surface p-2">
              <ExTab defaultValue="overview">
                <ExTabList>
                  <ExTabItem value="overview">Overview</ExTabItem>
                  <ExTabItem value="analytics" disabled>
                    Analytics
                  </ExTabItem>
                  <ExTabItem value="reports">Reports</ExTabItem>
                </ExTabList>
                <ExTabContent value="overview">Overview content.</ExTabContent>
                <ExTabContent value="analytics">
                  Analytics content.
                </ExTabContent>
                <ExTabContent value="reports">Reports content.</ExTabContent>
              </ExTab>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExTabItem
  value="analytics"
  disabled
>
  Analytics
</ExTabItem>`}
          </ExCodeBlock>
        </section>

        <section id="overflow" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Overflow</h3>
            <p className="text-muted text-md">
              When the number of tabs exceeds the available width, the tab list
              becomes horizontally scrollable while automatically keeping the
              active tab visible.
            </p>
          </div>

          <ExCanvas>
            <div className="max-w-80 w-full rounded-lg bg-surface p-2">
              <ExTab defaultValue="overview">
                <ExTabList>
                  <ExTabItem value="overview">Overview</ExTabItem>
                  <ExTabItem value="messages" badge={24}>
                    Messages
                  </ExTabItem>
                  <ExTabItem value="notifications" badge={8}>
                    Notifications
                  </ExTabItem>
                  <ExTabItem value="tasks" badge={16}>
                    Tasks
                  </ExTabItem>
                  <ExTabItem value="calendar">Calendar</ExTabItem>
                  <ExTabItem value="analytics" badge={2}>
                    Analytics
                  </ExTabItem>
                  <ExTabItem value="reports">Reports</ExTabItem>
                  <ExTabItem value="billing" badge={1}>
                    Billing
                  </ExTabItem>
                  <ExTabItem value="team">Team</ExTabItem>
                  <ExTabItem value="settings">Settings</ExTabItem>
                </ExTabList>

                <ExTabContent value="overview">Overview content.</ExTabContent>

                <ExTabContent value="messages">Messages content.</ExTabContent>

                <ExTabContent value="notifications">
                  Notifications content.
                </ExTabContent>

                <ExTabContent value="tasks">Tasks content.</ExTabContent>

                <ExTabContent value="calendar">Calendar content.</ExTabContent>

                <ExTabContent value="analytics">
                  Analytics content.
                </ExTabContent>

                <ExTabContent value="reports">Reports content.</ExTabContent>

                <ExTabContent value="billing">Billing content.</ExTabContent>

                <ExTabContent value="team">Team content.</ExTabContent>

                <ExTabContent value="settings">Settings content.</ExTabContent>
              </ExTab>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExTab defaultValue="overview">
  <ExTabList>
    <ExTabItem value="overview">
      Overview
    </ExTabItem>

    <ExTabItem
      value="messages"
      badge={24}
    >
      Messages
    </ExTabItem>

    <ExTabItem
      value="notifications"
      badge={8}
    >
      Notifications
    </ExTabItem>

    <ExTabItem
      value="tasks"
      badge={16}
    >
      Tasks
    </ExTabItem>

    <ExTabItem value="calendar">
      Calendar
    </ExTabItem>

    <ExTabItem
      value="analytics"
      badge={2}
    >
      Analytics
    </ExTabItem>

    <ExTabItem value="reports">
      Reports
    </ExTabItem>

    <ExTabItem
      value="billing"
      badge={1}
    >
      Billing
    </ExTabItem>

    <ExTabItem value="team">
      Team
    </ExTabItem>

    <ExTabItem value="settings">
      Settings
    </ExTabItem>
  </ExTabList>

  <ExTabContent value="overview">
    Overview content.
  </ExTabContent>

  ...
</ExTab>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
