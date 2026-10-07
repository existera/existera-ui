import { useEffect, useState } from "react";

import ExExplorerItem from "../lib/components/ExplorerItem/ExExplorerItem";

import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";
import ExCanvas from "../shared/components/ExCanvas";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";

type ApiFile = {
  id: string;
  name: string;
  type: string;
  hexColor?: string;
  url?: string;
};

export default function ExExplorerItemPage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Folders", link: "#folders" },
    { name: "Media Files", link: "#media-files" },
    { name: "Documents", link: "#documents" },
    { name: "Extended File Types", link: "#extended-file-types" },
  ];

  const [folder, setFolder] = useState<ApiFile[]>([]);
  const [media, setMedia] = useState<ApiFile[]>([]);
  const [document, setDocument] = useState<ApiFile[]>([]);
  const [fileFolder, setFileFolder] = useState<ApiFile[]>([]);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const [folderRes, mediaRes, documentRes, fileFolderRes] =
          await Promise.all([
            fetch("/folder.json"),
            fetch("/file-media.json"),
            fetch("/file-document.json"),
            fetch("/file-folder.json"),
          ]);

        const [folderData, mediaData, documentData, fileFolderData] =
          await Promise.all([
            folderRes.json(),
            mediaRes.json(),
            documentRes.json(),
            fileFolderRes.json(),
          ]);

        setFolder(folderData);
        setMedia(mediaData);
        setDocument(documentData);
        setFileFolder(fileFolderData);
      } catch (error) {
        console.error("Failed to load explorer examples.", error);
      }
    }

    fetchFiles();
  }, []);

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid section-anchor gap-5">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              Explorer Item
            </h1>
            <p className="leading-7 text-muted">
              Explorer Item provides a consistent visual representation for
              files and folders. It automatically determines the appropriate
              icon, thumbnail, badge, and styling based on MIME type or file
              extension, making it ideal for file managers, cloud storage
              interfaces, uploaders, and document browsers.
            </p>
            <p className="leading-7 text-muted">
              Images are rendered as thumbnails whenever possible, while
              documents, archives, media, source code, and folders receive
              context-aware icons for quick recognition.
            </p>
          </div>
          <div className="grid gap-2 text-sm">
            <p>• Automatic file type detection</p>
            <p>• Image thumbnail preview</p>
            <p>• Intelligent folder icons</p>
            <p>• Supports hundreds of common file extensions</p>
            <p>• Optional custom folder color</p>
            <p>• Ideal for upload managers and file explorers</p>
          </div>
        </section>

        <section id="folders" className="grid section-anchor gap-5">
          <div>
            <h2 className="text-2xl font-semibold">Folders</h2>
            <p className="mt-2 text-muted">
              Folder items automatically render with folder-specific icons and
              optional custom colors. They can represent local directories,
              project workspaces, shared folders, or cloud storage locations.
            </p>
          </div>
          <ExCanvas>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-7">
              {folder.map((item) => (
                <ExExplorerItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  hexColor={item.hexColor}
                />
              ))}
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExExplorerItem
  key={1}
  id={1}
  name="Profile"
  type="folder"
  hexColor="#9CA3AF"
/>`}
          </ExCodeBlock>
        </section>

        <section id="media-files" className="grid section-anchor gap-5">
          <div>
            <h2 className="text-2xl font-semibold">Media Files</h2>
            <p className="mt-2 text-muted">
              Images automatically display thumbnail previews when a valid URL
              is provided. Videos, animations, and other media formats are
              rendered using optimized file icons for consistent visual
              presentation.
            </p>
          </div>
          <ExCanvas>
            <div className="flex flex-wrap gap-5">
              {media.map((item) => (
                <ExExplorerItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  url={item.url}
                  hexColor={item.hexColor}
                />
              ))}
            </div>
          </ExCanvas>
        </section>

        <section id="documents" className="grid section-anchor gap-5">
          <div>
            <h2 className="text-2xl font-semibold">Documents</h2>
            <p className="mt-2 text-muted">
              Explorer Item automatically detects office documents, PDFs,
              spreadsheets, presentations, text files, and audio formats,
              displaying recognizable icons that help users identify content at
              a glance.
            </p>
          </div>
          <ExCanvas>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-7">
              {document.map((item) => (
                <ExExplorerItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  url={item.url}
                  hexColor={item.hexColor}
                />
              ))}
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExExplorerItem
  key={1}
  id={1}
  name="Company Profile.pdf"
  type="application/pdf"
  url="https://example.com/files/company-profile.pdf"
/>`}
          </ExCodeBlock>
        </section>

        <section id="extended-file-types" className="grid section-anchor gap-5">
          <div>
            <h2 className="text-2xl font-semibold">
              Extended File Type Support
            </h2>
            <p className="mt-2 text-muted">
              Beyond common file formats, Explorer Item recognizes development
              files, archives, databases, configuration files, templates,
              markdown, JSON, XML, SQL, compressed packages, fonts, and many
              other formats. Icons and labels are resolved automatically using
              MIME types and file extensions.
            </p>
          </div>
          <ExCanvas>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-7">
              {fileFolder.map((item) => (
                <ExExplorerItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  url={item.url}
                  hexColor={item.hexColor}
                />
              ))}
            </div>
          </ExCanvas>
        </section>
      </div>
    </PageContent>
  );
}
