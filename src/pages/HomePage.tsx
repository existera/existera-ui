import { useNavigate } from "react-router-dom";

import { BriefcaseBusiness, CalendarDays, Clock, Info, Link, Search, SendHorizonal } from "lucide-react";
import {
  ExAlert,
  ExBadge,
  ExBreadcrumbs,
  ExBreadcrumbsItem,
  ExButton,
  ExCard,
  ExDatePicker,
  ExDateRange,
  ExExplorerItem,
  ExInput,
  ExProgress,
  ExSkeleton,
  ExTable,
  ExTableCell,
  ExTableExpand,
  ExTableFooter,
  ExTableHeader,
  ExTableRow,
  ExTextarea,
  ExTimeSelector,
} from "@/lib";

export default function HomePage() {
  const navigate = useNavigate();
  const files = [
    {
      id: "pdf1",
      name: "Company Profile.pdf",
      type: "application/pdf",
      url: "https://example.com/files/company-profile.pdf",
    },
    {
      id: "docx1",
      name: "Project Proposal.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      url: "https://example.com/files/project-proposal.docx",
    },
    {
      id: "xlsx1",
      name: "Financial Report.xlsx",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      url: "https://example.com/files/financial-report.xlsx",
    },
    {
      id: "pptx1",
      name: "Pitch Deck.pptx",
      type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      url: "https://example.com/files/pitch-deck.pptx",
    },
    {
      id: "mp31",
      name: "Summer Vibes.mp3",
      type: "audio/mpeg",
      url: "https://example.com/files/summer-vibes.mp3",
    },
  ];

  const employees = [
    {
      id: 1,
      name: "Olivia Martin",
      department: "Engineering",
      role: "Frontend Developer",
      salary: "$5,800",
      email: "olivia@example.com",
      phone: "+1 555 123 456",
      joined: "January 2025",
      manager: "James Wilson",
    },
    {
      id: 2,
      name: "James Wilson",
      department: "Finance",
      role: "Accountant",
      salary: "$4,600",
      email: "james@example.com",
      phone: "+1 555 987 654",
      joined: "March 2024",
      manager: "Sophia Brown",
    },
    {
      id: 3,
      name: "Sophia Brown",
      department: "Marketing",
      role: "Marketing Lead",
      salary: "$5,200",
      email: "sophia@example.com",
      phone: "+1 555 246 810",
      joined: "August 2023",
      manager: "Michael Scott",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative mt-15 flex items-center justify-center text-center md:mt-25">
        <div className="max-w-4xl">
          <p className="mb-5 text-[9px] uppercase tracking-[0.6em] text-muted-foreground/60 md:text-[11px]">Introducing EXISTERA UI</p>

          <h1 className="mb-5 text-4xl font-medium tracking-tight md:text-7xl">
            Design Systems
            <br />
            Built With <span className="typing-text">Precision</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-lg">
            A modern React component library engineered for scalable, accessible, and consistent product experiences.
          </p>

          <div className="mt-10">
            <ExButton size="lg" variant="soft" color="secondary" onClick={() => navigate("/docs/installation")}>
              Get Started
            </ExButton>
          </div>

          <div className="my-15 flex justify-center">
            <div className="flex flex-wrap gap-7 md:gap-10 justify-center">
              <img
                src="https://icon.icepanel.io/Technology/svg/Tauri.svg"
                alt="Tauri"
                className="h-10 grayscale opacity-70 transition-all duration-500 hover:scale-110 hover:grayscale-0 hover:opacity-100 md:h-16"
              />

              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/ionic-icon.png"
                alt="React"
                className="h-10 grayscale opacity-70 transition-all duration-500 hover:scale-110 hover:grayscale-0 hover:opacity-100 md:h-16"
              />

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png"
                alt="React"
                className="h-10 grayscale opacity-70 transition-all duration-500 hover:scale-110 hover:grayscale-0 hover:opacity-100 md:h-16"
              />

              <img
                src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/nextjs.png"
                alt="Next.js"
                className="h-10 grayscale opacity-70 transition-all duration-500 hover:scale-110 hover:grayscale-0 hover:opacity-100 dark:invert md:h-16"
              />

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/960px-Typescript_logo_2020.svg.png"
                alt="TypeScript"
                className="h-10 grayscale opacity-70 transition-all duration-500 hover:scale-110 hover:grayscale-0 hover:opacity-100 md:h-16"
              />

              <img
                src="/tws.svg"
                alt="Tailwind CSS"
                className="h-10 grayscale opacity-70 transition-all duration-500 hover:scale-110 hover:grayscale-0 hover:opacity-100 md:h-16"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["WCAG 2.2 Ready", "Accessibility First", "Keyboard Navigation", "TypeScript", "Dark Mode", "Themeable", "Responsive"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background/70 px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur-sm">
                  {item}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mt-25">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
          <div className="flex flex-col gap-5">
            <ExCard className="h-fit">
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold">Create New Project</h2>
                  <p className="mt-1 text-sm text-muted">Fill in the information below to create a new project.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-0.5 space-y-1.5">
                    <label htmlFor="title" className="text-sm font-medium">
                      Project Name
                    </label>
                    <ExInput id="title" placeholder="e.g. Inventory Management System" />
                  </div>

                  <div className="grid gap-0.5">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <ExTextarea id="description" placeholder="Describe your project..." autoResize />
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-border pt-5">
                  <ExButton color="secondary" size="sm" variant="soft">
                    Cancel
                  </ExButton>
                  <ExButton size="sm">Create</ExButton>
                </div>
              </div>
            </ExCard>
            <ExCard className="h-fit">
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold">My Files</h2>
                  <p className="mt-1 text-sm text-muted">Recently accessed files from your workspace.</p>
                </div>
                <div className="flex flex-wrap space-y-1">
                  {files.map((file) => (
                    <ExExplorerItem key={file.id} id={file.id} name={file.name} type={file.type} url={file.url} />
                  ))}
                </div>
              </div>
            </ExCard>
            <ExCard>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Select Date</h3>
                  <p className="text-sm text-muted-foreground">Pick a date using the date picker component.</p>
                </div>

                <ExDatePicker />
              </div>
            </ExCard>

            <ExCard>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Select Date Range</h3>
                  <p className="text-sm text-muted-foreground">Choose a start date and an end date for your desired period.</p>
                </div>
                <ExDateRange />
              </div>
            </ExCard>
          </div>

          <div className="flex flex-col gap-5">
            <ExCard className="h-fit">
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-5 w-full">
                  <div>
                    <h2 className="text-lg font-semibold">Manage Tags</h2>
                    <p className="mt-1 text-sm text-muted">Search existing tags or create a new one.</p>
                  </div>
                  <ExInput placeholder="Search tags..." rightIcon={<Search size={16} />} />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Popular Tags</p>
                    <div className="flex flex-wrap gap-2">
                      <ExBadge variant="soft" dismissible>
                        Business
                      </ExBadge>
                      <ExBadge variant="soft" color="primary" dismissible>
                        Finance
                      </ExBadge>
                      <ExBadge variant="soft" color="success" dismissible>
                        Technology
                      </ExBadge>
                      <ExBadge variant="soft" color="warning" dismissible>
                        Marketing
                      </ExBadge>
                      <ExBadge variant="soft" color="danger" dismissible>
                        Urgent
                      </ExBadge>
                      <ExBadge variant="soft" color="secondary" dismissible>
                        Internal
                      </ExBadge>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <ExButton variant="soft" color="secondary" fit={false}>
                    Reset
                  </ExButton>
                </div>
              </div>
            </ExCard>

            <ExCard className="h-fit">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted">Claimable Balance</p>
                  <h2 className="mt-1 text-3xl font-bold mb-2">$1,211.29</h2>
                  <ExBadge variant="soft" color="warning">
                    Pending Setup
                  </ExBadge>
                </div>
                <div className="space-y-3 border-y border-border py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Net Royalties</span>
                    <span className="font-medium">$1,248.75</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Processing Fee</span>
                    <span className="font-medium text-danger">-$37.46</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Ready to Claim</span>
                  <span className="text-lg font-semibold">$1,211.29 USD</span>
                </div>
                <p className="text-sm text-muted">
                  Once your bank is connected, balances over <span className="font-medium text-foreground">$10.00</span> are automatically
                  eligible for monthly distribution on the <span className="font-medium text-foreground">15th of each month</span>.
                </p>
                <div className="flex justify-end gap-2 border-t border-border pt-4">
                  <ExButton size="sm">
                    <Link size={14} />
                    Connect Bank
                  </ExButton>
                </div>
              </div>
            </ExCard>

            <ExCard>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Purchase Status</h3>
                  <p className="text-sm text-muted-foreground">Display important information or notifications to users.</p>
                </div>
                <ExAlert color="primary" icon={<Info size={16} />} dismissible>
                  <div className="font-semibold text-sm">Approval Required</div>
                  <div className="text-sm">Purchase Order PO-2026-00124 requires manager approval.</div>
                </ExAlert>
              </div>
            </ExCard>
          </div>

          <div className="flex flex-col gap-5">
            <ExCard className="h-fit">
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-semibold">My Folders</h2>
                  <p className="mt-1 text-sm text-muted">Browse your most frequently accessed folders.</p>
                </div>

                <div className="flex flex-wrap space-y-1">
                  <ExExplorerItem id="1" name="Profile" type="folder" hexColor="#9CA3AF" />
                  <ExExplorerItem id="2" name="Documents" type="folder" hexColor="#4F46E5" />
                  <ExExplorerItem id="3" name="Pictures" type="folder" hexColor="#06B6D4" />
                  <ExExplorerItem id="4" name="Videos" type="folder" hexColor="#F59E0B" />
                  <ExExplorerItem id="5" name="Music" type="folder" hexColor="#22C55E" />
                </div>
              </div>
            </ExCard>

            <ExCard>
              <div className="flex gap-4">
                <ExSkeleton className="size-14 rounded-lg" />
                <div className="flex flex-1 flex-col gap-3">
                  <ExSkeleton className="h-7 w-1/2" />
                  <ExSkeleton className="h-4 w-full" />
                  <ExSkeleton className="h-4 w-3/4" />
                </div>
              </div>
            </ExCard>

            <ExCard className="max-w-2xl">
              <div className="space-y-5">
                <ExBreadcrumbs size="xs">
                  <ExBreadcrumbsItem>Workspace</ExBreadcrumbsItem>
                  <ExBreadcrumbsItem>Projects</ExBreadcrumbsItem>
                  <ExBreadcrumbsItem>Inventory System</ExBreadcrumbsItem>
                </ExBreadcrumbs>

                <div>
                  <h2 className="text-xl font-semibold">Inventory Management System</h2>
                  <p className="mt-1 text-sm text-muted">
                    Manage products, suppliers, warehouses, and inventory transactions from a single workspace.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <p className="text-sm text-muted">Tasks</p>
                    <p className="mt-1 text-2xl font-semibold">124</p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <p className="text-sm text-muted">Members</p>
                    <p className="mt-1 text-2xl font-semibold">18</p>
                  </div>

                  <div className="rounded-xl border border-border bg-surface-2 p-4">
                    <p className="text-sm text-muted">Progress</p>
                    <p className="mt-1 text-2xl font-semibold">86%</p>
                  </div>
                </div>
              </div>
            </ExCard>

            <ExCard>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Schedule Meeting</h3>
                  <p className="text-sm text-muted-foreground">Select both the meeting date and preferred time.</p>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium">Meeting Title</label>
                    <ExInput placeholder="Enter meeting title..." leftIcon={<BriefcaseBusiness size={14} />} />
                  </div>

                  <div className="flex flex-col gap-3 md:flex-row md:items-start">
                    <div className="flex-1">
                      <label className="mb-1 block text-sm font-medium">Date</label>
                      <ExDatePicker leftIcon={<CalendarDays size={14} />} />
                    </div>

                    <div className="flex-1">
                      <label className="mb-1 block text-sm font-medium">Time</label>
                      <ExTimeSelector leftIcon={<Clock size={14} />} />
                    </div>
                  </div>
                </div>
              </div>
            </ExCard>
          </div>

          <div className="flex flex-col gap-5">
            <ExCard className="h-fit">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Employee Directory</h2>
                    <ExBadge variant="soft" size="sm">
                      {employees.length} Employees
                    </ExBadge>
                  </div>
                  <p className="mt-1 text-sm text-muted">View employee information, roles, and monthly compensation.</p>
                </div>
              </div>

              <ExTable expandMode="single" size="sm">
                <ExTableRow>
                  <ExTableHeader>Employee</ExTableHeader>
                  <ExTableHeader>Role</ExTableHeader>
                  <ExTableHeader textAlign="right">Salary</ExTableHeader>
                </ExTableRow>

                {employees.map((employee) => (
                  <ExTableRow key={employee.id} id={employee.id.toString()} expandable>
                    <ExTableCell>{employee.name}</ExTableCell>
                    <ExTableCell>{employee.role}</ExTableCell>
                    <ExTableCell textAlign="right">{employee.salary}</ExTableCell>

                    <ExTableExpand>
                      <div className="space-y-2">
                        <div className="grid gap-1">
                          <p className="text-xs text-muted">Email</p>
                          <p>{employee.email}</p>
                        </div>

                        <div className="grid gap-1">
                          <p className="text-xs text-muted">Phone</p>
                          <p>{employee.phone}</p>
                        </div>
                      </div>
                    </ExTableExpand>
                  </ExTableRow>
                ))}

                <ExTableFooter>
                  <div className="flex items-center justify-between font-medium">
                    <span>Monthly Payroll</span>
                    <span>$15,600</span>
                  </div>
                </ExTableFooter>
              </ExTable>
            </ExCard>
            <ExCard>
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-success text-xs font-semibold text-white">
                    JD
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="truncate text-sm font-semibold">John Doe</span>

                      <span className="text-[11px] text-muted">now</span>
                    </div>

                    <p className="truncate text-xs text-muted">Are we still meeting tomorrow at 10 AM?</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Reply..."
                    className="
                h-8 flex-1 rounded-full
                border border-border
                bg-background
                px-3
                text-xs
                outline-none
                placeholder:text-muted
                focus:border-success
              "
                  />

                  <button
                    type="button"
                    className="
                flex h-8 w-8 shrink-0
                items-center justify-center
                rounded-full
                bg-success
                text-white
                transition-colors
                hover:opacity-90
              ">
                    <SendHorizonal size={14} />
                  </button>
                </div>
              </div>
            </ExCard>
            <ExCard className="max-w-lg">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold">Project Overview</h2>
                  <p className="mt-1 text-sm text-muted">Monitor the current progress of your active project milestones.</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Planning</span>
                      <span className="font-medium">100%</span>
                    </div>
                    <ExProgress value={100} color="success" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Development</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <ExProgress value={65} color="primary" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Quality Assurance</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <ExProgress value={42} color="warning" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Deployment</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <ExProgress value={12} color="danger" />
                  </div>
                </div>
              </div>
            </ExCard>
            <ExCard>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Select Time</h3>
                  <p className="text-sm text-muted-foreground">Choose a preferred time for your meeting or appointment.</p>
                </div>
                <ExTimeSelector />
              </div>
            </ExCard>
          </div>
        </div>
      </section>
    </div>
  );
}
