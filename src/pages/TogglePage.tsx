import ExCanvas from "../shared/components/ExCanvas";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import PageContent from "../shared/documentation/PageContent";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import ExToggle from "../lib/components/Toggle/ExToggle";
import { useState } from "react";
import { Sparkles } from "lucide-react";

type Category = {
  id: number;
  label: string;
};

export default function TogglePage() {
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
      name: "Radius",
      link: "#radius",
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
      name: "Selected State",
      link: "#selected",
    },
    {
      name: "Events",
      link: "#events",
    },
  ];

  const category: Category[] = [
    {
      id: 1,
      label: "Orange",
    },
    {
      id: 2,
      label: "Guava",
    },
    {
      id: 3,
      label: "Apple",
    },
  ];

  const [selected, setSelected] = useState<Category[]>([]);

  const handleSelect = (item: Category) => {
    setSelected((prev) => {
      const exists = prev.some((value) => value.id === item.id);

      if (exists) {
        return prev.filter((value) => value.id !== item.id);
      }

      return [...prev, item];
    });
  };

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Toggle</h2>
          <p>
            Toggles are interactive elements used to indicate selected state.
            Perfect for category selectors, filters, and pill-style buttons.
            Supports multiple sizes, radius options, icons, and selection events.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Create toggle buttons to select categories or options.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-wrap gap-2">
              {category.map((item) => (
            <ExToggle
                key={item.id}
                selected={selected.some((value) => value.id === item.id)}
                onSelect={() => handleSelect(item)}>
                {item.label}
            </ExToggle>
              ))}
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`const [selected, setSelected] = useState<Category[]>([]);

const handleSelect = (item: Category) => {
  setSelected((prev) => {
    const exists = prev.some((value) => value.id === item.id);

    if (exists) {
      return prev.filter((value) => value.id !== item.id);
    }

    return [...prev, item];
  });
};

{category.map((item) => (
  <ExToggle
    key={item.id}
    selected={selected.some((value) => value.id === item.id)}
    onSelect={() => handleSelect(item)}
  >
    {item.label}
  </ExToggle>
))}`}
          </ExCodeBlock>
        </section>

        <section id="radius" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Radius</h3>
            <p className="text-muted text-md">
              Choose rounded or pill-style toggles.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-2">
                {category.map((item) => (
              <ExToggle
                key={item.id}
                radius="default"
                selected={selected.some((value) => value.id === item.id)}
                onSelect={() => handleSelect(item)}>
                {item.label}
              </ExToggle>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.map((item) => (
              <ExToggle
                key={item.id}
                radius="full"
                selected={selected.some((value) => value.id === item.id)}
                onSelect={() => handleSelect(item)}>
                {item.label}
              </ExToggle>
                ))}
              </div>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExToggle radius="default">Toggle</ExToggle>
<ExToggle radius="full">Toggle</ExToggle>`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Select toggle sizes from extra small to large.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col md:flex-row gap-5">
                <ExToggle size="xs">XS</ExToggle>
                <ExToggle size="sm">SM</ExToggle>
                <ExToggle size="md">MD</ExToggle>
                <ExToggle size="lg">LG</ExToggle>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <ExToggle size="xs" radius="full">XS</ExToggle>
                <ExToggle size="sm" radius="full">SM</ExToggle>
                <ExToggle size="md" radius="full">MD</ExToggle>
                <ExToggle size="lg" radius="full">LG</ExToggle>
              </div>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExToggle size="xs">Toggle</ExToggle>
<ExToggle size="sm">Toggle</ExToggle>
<ExToggle size="md">Toggle</ExToggle>
<ExToggle size="lg">Toggle</ExToggle>

<ExToggle size="xs" radius="full">Toggle</ExToggle>
<ExToggle size="sm" radius="full">Toggle</ExToggle>
<ExToggle size="md" radius="full">Toggle</ExToggle>
<ExToggle size="lg" radius="full">Toggle</ExToggle>`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Add icons to toggle buttons for visual clarity.
            </p>
          </div>
          <ExCanvas>
            <div className="flex gap-5">
              <ExToggle leftIcon={<Sparkles size={13} />}>Toggle</ExToggle>
              <ExToggle iconOnly><Sparkles size={13} /></ExToggle>
              <ExToggle rightIcon={<Sparkles size={13} />}>Toggle</ExToggle>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExToggle leftIcon={<Sparkles size={13} />}>
  Toggle
</ExToggle>

<ExToggle iconOnly>
  <Sparkles size={13} />
</ExToggle>

<ExToggle rightIcon={<Sparkles size={13} />}>
  Toggle
</ExToggle>`}
          </ExCodeBlock>
        </section>

        <section id="selected" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Selected State</h3>
            <p className="text-muted text-md">
              Use the selected prop to indicate active selection. When selected, the toggle appears bold.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-wrap gap-2">
              <ExToggle selected>Selected</ExToggle>
              <ExToggle>Not Selected</ExToggle>
              <ExToggle disabled>Selected</ExToggle>
              <ExToggle loading>Selected</ExToggle>
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExToggle selected>Selected</ExToggle>
<ExToggle>Not Selected</ExToggle>
<ExToggle disabled>Selected</ExToggle>
<ExToggle loading>Selected</ExToggle>`}
          </ExCodeBlock>
        </section>

        <section id="events" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Events</h3>
            <p className="text-muted text-md">
              Use onSelect callback to handle selection changes. The callback receives the new selected state and optional id.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-wrap gap-2">
              {category.map((item) => (
            <ExToggle
                key={item.id}
                id={item.id.toString()}
                selected={selected.some((value) => value.id === item.id)}
                onSelect={(value, id) => {
                  console.log("Selected:", value, "ID:", id);
                  handleSelect(item);
                }}>
                {item.label}
              </ExToggle>
              ))}
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`<ExToggle
  id="toggle-1"
  selected={true}
  onSelect={(value, id) => {
    console.log("Selected:", value, "ID:", id);
  }}
>
  Toggle
</ExToggle>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}