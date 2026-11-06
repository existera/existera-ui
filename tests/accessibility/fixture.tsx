import { useState } from "react";
import { createRoot } from "react-dom/client";
import * as UI from "../../src/lib";

export default function Fixture() {
  const [badgeVisible, setBadgeVisible] = useState(true);
  const [columns, setColumns] = useState([{id:"todo",title:"To do",cards:[{id:"task",title:"Review design"}]},{id:"done",title:"Done",cards:[]}]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dialog, setDialog] = useState("");
  const colors = ["primary", "secondary", "success", "warning", "danger"] as const;
  return <main>
    <h1>Existera component accessibility</h1>
    <section aria-labelledby="colors"><h2 id="colors">Colors and variants</h2>
      {colors.map(color => <div key={color} data-color={color} className="samples">
        {(["solid", "soft", "outline", "text"] as const).map(variant => <UI.ExButton key={variant} color={color} variant={variant}>{color} {variant}</UI.ExButton>)}
        {(["solid", "soft", "outline"] as const).map(variant => <UI.ExBadge key={variant} color={color} variant={variant}>{color} {variant}</UI.ExBadge>)}
        <UI.ExChatBubble color={color} variant="solid" message={`${color} message`} timestamp="10:30" showAvatar={false} />
        <UI.ExChatBubble color={color} variant="soft" message={`${color} reply`} position="right" timestamp="10:31" showAvatar={false} />
        <UI.ExAlert color={color} title={`${color} alert`}>Important status information.</UI.ExAlert>
      </div>)}
    </section>
    <section aria-labelledby="forms"><h2 id="forms">Form controls</h2><div className="fields">
      <label htmlFor="name">Name</label><UI.ExInput id="name" placeholder="Enter name" clearable defaultValue="Alex" />
      <label htmlFor="company">Company</label><UI.ExInput id="company" placeholder="Company"><UI.ExInput.Prefix>Org</UI.ExInput.Prefix><UI.ExInput.Suffix>Ltd</UI.ExInput.Suffix></UI.ExInput>
      <label htmlFor="email">Email</label><UI.ExInput id="email" type="email" state="error" aria-describedby="email-error" /><p id="email-error">Enter a valid email address.</p>
      <label htmlFor="notes">Notes</label><UI.ExTextarea id="notes" placeholder="Additional information" />
      <label htmlFor="country">Country</label><UI.ExSelect id="country" placeholder="Choose country" option={[{value:"id",label:"Indonesia"},{value:"sg",label:"Singapore"}]} />
      <label htmlFor="team">Team</label><UI.ExComboBox id="team" placeholder="Choose team"><UI.ExComboBoxItem value="design" label="Design" /><UI.ExComboBoxItem value="engineering" label="Engineering" /></UI.ExComboBox>
      <label htmlFor="date">Start date</label><UI.ExDatePicker id="date" placeholder="Choose date" />
      <UI.ExDateRange id="range" aria-label="Date range" />
      <label htmlFor="time">Appointment time</label><UI.ExTimeSelector id="time" aria-label="Appointment time" />
      <UI.ExCheckbox label="Accept terms" description="Required to continue" />
      <fieldset><legend>Contact method</legend><UI.ExRadio name="contact" value="email" label="Email" defaultChecked /><UI.ExRadio name="contact" value="phone" label="Phone" /></fieldset>
      <UI.ExSwitch aria-label="Enable notifications" />
      <UI.ExInputRange aria-label="Volume" defaultValue={50} />
      <UI.ExFilePicker file={selectedFile} onChange={files => setSelectedFile(files[0] ?? null)} />
      <UI.ExOtp />
      <UI.ExNumpad />
    </div></section>
    <section aria-labelledby="navigation"><h2 id="navigation">Navigation and disclosure</h2>
      <UI.ExAccordion><UI.ExAccordionItem title="Account details">Account information</UI.ExAccordionItem><UI.ExAccordionItem title="Billing details">Billing information</UI.ExAccordionItem></UI.ExAccordion>
      <UI.ExTab defaultValue="overview"><UI.ExTabList aria-label="Account sections"><UI.ExTabItem value="overview">Overview</UI.ExTabItem><UI.ExTabItem value="settings">Settings</UI.ExTabItem></UI.ExTabList><UI.ExTabContent value="overview">Overview content</UI.ExTabContent><UI.ExTabContent value="settings">Settings content</UI.ExTabContent></UI.ExTab>
      <UI.ExTreeView aria-label="Documents"><UI.ExTreeViewItem id="folder" name="Project"><UI.ExTreeViewItem id="file" name="Report" /></UI.ExTreeViewItem></UI.ExTreeView>
      <UI.ExPagination page={2} total={5} />
      <UI.ExProgress value={50} />
      <UI.ExTooltip content="More information"><UI.ExButton>Help</UI.ExButton></UI.ExTooltip>
      <UI.ExDropdown><UI.ExDropdown.Trigger><UI.ExButton>Actions</UI.ExButton></UI.ExDropdown.Trigger><UI.ExDropdown.Content><UI.ExDropdown.Item>Edit record</UI.ExDropdown.Item><UI.ExDropdown.Item disabled>Unavailable action</UI.ExDropdown.Item><UI.ExDropdown.Item>Delete record</UI.ExDropdown.Item></UI.ExDropdown.Content></UI.ExDropdown>
    </section>
    <section aria-labelledby="sizes"><h2 id="sizes">Sizes, states, and code themes</h2>
      {(["xs","sm","md","lg"] as const).map(size => <div className="samples" key={size}>
        <UI.ExButton size={size}>Save {size}</UI.ExButton>
        <UI.ExInput size={size} aria-label={`Input ${size}`} placeholder={`Name ${size}`} />
        <UI.ExInput size={size} state="error" aria-label={`Invalid input ${size}`} />
        <UI.ExInput size={size} state="success" aria-label={`Valid input ${size}`} />
        <UI.ExInput size={size} disabled aria-label={`Disabled input ${size}`} />
        <UI.ExCheckbox size={size} label={`Checkbox ${size}`} description="Additional details" />
      </div>)}
      {(["oneDark","oneLight","vscDarkPlus","atomDark"] as const).map(theme => <UI.ExCodeBlock key={theme} language="tsx" title={theme} theme={theme}>{"// Accessible comment\nconst name = 'Alex';\nconst count = 42;\nif (count > 1) console.log(name);"}</UI.ExCodeBlock>)}
    </section>
    <section aria-labelledby="advanced"><h2 id="advanced">Advanced components</h2>
      <UI.ExBreadcrumbs><UI.ExBreadcrumbsItem href="#home">Home</UI.ExBreadcrumbsItem><UI.ExBreadcrumbsItem active>Current page</UI.ExBreadcrumbsItem></UI.ExBreadcrumbs>
      <UI.ExLink href="#forms">Jump to forms</UI.ExLink>
      <UI.ExButtonCTA>Continue onboarding</UI.ExButtonCTA>
      <UI.ExButtonGroup aria-label="View mode" defaultValue="list"><UI.ExButtonGroupItem value="list">List view</UI.ExButtonGroupItem><UI.ExButtonGroupItem value="grid">Grid view</UI.ExButtonGroupItem></UI.ExButtonGroup>
      <UI.ExToggle aria-label="Pin item">Pin item</UI.ExToggle>
      <UI.ExInputOperator disabled><UI.ExInput aria-label="Unavailable amount" /></UI.ExInputOperator>
      <UI.ExInputOperator state="error"><UI.ExInput aria-label="Invalid amount" /></UI.ExInputOperator>
      <UI.ExInputOperator><UI.ExInputOperator.Prefix>USD</UI.ExInputOperator.Prefix><UI.ExInput aria-label="Amount" /><UI.ExInputOperator.Suffix>.00</UI.ExInputOperator.Suffix></UI.ExInputOperator>
      <UI.ExStep steps={[{title:"Details"},{title:"Review"},{title:"Done"}]} activeStep={1} onStepChange={() => {}} />
      <UI.ExTimeline aria-label="Order history" items={[{id:"placed",title:"Order placed",time:"09:00"},{id:"shipped",title:"Order shipped",time:"10:00"}]} />
      <UI.ExTable><UI.ExTableRow><UI.ExTableHeader sortable onSort={() => {}}>Employee</UI.ExTableHeader><UI.ExTableHeader>Department</UI.ExTableHeader></UI.ExTableRow><UI.ExTableRow><UI.ExTableCell>Alex</UI.ExTableCell><UI.ExTableCell>Design</UI.ExTableCell></UI.ExTableRow></UI.ExTable>
      <UI.ExCodeBlock language="tsx" title="Example">{"const name = 'Alex';"}</UI.ExCodeBlock>
      <label htmlFor="mention">Comment</label><UI.ExInput id="mention" placeholder="Mention a teammate with @" />
      <UI.ExMention users={[{id:"alex",username:"alex",name:"Alex Smith"},{id:"sam",username:"sam",name:"Sam Jones"}]} />
      <UI.ExCalendar defaultDate={new Date(2026,10,4)} height={480} />
      <UI.ExKanban aria-label="Work board" columns={columns} onChange={next => setColumns(next)} />
      <UI.ExWidgetContainer editable responsive={false} columns={4} rows={4} defaultLayout={[{id:"summary",row:0,col:0,rowSpan:2,colSpan:2}]} style={{maxWidth:400}}><UI.ExWidgetCard widgetId="summary" aria-label="Summary widget"><p>Summary</p></UI.ExWidgetCard></UI.ExWidgetContainer>
      <UI.ExExplorerItem id="folder" name="Documents" type="folder" onClick={()=>{}} />
      <UI.ExCard><p>Information card</p></UI.ExCard>
      <UI.ExAvatar name="Alex" />
      <UI.ExSkeleton />
      {badgeVisible && <UI.ExBadge dismissible onDismiss={()=>setBadgeVisible(false)}>Active filter</UI.ExBadge>}
      <UI.ExChatBubble media="/existera-ui-dark.svg" mediaType="image" mediaAlt="Existera logo" showAvatar={false} />
      <ToastTrigger />
    </section>
    <section aria-labelledby="dialogs"><h2 id="dialogs">Dialogs and viewers</h2><div className="samples">
      <UI.ExButton onClick={() => setDialog("modal")}>Open modal</UI.ExButton>
      <UI.ExButton onClick={() => setDialog("flyout")}>Open flyout</UI.ExButton>
      <UI.ExButton onClick={() => setDialog("image")}>Open image</UI.ExButton>
      <UI.ExButton onClick={() => setDialog("video")}>Open video</UI.ExButton>
      <UI.ExButton onClick={() => setDialog("pdf")}>Open PDF</UI.ExButton>
      <UI.ExButton onClick={() => setDialog("music")}>Open music</UI.ExButton>
    </div></section>
    <UI.ExModal isOpen={dialog === "modal"} aria-label="Account dialog" onClose={() => setDialog("")}><h2>Account dialog</h2><UI.ExInput aria-label="Dialog name" /><UI.ExButton onClick={() => setDialog("")}>Save account</UI.ExButton></UI.ExModal>
    <UI.ExFlyout isOpen={dialog === "flyout"} aria-label="Account drawer" onClose={() => setDialog("")}><h2>Account drawer</h2><UI.ExInput aria-label="Drawer name" /><UI.ExButton onClick={() => setDialog("")}>Save drawer</UI.ExButton></UI.ExFlyout>
    {dialog === "image" && <UI.ExImageViewer name="Sample image" url="/existera-ui-dark.svg" onClose={() => setDialog("")} />}
    {dialog === "video" && <UI.ExVideoPlayer name="Sample video" url="/missing-test-video.mp4" onClose={() => setDialog("")} />}
    {dialog === "music" && <UI.ExMusicPlayer name="Sample music" url="/missing-test-audio.mp3" onClose={() => setDialog("")} />}
    {dialog === "pdf" && <UI.ExPDFViewer name="Sample PDF" url="/dummy1.pdf" onClose={() => setDialog("")} />}
  </main>;
}
function ToastTrigger() {
  const { show } = UI.useToast();
  return <UI.ExButton onClick={() => show({type:"success", title:"Saved", description:"Your changes were saved",duration:0})}>Show notification</UI.ExButton>;
}
createRoot(document.getElementById("root")!).render(<UI.ExToastProvider><UI.ExUploadProvider uploadButton><Fixture /></UI.ExUploadProvider></UI.ExToastProvider>);
