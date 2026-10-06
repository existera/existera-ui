import {
  AlertCircle,
  Check,
  CircleQuestionMark,
  TriangleAlert,
  User,
} from "lucide-react";
import ExAvatar from "../lib/components/Avatar/ExAvatar";
import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExCanvas from "../shared/components/ExCanvas";
import { type OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function AvatarPage() {
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
      name: "Variants",
      link: "#variant",
    },
    {
      name: "Color",
      link: "#color",
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
      name: "Status",
      link: "#status",
    },
    {
      name: "Group",
      link: "#group",
    },
  ];
  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-20">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Avatar</h2>
          <p>
            Avatars represent users, teams, and entities across your
            application. They can display profile images, generated initials, or
            icons, and support multiple variants, colors, and sizes for
            different interface contexts.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Display a user's profile image. When no image is provided, the
              avatar automatically falls back to generated initials.
            </p>
          </div>

          <ExCanvas>
            <div className="flex items-center gap-5">
              <ExAvatar
                name="Michele Jane"
                imgURL="https://i.pravatar.cc/300?img=5"
              />
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExAvatar 
  name="Michele Jane" 
  imgURL="https://i.pravatar.cc/300?img=5"
/>`}
          </ExCodeBlock>
        </section>

        <section id="variant" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Variant</h3>
            <p className="text-muted text-md">
              Choose between image, solid, and soft variants to match different
              visual styles and emphasis levels.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Image</h4>
              <ExCanvas>
                <div className="flex items-center gap-5">
                  <ExAvatar
                    name="Michele Jane"
                    imgURL="https://i.pravatar.cc/300?img=5"
                  />
                </div>
              </ExCanvas>
              <ExCodeBlock language="html">
                {`<ExAvatar 
  name="Michele Jane" 
  imgURL="https://i.pravatar.cc/300?img=5"
/>`}
              </ExCodeBlock>
            </div>
            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Solid</h4>
              <ExCanvas>
                <div className="flex items-center gap-5">
                  <ExAvatar variant="solid" name="Michele Jane" />
                </div>
              </ExCanvas>
              <ExCodeBlock language="html">
                {`<ExAvatar 
  variant="solid" 
  name="Michele Jane" 
/>`}
              </ExCodeBlock>
            </div>
            <div className="grid gap-3">
              <h4 className="text-xl font-semibold">Solid</h4>
              <ExCanvas>
                <div className="flex items-center gap-5">
                  <ExAvatar variant="soft" name="Michele Jane" />
                </div>
              </ExCanvas>
              <ExCodeBlock language="html">
                {`<ExAvatar 
  variant="soft" 
  name="Michele Jane" 
/>`}
              </ExCodeBlock>
            </div>
          </div>
        </section>

        <section id="color" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Color</h3>
            <p className="text-muted text-md">
              Apply semantic color variants to communicate status, categories,
              or visual hierarchy throughout the interface.
            </p>
          </div>
          <ExCanvas>
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <ExAvatar color="primary" name="Michele Jane" />
                <ExAvatar color="secondary" name="Michele Jane" />
                <ExAvatar color="warning" name="Michele Jane" />
                <ExAvatar color="success" name="Michele Jane" />
                <ExAvatar color="danger" name="Michele Jane" />
              </div>
              <div className="flex items-center gap-3">
                <ExAvatar variant="soft" color="primary" name="Michele Jane" />
                <ExAvatar
                  variant="soft"
                  color="secondary"
                  name="Michele Jane"
                />
                <ExAvatar variant="soft" color="warning" name="Michele Jane" />
                <ExAvatar variant="soft" color="success" name="Michele Jane" />
                <ExAvatar variant="soft" color="danger" name="Michele Jane" />
              </div>
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExAvatar color="primary" name="Michele Jane" />
<ExAvatar color="secondary" name="Michele Jane" />
<ExAvatar color="warning" name="Michele Jane" />
<ExAvatar color="success" name="Michele Jane" />
<ExAvatar color="danger" name="Michele Jane" />`}
          </ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Select from multiple predefined sizes to fit navigation bars,
              lists, cards, tables, and other layouts.
            </p>
          </div>
          <ExCanvas>
            <div className="flex items-center gap-3">
              <ExAvatar size="xs" name="Michele Jane" />
              <ExAvatar size="sm" name="Michele Jane" />
              <ExAvatar size="md" name="Michele Jane" />
              <ExAvatar size="lg" name="Michele Jane" />
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExAvatar size="xs" name="Michele Jane" />
<ExAvatar size="sm" name="Michele Jane" />
<ExAvatar size="md" name="Michele Jane" />
<ExAvatar size="lg" name="Michele Jane" />`}
          </ExCodeBlock>
        </section>

        <section id="icon" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Icon</h3>
            <p className="text-muted text-md">
              Use icons instead of images or initials to represent actions,
              statuses, or system entities.
            </p>
          </div>
          <ExCanvas>
            <div className="flex items-center gap-3">
              <ExAvatar color="primary" icon={<User size={23} />} />
              <ExAvatar
                color="secondary"
                icon={<CircleQuestionMark size={23} />}
              />
              <ExAvatar color="warning" icon={<TriangleAlert size={23} />} />
              <ExAvatar color="success" icon={<Check size={23} />} />
              <ExAvatar color="danger" icon={<AlertCircle size={23} />} />
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExAvatar color="primary" icon={<User size={23}/>} />
<ExAvatar color="secondary" icon={<CircleQuestionMark size={23}/>} />
<ExAvatar color="warning" icon={<TriangleAlert size={23}/>} />
<ExAvatar color="success" icon={<Check size={23}/>} />
<ExAvatar color="danger" icon={<AlertCircle size={23}/>} />`}
          </ExCodeBlock>
        </section>

        <section id="status" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Status</h3>
            <p className="text-muted text-md">
              Display a user's profile image. When no image is provided, the
              avatar automatically falls back to generated initials.
            </p>
          </div>

          <ExCanvas>
            <div className="flex items-center flex-wrap gap-5">
              <ExAvatar
                status="none"
                name="Michele Jane"
                imgURL="https://i.pravatar.cc/300?img=5"
              />
              <ExAvatar
                status="offline"
                name="Michele Jane"
                imgURL="https://i.pravatar.cc/300?img=5"
              />
              <ExAvatar
                status="online"
                name="Michele Jane"
                imgURL="https://i.pravatar.cc/300?img=5"
              />
              <ExAvatar
                status="away"
                name="Michele Jane"
                imgURL="https://i.pravatar.cc/300?img=5"
              />
              <ExAvatar
                status="busy"
                name="Michele Jane"
                imgURL="https://i.pravatar.cc/300?img=5"
              />
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<ExAvatar
  status="none"
  name="Michele Jane"
  imgURL="https://i.pravatar.cc/300?img=5"
/>
<ExAvatar
  status="offline"
  name="Michele Jane"
  imgURL="https://i.pravatar.cc/300?img=5"
/>
<ExAvatar
  status="online"
  name="Michele Jane"
  imgURL="https://i.pravatar.cc/300?img=5"
/>
<ExAvatar
  status="away"
  name="Michele Jane"
  imgURL="https://i.pravatar.cc/300?img=5"
/>
<ExAvatar
  status="busy"
  name="Michele Jane"
  imgURL="https://i.pravatar.cc/300?img=5"
/>`}
          </ExCodeBlock>
        </section>

        <section id="group" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Group</h3>
            <p className="text-muted text-md">
              Display multiple users in a compact, overlapping layout commonly
              used for teams, collaborators, and participant lists.
            </p>
          </div>
          <ExCanvas>
            <div className="flex -space-x-3">
              <ExAvatar
                border
                name="Michele Jane"
                imgURL="https://i.pravatar.cc/300?img=5"
              />
              <ExAvatar
                border
                name="John Carter"
                imgURL="https://i.pravatar.cc/300?img=8"
              />
              <ExAvatar
                border
                name="Sarah Wilson"
                imgURL="https://i.pravatar.cc/300?img=9"
              />
              <ExAvatar
                border
                name="Michael Brown"
                imgURL="https://i.pravatar.cc/300?img=12"
              />
            </div>
          </ExCanvas>
          <ExCodeBlock language="html">
            {`<div className="flex -space-x-3">
  <ExAvatar
    border
    name="Michele Jane"
    imgURL="https://i.pravatar.cc/300?img=5"
  />

  <ExAvatar
    border
    name="John Carter"
    imgURL="https://i.pravatar.cc/300?img=8"
  />

  <ExAvatar
    border
    name="Sarah Wilson"
    imgURL="https://i.pravatar.cc/300?img=9"
  />
  
  <ExAvatar
    border
    name="Michael Brown"
    imgURL="https://i.pravatar.cc/300?img=12"
  />
</div>`}
          </ExCodeBlock>
        </section>
      </div>
    </PageContent>
  );
}
