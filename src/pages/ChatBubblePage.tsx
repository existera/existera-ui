import { ExChatBubble } from "@/lib";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function ChatBubblePage() {
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
      name: "Long Text",
      link: "#long-text",
    },
    {
      name: "Size",
      link: "#size",
    },
    {
      name: "Media",
      link: "#media",
    },
    {
      name: "Position",
      link: "#position",
    },
    {
      name: "Avatar",
      link: "#avatar",
    },
    {
      name: "Name",
      link: "#name",
    },
    {
      name: "Timestamp",
      link: "#timestamp",
    },
    {
      name: "Status",
      link: "#status",
    },
    {
      name: "Customization",
      link: "#customization",
    },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section
          id="intro"
          className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">
            Chat Bubble
          </h2>
          <p>
            Chat bubbles are used to display
            messages in a chat interface similar
            to WhatsApp. They support different
            positions for sender and receiver,
            avatars, timestamps, delivery status,
            and customizable styling for modern
            chat applications.
          </p>
        </section>

        <section
          id="basic-usage"
          className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              Basic Usage
            </h3>
            <p className="text-muted text-md">
              Display chat messages with minimal
              configuration.
            </p>
          </div>

          <ExCanvas>
            <div className="md:mx-15 w-full flex flex-col gap-4">
              <ExChatBubble
                position="left"
                message="Hello there! How can I help you today?"
                showName={false}
              />
              <ExChatBubble
                position="right"
                message="Hi! I need some help with my recent order."
                showName={false}
              />
              <ExChatBubble
                position="left"
                message="Sure! What seems to be the issue?"
                showName={false}
              />
              <ExChatBubble
                position="left"
                message="Here is a longer message that demonstrates how the bubble adjusts to fit longer text content. It should wrap nicely and maintain proper padding and styling."
                showName={false}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExChatBubble position="left" message="Hello there! How can I help you today?" />
<ExChatBubble position="right" message="Hi! I need some help with my recent order." />
<ExChatBubble position="left" message="Sure! What seems to be the issue?" />
<ExChatBubble position="left" message="Here is a longer message that demonstrates how the bubble adjusts to fit longer text content. It should wrap nicely and maintain proper padding and styling." />`}
          </ExCodeBlock>
        </section>

        <section
          id="long-text"
          className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              Long Text
            </h3>
            <p className="text-muted text-md">
              Long messages automatically show
              "Read more" and can be expanded to
              view full content.
            </p>
          </div>

          <ExCanvas>
            <div className="md:mx-15 w-full flex flex-col gap-4">
              <ExChatBubble
                position="left"
                message="This is a very long message that spans multiple lines and demonstrates the read more functionality. When the message is longer than 3 lines, a 'Read more' link appears. Click on the message to expand and view the complete content. This is useful for chat applications where users might send lengthy messages that need to be previewed before reading in full."
                showName={false}
                timestamp="10:32 AM"
                status="delivered"
              />
              <ExChatBubble
                position="right"
                message="This is a sender message that is also quite long and will show when the content exceeds the line limit. The read more feature helps maintain a clean interface while allowing users to access the full message when needed. You can click anywhere on the message bubble to toggle between collapsed and expanded states."
                showName={false}
                timestamp="10:32 AM"
                status="delivered"
              />
              <ExChatBubble
                position="left"
                message="Click on this message to see the expand feature in action!"
                showName={false}
                timestamp="10:32 AM"
                status="delivered"
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExChatBubble
  position="left"
  message="This is a very long message that spans multiple lines and demonstrates the read more functionality..."
/>
<ExChatBubble
  position="right"
  message="You can click on the message to expand it..."
/>`}
          </ExCodeBlock>
        </section>

        <section
          id="size"
          className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              Size
            </h3>
            <p className="text-muted text-md">
              Choose from four_sizes to fit
              different chat interface designs.
            </p>
          </div>

          <ExCanvas>
            <div className="md:mx-15 w-full flex flex-col gap-4">
              <ExChatBubble
                size="xs"
                position="left"
                message="Extra small"
                showName={false}
              />
              <ExChatBubble
                size="sm"
                position="right"
                message="Small"
                showName={false}
              />
              <ExChatBubble
                size="md"
                position="left"
                message="Medium (default)"
                showName={false}
              />
              <ExChatBubble
                size="lg"
                position="right"
                message="Large"
                showName={false}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExChatBubble size="xs" message="Extra small" />
<ExChatBubble size="sm" message="Small" />
<ExChatBubble size="md" message="Medium (default)" />
<ExChatBubble size="lg" message="Large" />`}
          </ExCodeBlock>
        </section>

        <section
          id="position"
          className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              Position
            </h3>
            <p className="text-muted text-md">
              Use position prop to indicate sender
              (right) or receiver (left).
            </p>
          </div>

          <ExCanvas>
            <div className="md:mx-15 w-full flex flex-col gap-4">
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted mb-1">
                  Receiver (left)
                </span>
                <ExChatBubble
                  position="left"
                  message="This message is from receiver"
                  showName={false}
                />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted mb-1">
                  Sender (right)
                </span>
                <ExChatBubble
                  position="right"
                  message="This message is from sender"
                  showName={false}
                />
              </div>
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExChatBubble position="left" message="Receiver message" />
<ExChatBubble position="right" message="Sender message" />`}
          </ExCodeBlock>
        </section>

        <section
          id="avatar"
          className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              Avatar
            </h3>
            <p className="text-muted text-md">
              Add user avatars to make
              conversations more personal.
            </p>
          </div>

          <ExCanvas>
            <div className="md:mx-15 w-full flex flex-col gap-4">
              <ExChatBubble
                position="left"
                message="Hello! Welcome to our support chat."
                avatar="https://eu.ui-avatars.com/api/?name=Support&background=0D8ABC&color=fff"
                name="Support Agent"
                showName={false}
              />
              <ExChatBubble
                position="right"
                message="Hi, I need some assistance with my order."
                avatar="https://eu.ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff"
                name="John Doe"
                showName={false}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExChatBubble
  position="left"
  message="Hello!"
  avatar="https://eu.ui-avatars.com/api/?name=Support&background=0D8ABC&color=fff"
  name="Support Agent"
/>`}
          </ExCodeBlock>
        </section>

        <section
          id="name"
          className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              Name
            </h3>
            <p className="text-muted text-md">
              Display user names above messages.
              Toggle with showName prop.
            </p>
          </div>

          <ExCanvas>
            <div className="md:mx-15 w-full flex flex-col gap-4">
              <ExChatBubble
                position="left"
                message="Message without name"
                name="User A"
                showName={false}
              />
              <ExChatBubble
                position="right"
                message="Message with name"
                name="User B"
                showName={true}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExChatBubble
  position="left"
  message="Message without name"
  name="User A"
  showName={false}
/>

<ExChatBubble
  position="right"
  message="Message with name"
  name="User B"
  showName={true}
/>`}
          </ExCodeBlock>
        </section>

        <section
          id="media"
          className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              Media
            </h3>
            <p className="text-muted text-md">
              Send images, videos, or files with
              chat bubbles.
            </p>
          </div>

          <ExCanvas>
            <div className="md:mx-15 w-full flex flex-col gap-4">
              <ExChatBubble
                position="left"
                media="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80"
                mediaType="image"
                timestamp="10:30 AM"
                status="read"
                showName={false}
              />
              <ExChatBubble
                position="right"
                media="https://www.w3schools.com/html/mov_bbb.mp4"
                mediaType="video"
                timestamp="10:32 AM"
                status="delivered"
                showName={false}
              />
              <ExChatBubble
                position="left"
                message="Check out this photo!"
                media="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&q=80"
                mediaType="image"
                timestamp="10:30 AM"
                status="read"
                showName={false}
              />
              <ExChatBubble
                position="right"
                media="https://www.w3schools.com/html/mov_bbb.mp4"
                mediaType="video"
                timestamp="10:32 AM"
                status="delivered"
                message="Check out this video!"
                showName={false}
              />
              <ExChatBubble
                position="left"
                media="document.pdf"
                mediaType="file"
                timestamp="10:35 AM"
                status="sent"
                showName={false}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExChatBubble
  position="left"
  message="Check out this photo!"
  media="https://..."
  mediaType="image"
/>
<ExChatBubble
  position="right"
  media="https://..."
  mediaType="video"
/>
<ExChatBubble
  position="left"
  media="document.pdf"
  mediaType="file"
/>`}
          </ExCodeBlock>
        </section>

        <section
          id="timestamp"
          className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              Timestamp
            </h3>
            <p className="text-muted text-md">
              Show message delivery time. Toggle
              with showTimestamp prop.
            </p>
          </div>

          <ExCanvas>
            <div className="md:mx-15 w-full flex flex-col gap-4">
              <ExChatBubble
                position="left"
                message="Message with timestamp"
                timestamp="10:30 AM"
                showName={false}
              />
              <ExChatBubble
                position="right"
                message="Message without timestamp"
                timestamp="10:32 AM"
                showName={false}
                showTimestamp={false}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExChatBubble
  position="left"
  message="Message with timestamp"
  timestamp="10:30 AM"
/>

<ExChatBubble
  position="right"
  message="Message without timestamp"
  showTimestamp={false}
/>`}
          </ExCodeBlock>
        </section>

        <section
          id="status"
          className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              Status
            </h3>
            <p className="text-muted text-md">
              Show delivery status for sender
              messages. Toggle with showStatus
              prop.
            </p>
          </div>

          <ExCanvas>
            <div className="md:mx-15 w-full flex flex-col gap-4">
              <ExChatBubble
                position="right"
                message="Sent"
                timestamp="10:30 AM"
                status="sent"
              />
              <ExChatBubble
                position="right"
                message="Delivered"
                timestamp="10:30 AM"
                status="delivered"
              />
              <ExChatBubble
                position="right"
                message="Read"
                timestamp="10:30 AM"
                status="read"
              />
              <ExChatBubble
                position="right"
                message="No status"
                timestamp="10:30 AM"
                showStatus={false}
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExChatBubble
  position="right"
  message="Sent"
  status="sent"
/>

<ExChatBubble
  position="right"
  message="Delivered"
  status="delivered"
/>

<ExChatBubble
  position="right"
  message="Read"
  status="read"
/>`}
          </ExCodeBlock>
        </section>

        <section
          id="customization"
          className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              Customization
            </h3>
            <p className="text-muted text-md">
              Control visibility of all elements
              with boolean props.
            </p>
          </div>

          <ExCanvas>
            <div className="md:mx-15 w-full flex flex-col gap-4">
              <ExChatBubble
                position="left"
                message="All visible"
                avatar="https://eu.ui-avatars.com/api/?name=A&background=0D8ABC&color=fff"
                name="Person A"
                timestamp="10:30 AM"
                status="read"
                showAvatar={true}
                showName={true}
                showTimestamp={true}
                showStatus={true}
              />
              <ExChatBubble
                position="right"
                message="Custom styling"
                avatar="https://eu.ui-avatars.com/api/?name=B&background=667eea&color=fff"
                name="Person B"
                timestamp="10:32 AM"
                className="custom-class"
              />
            </div>
          </ExCanvas>

          <ExCodeBlock language="tsx">
            {`<ExChatBubble
  position="left"
  message="All visible"
  avatar="https://..."
  name="Person A"
  timestamp="10:30 AM"
  showAvatar={true}
  showName={true}
  showTimestamp={true}
  showStatus={true}
/>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
