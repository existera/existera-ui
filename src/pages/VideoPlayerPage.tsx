import { useState } from "react";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExExplorerItem from "../lib/components/ExplorerItem/ExExplorerItem";
import ExVideoPlayer from "../lib/components/VideoPlayer/ExVideoPlayer";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function VideoPlayerPage() {
  const section: OnThisPage[] = [
    {
      name: "Introduction",
      link: "#intro",
    },
    {
      name: "Basic Usage",
      link: "#basic-usage",
    },
  ];

  const [viewer, setViewer] = useState<{
    name: string;
    url: string;
  } | null>(null);

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Video Player</h2>
          <p>Video Player is a fullscreen video viewer built on top of the browser's native HTML5 video API.</p>
          <p>
            It includes custom playback controls, a buffered timeline, loading and buffering indicators, ten-second skip controls, volume,
            playback speed, optional WebVTT subtitles, and error recovery. Fullscreen and picture-in-picture controls appear when supported
            by the browser.
          </p>
        </section>

        <section id="basic-usage" className="grid gap-5 section-anchor">
          <div>
            <h2 className="text-2xl font-semibold">Basic Usage</h2>
            <p className="mt-2 text-muted">Pass a remote MP4 URL to open the fullscreen video player.</p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-5">
              <ExExplorerItem
                id="1"
                name="Big Buck Bunny.mp4"
                type="video/mp4"
                url="https://www.w3schools.com/html/mov_bbb.mp4"
                onClick={() =>
                  setViewer({
                    name: "Big Buck Bunny.mp4",
                    url: "https://www.w3schools.com/html/mov_bbb.mp4",
                  })
                }
              />

              <ExExplorerItem
                id="2"
                name="Flower.mp4"
                type="video/mp4"
                url="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                onClick={() =>
                  setViewer({
                    name: "Flower.mp4",
                    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
                  })
                }
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`const [viewer, setViewer] = useState(null);

setViewer({
  name: "Big Buck Bunny.mp4",
  url: "https://www.w3schools.com/html/mov_bbb.mp4",
});

<ExVideoPlayer
  name={viewer.name}
  url={viewer.url}
  autoPlay
  controls
  onClose={() => setViewer(null)}
/>`}
          </ExCodeBlock>
        </section>
      </div>

      {viewer && <ExVideoPlayer name={viewer.name} url={viewer.url} autoPlay controls onClose={() => setViewer(null)} />}
    </PageContent>
  );
}
