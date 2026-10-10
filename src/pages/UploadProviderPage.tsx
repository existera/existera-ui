import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExExplorerItem from "../lib/components/ExplorerItem/ExExplorerItem";
import useExUpload from "../lib/components/UploadProvider/ExUploadContext";
import PageContent from "../shared/documentation/PageContent";

interface MyFile {
  id: string;
  name: string;
  type: string;
  hexColor?: string;
  url?: string;
  selected?: boolean;
  file?: File;
}

export default function UploadProviderPage() {
  const section = [
    {
      name: "Introduction",
      link: "#intro",
    },
    {
      name: "Basic Usage",
      link: "#basic-usage",
    },
    {
      name: "Access Files",
      link: "#access-files",
    },
    {
      name: "Rendering Files",
      link: "#render-files",
    },
    {
      name: "Removing Files",
      link: "#remove-files",
    },
    {
      name: "Upload Button",
      link: "#upload-button",
    },
    {
      name: "Drag & Drop",
      link: "#drag-drop",
    },
  ];

  const { files, setFiles } = useExUpload();
  const myFile: MyFile[] = files.map((item, i) => ({
    id: i.toString(),
    name: item.name,
    type: item.type,
    file: item,
  }));

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid section-anchor gap-5">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              Upload Provider
            </h1>
            <p className="max-w-3xl text-md leading-7 text-muted">
              Upload Provider is a global context that enables drag-and-drop
              file uploading across your application. It automatically manages
              uploaded files, exposes them through React Context, and allows any
              component to access, render, or modify the current file
              collection.
            </p>
            <p className="max-w-3xl text-md leading-7 text-muted">
              Instead of handling upload state individually, wrap your
              application with
              <code> ExUploadProvider </code> and consume uploaded files
              anywhere using
              <code> useExUpload()</code>.
            </p>
          </div>
          <div className="grid gap-2 text-sm">
            <p>• Global file management with React Context</p>
            <p>• Drag & drop anywhere inside the provider</p>
            <p>• Automatic File API integration</p>
            <p>• Supports multiple file uploads</p>
            <p>• Easy access through useExUpload()</p>
            <p>• Built for Explorer and File Manager components</p>
          </div>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Wrap your application or a specific section with
              <code> ExUploadProvider </code>. Once wrapped, every component
              inside can access uploaded files through
              <code> useExUpload()</code>.
            </p>
          </div>
          <ExCodeBlock language="tsx">
            {`<ExUploadProvider>
  <App />
</ExUploadProvider>`}
          </ExCodeBlock>
        </section>

        <section id="access-files" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Access Uploaded Files</h3>
            <p className="text-muted text-md">
              Use the <code>useExUpload()</code> hook to access the uploaded
              files or update them programmatically.
            </p>
          </div>

          <ExCodeBlock language="tsx">
            {`const { files, setFiles } = useExUpload();

console.log(files);`}
          </ExCodeBlock>
        </section>

        <section id="render-files" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Rendering Files</h3>
            <p className="text-muted text-md">
              Uploaded files are standard
              <code> File </code>
              objects, allowing them to be rendered in custom interfaces such as
              file explorers, galleries, or upload lists.
            </p>
          </div>
          <ExCodeBlock language="tsx">
            {`{files.map((file) => (
  <ExExplorerItem
    key={file.name}
    name={file.name}
    type={file.type}
    file={file}
  />
))}`}
          </ExCodeBlock>
        </section>

        <section id="remove-files" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Removing Files</h3>
            <p className="text-muted text-md">
              Files can be removed by updating the provider state with
              <code> setFiles()</code>.
            </p>
          </div>
          <ExCodeBlock language="tsx">
            {`setFiles((prev) =>
  prev.filter((item) => item !== file)
);`}
          </ExCodeBlock>
        </section>

        <section id="upload-button" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Upload Button</h3>
            <p className="text-muted text-md">
              Enable the built-in floating upload button by setting
              <code> uploadButton </code>
              to
              <code> true</code>.
            </p>
          </div>
          <ExCodeBlock language="tsx">
            {`<ExUploadProvider uploadButton>
  <Page />
</ExUploadProvider>`}
          </ExCodeBlock>
        </section>

        <section id="drag-drop" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Drag & Drop</h3>
            <p className="text-muted text-md">
              Users can drag files or folders anywhere inside the provider.
              Uploaded files are immediately added to the shared context and
              become available to every consumer.
            </p>
          </div>
          <span>
            Folder uploads require browser support for the File System API.
          </span>
        </section>

        {/* CONTENT */}
        {myFile.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {myFile.map((item, index) => (
              <ExExplorerItem
                key={`${item.name}-${index}`}
                id={item.id}
                name={item.name}
                type={item.type}
                file={item.file}
                onDelete={() => {
                  setFiles((prev) => prev.filter((file) => file !== item.file));
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <p className="text-lg mt-2 mb-6 text-muted/70">
              Drag files or folders anywhere into the browser to start
              uploading.
            </p>
          </div>
        )}
      </div>
    </PageContent>
  );
}
