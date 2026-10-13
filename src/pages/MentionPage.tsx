"use client";

import { useState } from "react";
import { AtSign, X } from "lucide-react";
import ExMention from "@/lib/components/Mention/ExMention";
import type { ExMentionUser } from "@/lib/components/Mention/types/ExMentionType";
import PageContent from "@/shared/documentation/PageContent";

const users: ExMentionUser[] = [
  { id: "1", username: "galuh", name: "Galuh Idam", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "2", username: "gilang", name: "Gilang Pratama", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: "3", username: "johndoe", name: "John Doe", avatar: "https://i.pravatar.cc/150?img=13" },
  { id: "4", username: "jane", name: "Jane Smith", avatar: "https://i.pravatar.cc/150?img=47" },
  { id: "5", username: "alex", name: "Alex Morgan", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: "6", username: "sarah", name: "Sarah Wilson", avatar: "https://i.pravatar.cc/150?img=44" },
];

export default function MentionPage() {
  const [selectedUsers, setSelectedUsers] = useState<ExMentionUser[]>([]);
  const [lastSelected, setLastSelected] = useState<ExMentionUser | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const handleSelect = (user: ExMentionUser) => {
    setLastSelected(user);
    setSelectedUsers((current) => (current.some((item) => item.id === user.id) ? current : [...current, user]));
  };

  const removeSelected = (id: string) => {
    setSelectedUsers((current) => current.filter((user) => user.id !== id));
  };

  return (
    <PageContent
      section={[
        { name: "Basic Usage", link: "#basic-usage" },
        { name: "Textarea Mention", link: "#textarea-mention" },
        { name: "Selected Mention", link: "#selected-mention" },
      ]}>
      <div className="min-w-0 space-y-12 text-foreground">
        <ExMention users={users} onSelect={handleSelect} />

        <section id="basic-usage" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Basic Usage</h2>
            <p className="text-sm text-muted">Type @ followed by a username to mention someone.</p>
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="w-full max-w-xl rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
            placeholder="Type @username..."
          />
        </section>

        <section id="textarea-mention" className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Textarea Mention</h2>
            <p className="text-sm text-muted">Mention multiple users while composing a message.</p>
          </div>

          <textarea
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="w-full max-w-xl resize-y rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
            placeholder="Write a message and mention someone using @..."
          />
        </section>

        <section id="selected-mention" className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Selected Mention</h2>
            <p className="text-sm text-muted">Users selected from the mention suggestions appear below.</p>
          </div>

          <div className="w-full max-w-xl space-y-5 rounded-xl border border-border bg-surface p-5">
            {lastSelected ? (
              <div className="flex items-center gap-3">
                <img src={lastSelected.avatar} alt={lastSelected.name} className="size-11 rounded-full border border-border object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{lastSelected.name}</p>
                  <p className="truncate text-xs text-muted">@{lastSelected.username}</p>
                </div>
                <span className="rounded-md bg-surface-2 px-2 py-1 text-[11px] text-muted">ID: {lastSelected.id}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-muted">
                <div className="flex size-10 items-center justify-center rounded-full bg-surface-2">
                  <AtSign className="size-4" />
                </div>
                <p className="text-xs">No user selected yet. Try typing @ in an input above.</p>
              </div>
            )}

            <div className="border-t border-border pt-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold">Mentioned Users</span>
                <span className="text-xs text-muted">{selectedUsers.length} selected</span>
              </div>

              {selectedUsers.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 py-1 pl-1 pr-2">
                      <img src={user.avatar} alt="" className="size-6 rounded-full object-cover" />
                      <span className="text-xs font-medium">@{user.username}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${user.username}`}
                        onClick={() => removeSelected(user.id)}
                        className="flex size-5 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-foreground">
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted">Selected mentions will appear here.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageContent>
  );
}
