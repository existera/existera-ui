import ExCodeBlock from "../lib/components/CodeBlock/ExCodeBlock";
import ExTable from "../lib/components/Table/ExTable";
import ExTableCell from "../lib/components/Table/ExTableCell";
import ExTableExpand from "../lib/components/Table/ExTableExpand";
import ExTableFooter from "../lib/components/Table/ExTableFooter";
import ExTableHeader from "../lib/components/Table/ExTableHeader";
import ExTableRow from "../lib/components/Table/ExTableRow";
import ExCanvas from "../shared/components/ExCanvas";
import type { OnThisPage } from "../shared/documentation/OnThisPageDocumentation";
import PageContent from "../shared/documentation/PageContent";

export default function TablePage() {
  const section: OnThisPage[] = [
    { name: "Introduction", link: "#intro" },
    { name: "Basic Usage", link: "#basic-usage" },
    { name: "Variant", link: "#variant" },
    { name: "Size", link: "#size" },
    { name: "Footer", link: "#footer" },
    { name: "Sort", link: "#sort" },
    { name: "Expandable", link: "#expandable" },
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
    {
      id: 4,
      name: "Liam Johnson",
      department: "Human Resources",
      role: "HR Manager",
      salary: "$5,000",
      email: "liam@example.com",
      phone: "+1 555 369 258",
      joined: "May 2022",
      manager: "Sophia Brown",
    },
    {
      id: 5,
      name: "Emma Davis",
      department: "Sales",
      role: "Sales Executive",
      salary: "$4,900",
      email: "emma@example.com",
      phone: "+1 555 741 852",
      joined: "November 2024",
      manager: "James Wilson",
    },
  ];

  return (
    <PageContent section={section}>
      <div className="flex flex-col gap-15">
        <section id="intro" className="grid gap-2 section-anchor">
          <h2 className="text-3xl font-semibold">Table</h2>
          <p>
            Table displays structured data in rows and columns, making it easy
            to compare, organize, and scan information. It supports customizable
            headers, cells, footers, and alignment for presenting datasets of
            any size.
          </p>
        </section>

        <section id="basic-usage" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Basic Usage</h3>
            <p className="text-muted text-md">
              Create a table by combining <code>ExTable</code>,{" "}
              <code>ExTableRow</code>, <code>ExTableHeader</code>,{" "}
              <code>ExTableCell</code>, and an optional{" "}
              <code>ExTableFooter</code> to display summary information.
            </p>
          </div>

          <ExCanvas>
            <div className="flex max-w-150 w-full">
              <ExTable>
                <ExTableRow>
                  <ExTableHeader>Employee</ExTableHeader>
                  <ExTableHeader>Department</ExTableHeader>
                  <ExTableHeader>Role</ExTableHeader>
                  <ExTableHeader textAlign="right">Salary</ExTableHeader>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>Olivia Martin</ExTableCell>
                  <ExTableCell>Engineering</ExTableCell>
                  <ExTableCell>Frontend Developer</ExTableCell>
                  <ExTableCell textAlign="right">$5,800</ExTableCell>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>James Wilson</ExTableCell>
                  <ExTableCell>Finance</ExTableCell>
                  <ExTableCell>Finance Manager</ExTableCell>
                  <ExTableCell textAlign="right">$4,900</ExTableCell>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>Sophia Davis</ExTableCell>
                  <ExTableCell>Marketing</ExTableCell>
                  <ExTableCell>Marketing Specialist</ExTableCell>
                  <ExTableCell textAlign="right">$4,900</ExTableCell>
                </ExTableRow>
              </ExTable>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">{`<ExTable>
  <ExTableRow>
    <ExTableHeader>Employee</ExTableHeader>
    <ExTableHeader>Department</ExTableHeader>
    <ExTableHeader>Role</ExTableHeader>
    <ExTableHeader textAlign="right">Salary</ExTableHeader>
  </ExTableRow>
  <ExTableRow>
    <ExTableCell>Olivia Martin</ExTableCell>
    <ExTableCell>Engineering</ExTableCell>
    <ExTableCell>Frontend Developer</ExTableCell>
    <ExTableCell textAlign="right">$5,800</ExTableCell>
  </ExTableRow>
  <ExTableRow>
    <ExTableCell>James Wilson</ExTableCell>
    <ExTableCell>Finance</ExTableCell>
    <ExTableCell>Finance Manager</ExTableCell>
    <ExTableCell textAlign="right">$4,900</ExTableCell>
  </ExTableRow>
  <ExTableRow>
    <ExTableCell>Sophia Davis</ExTableCell>
    <ExTableCell>Marketing</ExTableCell>
    <ExTableCell>Marketing Specialist</ExTableCell>
    <ExTableCell textAlign="right">$4,900</ExTableCell>
  </ExTableRow>
</ExTable>`}</ExCodeBlock>
        </section>

        <section id="size" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Size</h3>
            <p className="text-muted text-md">
              Adjust the table density using the <code>size</code> prop.
              Different sizes modify the spacing and row height to suit compact
              or spacious data layouts.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5 max-w-150 w-full">
              <ExTable size="xs">
                <ExTableRow>
                  <ExTableHeader>Employee</ExTableHeader>
                  <ExTableHeader>Department</ExTableHeader>
                  <ExTableHeader>Role</ExTableHeader>
                  <ExTableHeader textAlign="right">Salary</ExTableHeader>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>Olivia Martin</ExTableCell>
                  <ExTableCell>Engineering</ExTableCell>
                  <ExTableCell>Frontend Developer</ExTableCell>
                  <ExTableCell textAlign="right">$5,800</ExTableCell>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>James Wilson</ExTableCell>
                  <ExTableCell>Finance</ExTableCell>
                  <ExTableCell>Finance Manager</ExTableCell>
                  <ExTableCell textAlign="right">$4,900</ExTableCell>
                </ExTableRow>
              </ExTable>
              <ExTable size="sm">
                <ExTableRow>
                  <ExTableHeader>Employee</ExTableHeader>
                  <ExTableHeader>Department</ExTableHeader>
                  <ExTableHeader>Role</ExTableHeader>
                  <ExTableHeader textAlign="right">Salary</ExTableHeader>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>Olivia Martin</ExTableCell>
                  <ExTableCell>Engineering</ExTableCell>
                  <ExTableCell>Frontend Developer</ExTableCell>
                  <ExTableCell textAlign="right">$5,800</ExTableCell>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>James Wilson</ExTableCell>
                  <ExTableCell>Finance</ExTableCell>
                  <ExTableCell>Finance Manager</ExTableCell>
                  <ExTableCell textAlign="right">$4,900</ExTableCell>
                </ExTableRow>
              </ExTable>
              <ExTable size="md">
                <ExTableRow>
                  <ExTableHeader>Employee</ExTableHeader>
                  <ExTableHeader>Department</ExTableHeader>
                  <ExTableHeader>Role</ExTableHeader>
                  <ExTableHeader textAlign="right">Salary</ExTableHeader>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>Olivia Martin</ExTableCell>
                  <ExTableCell>Engineering</ExTableCell>
                  <ExTableCell>Frontend Developer</ExTableCell>
                  <ExTableCell textAlign="right">$5,800</ExTableCell>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>James Wilson</ExTableCell>
                  <ExTableCell>Finance</ExTableCell>
                  <ExTableCell>Finance Manager</ExTableCell>
                  <ExTableCell textAlign="right">$4,900</ExTableCell>
                </ExTableRow>
              </ExTable>
              <ExTable size="lg">
                <ExTableRow>
                  <ExTableHeader>Employee</ExTableHeader>
                  <ExTableHeader>Department</ExTableHeader>
                  <ExTableHeader>Role</ExTableHeader>
                  <ExTableHeader textAlign="right">Salary</ExTableHeader>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>Olivia Martin</ExTableCell>
                  <ExTableCell>Engineering</ExTableCell>
                  <ExTableCell>Frontend Developer</ExTableCell>
                  <ExTableCell textAlign="right">$5,800</ExTableCell>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>James Wilson</ExTableCell>
                  <ExTableCell>Finance</ExTableCell>
                  <ExTableCell>Finance Manager</ExTableCell>
                  <ExTableCell textAlign="right">$4,900</ExTableCell>
                </ExTableRow>
              </ExTable>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">{`<ExTable size="xs">
  ...
</ExTable>

<ExTable size="sm">
  ...
</ExTable>

<ExTable size="md">
  ...
</ExTable>

<ExTable size="lg">
  ...
</ExTable>`}</ExCodeBlock>
        </section>

        <section id="footer" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Footer</h3>
            <p className="text-muted text-md">
              The <code>ExTableFooter</code> component provides a dedicated area
              for displaying aggregated values, totals, or additional
              information related to the table data.
            </p>
          </div>

          <ExCanvas>
            <div className="flex max-w-150 w-full">
              <ExTable>
                <ExTableRow>
                  <ExTableHeader>Employee</ExTableHeader>
                  <ExTableHeader>Department</ExTableHeader>
                  <ExTableHeader>Role</ExTableHeader>
                  <ExTableHeader textAlign="right">Salary</ExTableHeader>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>Olivia Martin</ExTableCell>
                  <ExTableCell>Engineering</ExTableCell>
                  <ExTableCell>Frontend Developer</ExTableCell>
                  <ExTableCell textAlign="right">$5,800</ExTableCell>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>James Wilson</ExTableCell>
                  <ExTableCell>Finance</ExTableCell>
                  <ExTableCell>Finance Manager</ExTableCell>
                  <ExTableCell textAlign="right">$4,900</ExTableCell>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>Sophia Davis</ExTableCell>
                  <ExTableCell>Marketing</ExTableCell>
                  <ExTableCell>Marketing Specialist</ExTableCell>
                  <ExTableCell textAlign="right">$4,900</ExTableCell>
                </ExTableRow>
                <ExTableFooter>
                  <div className="flex items-center justify-between font-medium">
                    <span>Monthly Payroll</span>
                    <span>$15,600</span>
                  </div>
                </ExTableFooter>
              </ExTable>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">{`<ExTable>
  <ExTableRow>
    <ExTableHeader>Employee</ExTableHeader>
    <ExTableHeader>Department</ExTableHeader>
    <ExTableHeader>Role</ExTableHeader>
    <ExTableHeader textAlign="right">Salary</ExTableHeader>
  </ExTableRow>
  <ExTableRow>
    <ExTableCell>Olivia Martin</ExTableCell>
    <ExTableCell>Engineering</ExTableCell>
    <ExTableCell>Frontend Developer</ExTableCell>
    <ExTableCell textAlign="right">$5,800</ExTableCell>
  </ExTableRow>
  ...
  <ExTableFooter>
    <div className="flex items-center justify-between font-medium">
      <span>Monthly Payroll</span>
      <span>$15,600</span>
    </div>
  </ExTableFooter>
</ExTable>`}</ExCodeBlock>
        </section>

        <section id="sort" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Sort</h3>
            <p className="text-muted text-md">
              Enable sorting indicators by adding the <code>sortable</code> prop
              to <code>ExTableHeader</code>. This is useful for columns that
              support sorting, providing a clear visual cue that the header can
              be interacted with.
            </p>
          </div>
          <ExCanvas>
            <div className="flex max-w-150 w-full">
              <ExTable>
                <ExTableRow>
                  <ExTableHeader sortable>Employee</ExTableHeader>
                  <ExTableHeader sortable>Department</ExTableHeader>
                  <ExTableHeader sortable>Role</ExTableHeader>
                  <ExTableHeader sortable textAlign="right">
                    Salary
                  </ExTableHeader>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>Olivia Martin</ExTableCell>
                  <ExTableCell>Engineering</ExTableCell>
                  <ExTableCell>Frontend Developer</ExTableCell>
                  <ExTableCell textAlign="right">$5,800</ExTableCell>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>James Wilson</ExTableCell>
                  <ExTableCell>Finance</ExTableCell>
                  <ExTableCell>Finance Manager</ExTableCell>
                  <ExTableCell textAlign="right">$4,900</ExTableCell>
                </ExTableRow>
                <ExTableRow>
                  <ExTableCell>Sophia Davis</ExTableCell>
                  <ExTableCell>Marketing</ExTableCell>
                  <ExTableCell>Marketing Specialist</ExTableCell>
                  <ExTableCell textAlign="right">$4,900</ExTableCell>
                </ExTableRow>
              </ExTable>
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">{`<ExTable>
  <ExTableRow>
    <ExTableHeader sortable>Employee</ExTableHeader>
    <ExTableHeader sortable>Department</ExTableHeader>
    <ExTableHeader sortable>Role</ExTableHeader>
    <ExTableHeader sortable textAlign="right">
      Salary
    </ExTableHeader>
  </ExTableRow>
  <ExTableRow>
    <ExTableCell>Olivia Martin</ExTableCell>
    <ExTableCell>Engineering</ExTableCell>
    <ExTableCell>Frontend Developer</ExTableCell>
    <ExTableCell textAlign="right">$5,800</ExTableCell>
  </ExTableRow>
</ExTable>`}</ExCodeBlock>
        </section>

        <section id="expandable" className="grid section-anchor">
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Expandable</h3>
            <p className="text-muted text-md">
              Expand rows to reveal additional content using{" "}
              <code>ExTableExpand</code>. Control the expansion behavior with
              the <code>expandMode</code> prop, choosing <code>single</code> to
              allow one expanded row at a time or <code>multiple</code> to keep
              several rows expanded simultaneously.
            </p>
          </div>

          <ExCanvas>
            <div className="flex flex-col gap-5 max-w-150 w-full">
              <ExTable expandMode="single">
                <ExTableRow>
                  <ExTableHeader>Employee</ExTableHeader>
                  <ExTableHeader>Department</ExTableHeader>
                  <ExTableHeader>Role</ExTableHeader>
                  <ExTableHeader textAlign="right">Salary</ExTableHeader>
                </ExTableRow>
                {employees.map((employee) => (
                  <ExTableRow
                    key={employee.id}
                    id={employee.id.toString()}
                    expandable
                  >
                    <ExTableCell>{employee.name}</ExTableCell>
                    <ExTableCell>{employee.department}</ExTableCell>
                    <ExTableCell>{employee.role}</ExTableCell>
                    <ExTableCell textAlign="right">
                      {employee.salary}
                    </ExTableCell>
                    <ExTableExpand>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-sm text-muted">Email</div>
                          <div>{employee.email}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted">Phone</div>
                          <div>{employee.phone}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted">Joined</div>
                          <div>{employee.joined}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted">Manager</div>
                          <div>{employee.manager}</div>
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

              <ExTable expandMode="multiple">
                <ExTableRow>
                  <ExTableHeader>Employee</ExTableHeader>
                  <ExTableHeader>Department</ExTableHeader>
                  <ExTableHeader>Role</ExTableHeader>
                  <ExTableHeader textAlign="right">Salary</ExTableHeader>
                </ExTableRow>
                {employees.map((employee) => (
                  <ExTableRow
                    key={employee.id}
                    id={employee.id.toString()}
                    expandable
                  >
                    <ExTableCell>{employee.name}</ExTableCell>
                    <ExTableCell>{employee.department}</ExTableCell>
                    <ExTableCell>{employee.role}</ExTableCell>
                    <ExTableCell textAlign="right">
                      {employee.salary}
                    </ExTableCell>
                    <ExTableExpand>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-sm text-muted">Email</div>
                          <div>{employee.email}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted">Phone</div>
                          <div>{employee.phone}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted">Joined</div>
                          <div>{employee.joined}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted">Manager</div>
                          <div>{employee.manager}</div>
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
            </div>
          </ExCanvas>

          <ExCodeBlock language="html">{`<ExTable expandMode="single">
  <ExTableRow>
    <ExTableHeader>Employee</ExTableHeader>
    <ExTableHeader>Department</ExTableHeader>
    <ExTableHeader>Role</ExTableHeader>
    <ExTableHeader textAlign="right">Salary</ExTableHeader>
  </ExTableRow>
  {employees.map((employee) => (
    <ExTableRow
      key={employee.id}
      id={employee.id.toString()}
      expandable
    >
      <ExTableCell>{employee.name}</ExTableCell>
      <ExTableCell>{employee.department}</ExTableCell>
      <ExTableCell>{employee.role}</ExTableCell>
      <ExTableCell textAlign="right">
        {employee.salary}
      </ExTableCell>
      <ExTableExpand>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-sm text-muted">Email</div>
            <div>{employee.email}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Phone</div>
            <div>{employee.phone}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Joined</div>
            <div>{employee.joined}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Manager</div>
            <div>{employee.manager}</div>
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

<ExTable expandMode="single">
  <ExTableRow>
    <ExTableHeader>Employee</ExTableHeader>
    <ExTableHeader>Department</ExTableHeader>
    <ExTableHeader>Role</ExTableHeader>
    <ExTableHeader textAlign="right">Salary</ExTableHeader>
  </ExTableRow>
  {employees.map((employee) => (
    <ExTableRow
      key={employee.id}
      id={employee.id.toString()}
      expandable
    >
      <ExTableCell>{employee.name}</ExTableCell>
      <ExTableCell>{employee.department}</ExTableCell>
      <ExTableCell>{employee.role}</ExTableCell>
      <ExTableCell textAlign="right">
        {employee.salary}
      </ExTableCell>
      <ExTableExpand>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-sm text-muted">Email</div>
            <div>{employee.email}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Phone</div>
            <div>{employee.phone}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Joined</div>
            <div>{employee.joined}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Manager</div>
            <div>{employee.manager}</div>
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
</ExTable>`}</ExCodeBlock>
        </section>
      </div>
        <section id="variant" className="section-anchor mt-8">
          <h2 className="mb-4 text-xl font-semibold">Variant</h2>
          <p className="mb-4 text-sm text-muted">The default variant keeps its surface background. Transparent tables show the parent background, including headers, expanded rows, and the footer.</p>
          <div className="grid gap-6">
            {(["default", "transparent"] as const).map((variant) => (
              <div key={variant} className="rounded-md bg-primary-soft p-4">
                <p className="mb-3 text-sm font-medium">{variant}</p>
                <ExTable variant={variant}>
                  <ExTableRow><ExTableHeader>Name</ExTableHeader><ExTableHeader>Role</ExTableHeader></ExTableRow>
                  <ExTableRow><ExTableCell>Olivia Martin</ExTableCell><ExTableCell>Developer</ExTableCell></ExTableRow>
                  <ExTableFooter>1 employee</ExTableFooter>
                </ExTable>
              </div>
            ))}
          </div>
          <ExCodeBlock language="tsx">{'<ExTable variant="transparent">\n  {/* Header, rows, and footer */}\n</ExTable>'}</ExCodeBlock>
        </section>
    </PageContent>
  );
}
