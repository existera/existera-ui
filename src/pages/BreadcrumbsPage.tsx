import { ArrowRight, ChevronRight, Lock, Settings, User } from "lucide-react";
import ExBreadcrumbs from "../lib/components/Breadcrumbs/ExBreadcrumbs";
import ExBreadcrumbsItem from "../lib/components/Breadcrumbs/ExBreadcrumbsItem";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function BreadcrumbsPage() {
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
      name: "Size",
      link: "#size",
    },
    {
      name: "Color",
      link: "#color",
    },
    {
      name: "Separator",
      link: "#separator",
    },
    {
      name: "Icon",
      link: "#icon",
    },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Breadcrumbs</h2>
          <p>
            Breadcrumbs display the current page's location within a navigation
            hierarchy. They help users understand where they are, navigate back
            to previous levels, and improve the overall browsing experience in
            complex applications.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h2 className="text-2xl font-semibold">Basic Usage</h2>
            <p className="text-muted text-md">
              The simplest way to display hierarchical navigation. The last
              breadcrumb item is automatically marked as the current page.
            </p>
          </div>
          <ExCanvas>
            <ExBreadcrumbs>
              <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
              <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
              <ExBreadcrumbsItem>Menu Three</ExBreadcrumbsItem>
            </ExBreadcrumbs>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExBreadcrumbs>
    <ExBreadcrumbsItem>
        Menu One
    </ExBreadcrumbsItem>
    <ExBreadcrumbsItem>
        Menu Two
    </ExBreadcrumbsItem>
    <ExBreadcrumbsItem>
        Menu Three
    </ExBreadcrumbsItem>
</ExBreadcrumbs>`}
          </ExCodeBlock>
        </section>

        <section id="color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Color</h3>
            <p className="text-muted text-md">
              Apply different color schemes to match your application's theme
              while maintaining clear and consistent navigation.
            </p>
          </div>

          <ExCanvas>
            <div className="grid gap-5">
              <ExBreadcrumbs color="default">
                <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
                <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
                <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
              </ExBreadcrumbs>

              <ExBreadcrumbs color="bw">
                <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
                <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
                <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
              </ExBreadcrumbs>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExBreadcrumbs color="default">
  <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
  <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
  <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
</ExBreadcrumbs>

<ExBreadcrumbs color="bw">
  <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
  <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
  <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
</ExBreadcrumbs>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Choose from multiple predefined sizes to ensure breadcrumb
              navigation fits seamlessly across different layouts and interface
              densities.
            </p>
          </div>

          <ExCanvas>
            <div className="grid gap-5">
              <ExBreadcrumbs size="xs">
                <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
                <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
                <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
              </ExBreadcrumbs>

              <ExBreadcrumbs size="sm">
                <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
                <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
                <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
              </ExBreadcrumbs>

              <ExBreadcrumbs size="md">
                <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
                <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
                <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
              </ExBreadcrumbs>

              <ExBreadcrumbs size="lg">
                <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
                <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
                <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
              </ExBreadcrumbs>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExBreadcrumbs size="xs">
  <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
  <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
  <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
</ExBreadcrumbs>

<ExBreadcrumbs size="sm">
  <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
  <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
  <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
</ExBreadcrumbs>

<ExBreadcrumbs size="md">
  <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
  <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
  <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
</ExBreadcrumbs>

<ExBreadcrumbs size="lg">
  <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
  <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
  <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
</ExBreadcrumbs>`}
          </ExCodeBlock>
        </section>

        <section id="separator" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Separator</h3>
            <p className="text-muted text-md">
              Customize the separator between breadcrumb items using text or
              custom React elements such as icons to better match your
              application's design.
            </p>
          </div>

          <ExCanvas>
            <div className="grid gap-5">
              <ExBreadcrumbs separator="/">
                <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
                <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
                <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
              </ExBreadcrumbs>

              <ExBreadcrumbs separator={<ChevronRight size={13} />}>
                <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
                <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
                <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
              </ExBreadcrumbs>

              <ExBreadcrumbs separator={<ArrowRight size={13} />}>
                <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
                <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
                <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
              </ExBreadcrumbs>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExBreadcrumbs separator="/">
  <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
  <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
  <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
</ExBreadcrumbs>

<ExBreadcrumbs separator={<ChevronRight size={13} />}>
  <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
  <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
  <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
</ExBreadcrumbs>

<ExBreadcrumbs separator={<ArrowRight size={13} />}>
  <ExBreadcrumbsItem>Menu One</ExBreadcrumbsItem>
  <ExBreadcrumbsItem>Menu Two</ExBreadcrumbsItem>
  <ExBreadcrumbsItem active>Menu Three</ExBreadcrumbsItem>
</ExBreadcrumbs>`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Enhance breadcrumb navigation by combining icons with labels,
              making each navigation step easier to recognize at a glance.
            </p>
          </div>

          <ExCanvas>
            <div className="grid gap-5">
              <ExBreadcrumbs separator="/">
                <ExBreadcrumbsItem icon={<Settings size={14} />}>
                  Settings
                </ExBreadcrumbsItem>

                <ExBreadcrumbsItem icon={<User size={14} />}>
                  Account
                </ExBreadcrumbsItem>

                <ExBreadcrumbsItem active icon={<Lock size={14} />}>
                  Change Password
                </ExBreadcrumbsItem>
              </ExBreadcrumbs>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExBreadcrumbs separator="/">
  <ExBreadcrumbsItem icon={<Settings size={14} />}>
    Settings
  </ExBreadcrumbsItem>

  <ExBreadcrumbsItem icon={<User size={14} />}>
    Account
  </ExBreadcrumbsItem>

  <ExBreadcrumbsItem active icon={<Lock size={14} />}>
    Change Password
  </ExBreadcrumbsItem>
</ExBreadcrumbs>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
