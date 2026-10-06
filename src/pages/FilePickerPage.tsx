import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import ExCanvas from "../shared/components/ExCanvas";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExFilePicker from "@/lib/components/FilePicker/ExFilePicker";
import { useState } from "react";

export default function FilePickerPage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
  ];

  const [file, setFile] = useState<File | null>(null);

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">File Picker</h2>
          <p className="text-muted">
            File Picker allows users to select and manage files through a clean, customizable interface. It supports file type restrictions,
            maximum file size validation, replacing existing files, and removing selected files while keeping the component fully
            controlled.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-md text-muted">
              Use <code>file</code> to control the selected file,
              <code> onFileSelect</code> to receive newly selected files, and
              <code> onRemove</code> to clear the current selection.
            </p>
          </div>

          <ExCanvas>
            <div className="flex items-center gap-5 max-w-90 w-full">
              <ExFilePicker
                file={file}
                accept="image/*"
                onFileSelect={(files) => {
                  setFile(files[0]);
                }}
                onRemove={() => {
                  setFile(null);
                }}
              />
            </div>
          </ExCanvas>
          <ExCodeBlock language="tsx">
            {`const [file, setFile] = useState<File>();

<ExFilePicker
  file={file}
  accept="image/*"
  onFileSelect={(files) => {
    setFile(files[0]);
  }}
  onRemove={() => {
    setFile(null);
  }}
/>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
