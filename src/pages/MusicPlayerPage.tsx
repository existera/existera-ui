import { useState } from "react";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExExplorerItem from "../lib/components/ExplorerItem/ExExplorerItem";
import ExMusicPlayer from "../lib/components/MusicPlayer/ExMusicPlayer";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function MusicPlayerPage() {
  const section: OnThisPage[] = [
    {
      name: "Introduction",
      link: "#intro",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Basic Usage",
      link: "#basic-usage",
    }
  ];

  const [player, setPlayer] = useState<{
    name: string;
    url: string;
  } | null>(null);

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        {/* INTRO */}
        <section id="intro" className="grid gap-3 section-anchor">
          <h2 className="text-3xl font-semibold">Music Player</h2>

          <p>
            ExMusicPlayer is a modern audio player component built on top of the
            native HTML5 Audio API.
          </p>

          <p>
            It provides a clean interface for playing audio files with playback
            controls, progress tracking, volume adjustment, loading state, and
            responsive behavior.
          </p>
        </section>

        {/* FEATURES */}
        <section id="features" className="grid gap-3 section-anchor">
          <h2 className="text-2xl font-semibold">Features</h2>

          <ul className="list-disc space-y-2 pl-5">
            <li>Play and pause audio playback.</li>
            <li>Audio progress tracking and seeking.</li>
            <li>Volume control with animated popup.</li>
            <li>Loading indicator while audio is preparing.</li>
            <li>Animated music visualizer.</li>
            <li>Dark and light theme support.</li>
            <li>Responsive floating player design.</li>
            <li>Supports MP3, WAV, OGG, and browser-compatible formats.</li>
          </ul>
        </section>

        {/* BASIC USAGE */}
        <section id="basic-usage" className="grid gap-5 section-anchor">
          <div>
            <h2 className="text-2xl font-semibold">Basic Usage</h2>

            <p className="mt-2 text-muted">
              Select an audio file to open ExMusicPlayer.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-wrap gap-5">
              <ExExplorerItem
                id="1"
                name="SoundHelix Song 1.mp3"
                type="audio/mpeg"
                url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                onClick={() =>
                  setPlayer({
                    name: "SoundHelix Song 1.mp3",
                    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                  })
                }
              />

              <ExExplorerItem
                id="2"
                name="SoundHelix Song 2.mp3"
                type="audio/mpeg"
                url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
                onClick={() =>
                  setPlayer({
                    name: "SoundHelix Song 2.mp3",
                    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                  })
                }
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`const [player, setPlayer] = useState<{
  name: string;
  url: string;
} | null>(null);

const audio = {
  name: "SoundHelix Song 1.mp3",
  url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};

setPlayer(audio);

{player && (
  <ExMusicPlayer
    name={player.name}
    url={player.url}
    autoPlay
    onClose={() => setPlayer(null)}
  />
)}`}
          </ExCodeBlock>
        </section>
      </div>

      {player && (
        <ExMusicPlayer
          name={player.name}
          url={player.url}
          autoPlay
          onClose={() => setPlayer(null)}
        />
      )}
    </PageContent>
  );
}
