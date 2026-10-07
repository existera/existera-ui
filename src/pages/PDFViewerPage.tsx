import { useState } from "react";
import ExCanvas from "../shared/components/ExCanvas";
import PageContent from "../shared/documentation/PageContent";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExExplorerItem from "../lib/components/ExplorerItem/ExExplorerItem";
import ExPDFViewer from "../lib/components/PDFViewer/ExPDFViewer";
import useExUpload from "../lib/components/UploadProvider/ExUploadContext";

interface MyFile {
  id: string;
  name: string;
  type: string;
  file?: File;
}

export default function PDFViewerPage() {
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
      name: "Upload File",
      link: "#upload-file",
    },
  ];

  const [viewer, setViewer] = useState<{
    name: string;
    url?: string;
    file?: File;
  } | null>(null);

  const { files, setFiles } = useExUpload();

  const pdfFiles: MyFile[] = files
    .filter((file) => file.type === "application/pdf")
    .map((file, index) => ({
      id: String(index),
      name: file.name,
      type: file.type,
      file,
    }));

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">PDF Viewer</h2>

          <p>
            PDF Viewer is a fullscreen document preview component for displaying
            PDF files inside a modal. It uses the browser's native PDF viewer
            when available, providing familiar controls such as scrolling,
            zooming, searching, printing, and downloading.
          </p>

          <p>
            The component supports both remote PDF documents through a URL and
            local PDF files using a <code>File</code> object.
          </p>
        </section>

        <section id="basic-usage" className="grid gap-5 section-anchor">
          <div>
            <h2 className="text-2xl font-semibold">Basic Usage</h2>

            <p className="mt-2 text-muted">
              Pass a PDF URL to display the document inside the viewer. This is
              useful for previewing documents hosted on your server or a CDN.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-5">
              <ExExplorerItem
                id="1"
                name="dummy1.pdf"
                type="application/pdf"
                url="/dummy1.pdf"
                onClick={() =>
                  setViewer({
                    name: "dummy1.pdf",
                    url: "/dummy1.pdf",
                  })
                }
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`const [viewer, setViewer] = useState(null);

setViewer({
  name: "dummy1.pdf",
  url: "/dummy1.pdf",
});

<ExPDFViewer
  name={viewer.name}
  url={viewer.url}
  onClose={() => setViewer(null)}
/>`}
          </ExCodeBlock>
        </section>

        <section id="upload-file" className="grid gap-5 section-anchor">
          <div>
            <h2 className="text-2xl font-semibold">Upload File</h2>

            <p className="mt-2 text-muted">
              PDF Viewer can preview local PDF files directly from a{" "}
              <code>File</code> object without uploading them to a server.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-5">
              {pdfFiles.length > 0 ? (
                pdfFiles.map((item) => (
                  <ExExplorerItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type={item.type}
                    file={item.file}
                    onClick={() =>
                      setViewer({
                        name: item.name,
                        file: item.file,
                      })
                    }
                    onDelete={() =>
                      setFiles((prev) =>
                        prev.filter((file) => file !== item.file),
                      )
                    }
                  />
                ))
              ) : (
                <p className="text-muted/70">
                  Upload a PDF file to preview it with PDF Viewer.
                </p>
              )}
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`setViewer({
  name: file.name,
  file,
});

<ExPDFViewer
  name={viewer.name}
  file={viewer.file}
  onClose={() => setViewer(null)}
/>`}
          </ExCodeBlock>
        </section>
      </div>

      {viewer && (
        <ExPDFViewer
          name={viewer.name}
          url={viewer.url}
          file={viewer.file}
          onClose={() => setViewer(null)}
        />
      )}
    </PageContent>
  );
}
