import { useState } from "react";
import ExExplorerItem from "../lib/components/ExplorerItem/ExExplorerItem";
import ExImageViewer from "../lib/components/ImageViewer/ExImageViewer";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import useExUpload from "../lib/components/UploadProvider/ExUploadContext";

interface MyFile {
  id: string;
  name: string;
  type: string;
  file?: File;
}

export default function ImageViewerPage() {
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

  const myFile: MyFile[] = files.map((file, index) => ({
    id: String(index),
    name: file.name,
    type: file.type,
    file,
  }));

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2">
          <h2 className="text-3xl font-semibold">Image Viewer</h2>

          <p>
            Image Viewer is a fullscreen image preview component that allows
            users to inspect images with smooth zooming, dragging, touch
            gestures, and download support.
          </p>

          <p>
            It supports both remote images using a URL and local images using a
            File object.
          </p>
        </section>

        <section id="basic-usage" className="grid gap-5">
          <div>
            <h2 className="text-2xl font-semibold">Basic Usage</h2>

            <p className="mt-2 text-muted">
              Provide an image URL to display the image viewer. Users can zoom
              in, zoom out, drag the image, reset the position, and download the
              image.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-5">
              <ExExplorerItem
                id="1"
                name="Vacation Bali 2025.jpg"
                type="image/jpeg"
                url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                onClick={() =>
                  setViewer({
                    name: "Vacation Bali 2025.jpg",
                    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                  })
                }
              />

              <ExExplorerItem
                id="2"
                name="Mountain.jpg"
                type="image/jpeg"
                url="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                onClick={() =>
                  setViewer({
                    name: "Mountain.jpg",
                    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                  })
                }
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`const [viewer, setViewer] = useState(null);

setViewer({
  name: "Mountain.jpg",
  url: "https://example.com/image.jpg",
});

<ExImageViewer
  name={viewer.name}
  url={viewer.url}
  onClose={() => setViewer(null)}
/>`}
          </ExCodeBlock>
        </section>

        <section id="upload-file" className="grid gap-5">
          <div>
            <h2 className="text-2xl font-semibold">Upload File</h2>

            <p className="mt-2 text-muted">
              Image Viewer can preview local uploaded images directly from a
              File object without requiring an external URL.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-5">
              {myFile.length > 0 ? (
                myFile.map((item) => (
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
                  Upload an image file to preview it with Image Viewer.
                </p>
              )}
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`setViewer({
  name: file.name,
  file,
});

<ExImageViewer
  name={viewer.name}
  file={viewer.file}
  onClose={() => setViewer(null)}
/>`}
          </ExCodeBlock>
        </section>
      </div>

      {viewer && (
        <ExImageViewer
          name={viewer.name}
          url={viewer.url}
          file={viewer.file}
          onClose={() => setViewer(null)}
        />
      )}
    </PageContent>
  );
}
