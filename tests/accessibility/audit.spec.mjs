import { test, expect } from "@playwright/test";
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
const require = createRequire(import.meta.url);
async function scan(page, testInfo, suffix, context) {
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
  const results = await page.evaluate(async selector => window.axe.run(selector ?? document, { runOnly: {type:"tag", values:["wcag2a","wcag2aa","wcag21aa","wcag22aa"]} }),context);
  await writeFile(testInfo.outputPath(`${suffix}-axe.json`), JSON.stringify(results,null,2));
  await testInfo.attach("axe-results", {body:JSON.stringify(results,null,2), contentType:"application/json"});
  expect(results.violations.map(v => ({id:v.id, impact:v.impact, nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))).toEqual([]);
}
for (const theme of ["light", "dark"]) {
  test(`${theme} high contrast: WCAG 2.2 AA automated scan`, async ({ page }, testInfo) => {
    await page.goto("/tests/accessibility/");
    await page.evaluate(theme => { document.documentElement.dataset.theme = theme; document.documentElement.dataset.contrast = "more"; }, theme);
    await expect(page.getByRole("heading", {level:1})).toBeVisible();
    await scan(page, testInfo, theme);
    await page.screenshot({path:testInfo.outputPath(`${theme}.png`),fullPage:true});
  });
  for (const label of ["modal", "flyout", "image", "video", "PDF"]) {
    test(`${theme}: ${label} dialog scan, focus containment and restoration`, async ({page}, testInfo) => {
      await page.goto("/tests/accessibility/");
      await page.evaluate(theme => { document.documentElement.dataset.theme = theme; document.documentElement.dataset.contrast = "more"; }, theme);
      const trigger=page.getByRole("button", {name:`Open ${label}`, exact:true});
      await trigger.click();
      const dialog=page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect.poll(()=>dialog.evaluate(node=>node.contains(document.activeElement))).toBe(true);
      for(let i=0;i<12;i++){
        await page.keyboard.press("Tab");
        expect(await dialog.evaluate(node=>node.contains(document.activeElement))).toBe(true);
      }
      for(let i=0;i<12;i++){
        await page.keyboard.press("Shift+Tab");
        expect(await dialog.evaluate(node=>node.contains(document.activeElement))).toBe(true);
      }
      await scan(page,testInfo,`${theme}-${label}`);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
    });
  }
}

test.beforeEach(async ({page})=>{ await page.goto("/tests/accessibility/"); });
test("File picker opens using keyboard and remove has a name",async({page})=>{
  const picker=page.getByRole("button",{name:"Choose file",exact:true});
  await picker.focus();
  const chooser=page.waitForEvent("filechooser",{timeout:10000});
  await expect(picker).toBeFocused();
  await picker.press("Enter");
  await (await chooser).setFiles({name:"report.txt",mimeType:"text/plain",buffer:Buffer.from("Report")});
  await expect(page.getByRole("button",{name:"Replace file: report.txt",exact:true})).toBeFocused();
  await expect(page.getByRole("button",{name:"Remove file: report.txt",exact:true})).toBeVisible();
});
test("Combobox exposes active option, selection and Escape preserve focus",async({page})=>{
  const input=page.getByRole("combobox",{name:"Team",exact:true});
  await input.focus();
  await page.keyboard.press("ArrowDown");
  await expect(input).toHaveAttribute("aria-activedescendant",/.+-option-\d+$/);
  const active=await input.getAttribute("aria-activedescendant");
  await expect(page.locator(`[id="${active}"]`)).toHaveAttribute("role","option");
  await page.keyboard.press("Enter");
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("aria-expanded","false");
  await page.keyboard.press("Tab");
  await input.focus();
  await page.keyboard.press("Escape");
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("aria-expanded","false");
});
test("Date and time pickers enter with arrows and dismiss with Escape",async({page})=>{
  for(const id of ["date","range-start","time"]){
    const input=page.locator(`[id="${id}"]`);
    await input.focus();
    await input.press("ArrowDown");
    const popup=page.getByRole("dialog");
    await expect(popup).toBeVisible();
    const controlledId = await input.getAttribute("aria-controls");
    expect(controlledId).toBeTruthy();
    await expect(page.locator(`[id="${controlledId}"]`)).toHaveAttribute("role", "dialog");
    await expect.poll(()=>popup.evaluate(node=>node.contains(document.activeElement))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(input).toBeFocused();
    await expect(input).toHaveAttribute("aria-expanded","false");
  }
});
test("Tabs, accordion, tree, slider and switch work with keyboard",async({page})=>{
  await page.getByRole("tab",{name:"Overview",exact:true}).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab",{name:"Settings",exact:true})).toHaveAttribute("aria-selected","true");
  await expect(page.getByRole("tabpanel")).toHaveText("Settings content");
  const disclosure=page.getByRole("button",{name:"Account details",exact:true});
  await disclosure.focus();await page.keyboard.press("Enter");
  await expect(disclosure).toHaveAttribute("aria-expanded","true");
  const tree=page.getByRole("treeitem",{name:"Project",exact:true});
  await tree.focus();await page.keyboard.press("ArrowRight");
  await expect(tree).toHaveAttribute("aria-expanded","true");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("treeitem",{name:"Report",exact:true})).toBeFocused();
  const slider=page.getByRole("slider",{name:"Volume",exact:true});
  await slider.focus();await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveAttribute("aria-valuenow","51");
  const toggle=page.getByRole("switch",{name:"Enable notifications",exact:true});
  await toggle.focus();await page.keyboard.press("Space");
  await expect(toggle).toHaveAttribute("aria-checked","true");
});
test("Dropdown arrows skip disabled items and Escape restores trigger",async({page})=>{
  const trigger=page.getByRole("button",{name:"Actions",exact:true});
  await trigger.focus();await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem",{name:"Edit record",exact:true})).toBeFocused();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("menuitem",{name:"Delete record",exact:true})).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

for(const theme of ["light","dark"]){
  for(const control of ["team","date","range-start","time","mention","toast","music"]){
    test(`${theme}: open ${control} accessibility`,async({page},testInfo)=>{
      await page.evaluate(value=>{ document.documentElement.dataset.theme=value; document.documentElement.dataset.contrast="more"; },theme);
      if(control === "toast") await page.getByRole("button",{name:"Show notification",exact:true}).click();
      else if(control === "music") {
        await page.getByRole("button",{name:"Open music",exact:true}).click();
        await page.getByRole("button",{name:"Volume",exact:true}).click();
        await expect(page.getByRole("slider",{name:"Music volume"})).toBeFocused();
      } else if(control === "mention") {
        await page.locator("#mention").fill("@a");
        await expect(page.getByRole("listbox",{name:"Mention suggestions"})).toBeVisible();
      } else {
        await page.locator(`[id="${control}"]`).focus();
        await page.keyboard.press("ArrowDown");
      }
      await scan(page,testInfo,`${theme}-${control}`);
    });
  }
  test(`${theme}: field boundaries and indicator contrast`,async({page})=>{
    await page.evaluate(value=>{ document.documentElement.dataset.theme=value; document.documentElement.dataset.contrast="more"; },theme);
    const checks=await page.evaluate(()=>{
      const styles=getComputedStyle(document.documentElement);
      const color=name=>styles.getPropertyValue(`--color-${name}`).trim();
      const luminance=hex=>{
        const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
        return rgb.reduce((sum,v,i)=>sum+v*[0.2126,0.7152,0.0722][i],0);
      };
      const ratio=(a,b)=>{const [min,max]=[luminance(color(a)),luminance(color(b))].sort((a,b)=>a-b);return(max+0.05)/(min+0.05)};
      return ["field","background","surface","surface-2","surface-3"].map(bg=>({pair:`field-border/${bg}`,ratio:ratio("field-border",bg)}))
        .concat(["primary","secondary","success","warning","danger"].map(c=>({pair:`${c}/surface-3`,ratio:ratio(c,"surface-3")})))
        .concat(["foreground","muted"].flatMap(text=>["field","surface-2"].map(bg=>({pair:`${text}/${bg}`,ratio:ratio(text,bg),minimum:4.5}))));
    });
    for(const check of checks)expect(check.ratio,`${theme} ${check.pair}`).toBeGreaterThanOrEqual(check.minimum ?? 3);
  });
}
test("Screen reader names, error descriptions, current page and selected options",async({page})=>{
  const email=page.getByRole("textbox",{name:"Email",exact:true});
  await expect(email).toHaveAttribute("aria-invalid","true");
  await expect(page.getByRole("textbox",{name:"Unavailable amount",exact:true})).toBeDisabled();
  await expect(page.getByRole("textbox",{name:"Invalid amount",exact:true})).toHaveAttribute("aria-invalid","true");
  await expect(email).toHaveAccessibleDescription("Enter a valid email address.");
  await expect(page.getByRole("checkbox",{name:"Accept terms",exact:true})).toHaveAccessibleDescription("Required to continue");
  await expect(page.getByRole("button",{name:"Page 2",exact:true})).toHaveAttribute("aria-current","page");
  await expect(page.getByRole("progressbar",{name:"Progress",exact:true})).toHaveAttribute("aria-valuenow","50");
  await page.locator("#mention").fill("@a");
  const input=page.getByRole("combobox",{name:"Comment",exact:true});
  await expect(input).toHaveAttribute("aria-activedescendant",/.+-option-0$/);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page.locator("#mention")).toHaveValue(/@(?:alex|sam) /);
  await expect(page.locator("#mention")).toBeFocused();
  await expect(page.locator("#mention")).not.toHaveAttribute("aria-activedescendant");
});

test("Explorer context menu supports Shift+F10, arrows and Escape",async({page})=>{
  const trigger=page.getByRole("button",{name:"Documents",exact:true});
  await trigger.focus();await page.keyboard.press("Shift+F10");
  await expect(page.getByRole("menu",{name:"Actions for Documents"})).toBeVisible();
  await expect(page.getByRole("menuitem",{name:"Open",exact:true})).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.getByRole("menuitem",{name:"Delete",exact:true})).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
test("Kanban and Widget provide keyboard and click alternatives to dragging",async({page})=>{
  await page.getByRole("button",{name:"Move Review design",exact:true}).click();
  await page.getByRole("menuitem",{name:"Move to Done",exact:true}).click();
  await expect(page.locator('[data-kanban-column="done"] [data-kanban-card="task"]')).toBeVisible();
  const card=page.locator('[data-kanban-card="task"]');
  await card.focus();await page.keyboard.press("Space");await page.keyboard.press("ArrowLeft");await page.keyboard.press("Enter");
  await expect(page.locator('[data-kanban-column="todo"] [data-kanban-card="task"]')).toBeVisible();
  await page.getByRole("button",{name:"Adjust Summary widget",exact:true}).click();
  await page.getByRole("menuitem",{name:"Make wider",exact:true}).click();
  await expect(page.locator('[data-widget-id="summary"]')).toHaveAttribute("data-col-span","3");
  await page.getByRole("button",{name:"Move Summary widget",exact:true}).focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator('[data-widget-id="summary"]')).toHaveAttribute("data-row","1");
});
for(const theme of ["light","dark"]){
  test(`${theme}: hover and focus maintain text contrast`,async({page},testInfo)=>{
    await page.evaluate(value=>{ document.documentElement.dataset.theme=value; document.documentElement.dataset.contrast="more"; },theme);
    for(const color of ["primary","secondary","success","warning","danger"]){
      for(const variant of ["solid","soft","outline","text"]){
        const button=page.getByRole("button",{name:`${color} ${variant}`,exact:true});
        await button.hover();
        await button.focus();
        await scan(page,testInfo,`${theme}-${color}-${variant}`,`[data-color="${color}"]`);
      }
    }
  });
}
test("Mobile reflow and high-contrast focus remain operable",async({page})=>{
  await page.setViewportSize({width:320,height:800});
  await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  await page.emulateMedia({forcedColors:"active"});
  const input=page.getByRole("textbox",{name:"Name",exact:true});
  await input.focus();
  const outline=await input.evaluate(node=>getComputedStyle(node.parentElement.parentElement).outlineStyle);
  expect(outline).toBe("solid");
});

test("Image zoom can be panned with keyboard and click controls",async({page})=>{
  await page.getByRole("button",{name:"Open image",exact:true}).click();
  await page.getByRole("button",{name:"Zoom in",exact:true}).click();
  const canvas=page.getByRole("region",{name:"Image canvas",exact:true});
  const image=page.getByRole("dialog").getByRole("img",{name:"Sample image",exact:true});
  await canvas.focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(()=>image.evaluate(node=>new DOMMatrix(getComputedStyle(node).transform).m41)).not.toBe(0);
  const afterKeyboard=await image.getAttribute("style");
  await page.getByRole("button",{name:"Pan down",exact:true}).click();
  await expect.poll(()=>image.getAttribute("style")).not.toBe(afterKeyboard);
});

test("Unique relationships, dismissible badge, upload and chat preview keyboard access",async({page})=>{
  const duplicateIds=await page.evaluate(()=>{
    const ids=[...document.querySelectorAll("[id]")].map(node=>node.id);
    return ids.filter((id,index)=>ids.indexOf(id)!==index);
  });
  expect(duplicateIds).toEqual([]);
  const dismiss=page.getByRole("button",{name:"Dismiss badge",exact:true});
  await expect(dismiss).toHaveAccessibleDescription("Active filter");
  await dismiss.focus();await page.keyboard.press("Enter");
  await expect(dismiss).toHaveCount(0);
  const upload=page.getByRole("button",{name:"Upload files",exact:true});
  await upload.focus();
  const chooser=page.waitForEvent("filechooser",{timeout:10000});
  await upload.press("Enter");
  await (await chooser).setFiles([]);
  const preview=page.getByRole("button",{name:"Preview attached image",exact:true});
  await preview.focus();await page.keyboard.press("Enter");
  const dialog=page.getByRole("dialog",{name:"Attached image preview",exact:true});
  await expect(dialog.getByRole("img",{name:"Existera logo",exact:true})).toBeVisible();
  await page.keyboard.press("Tab");
  expect(await dialog.evaluate(node=>node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(preview).toBeFocused();
});

test("Standard visual palette and subtle unfocused borders are retained",async({page})=>{
  for(const theme of ["light","dark"]){
    await page.evaluate(value=>{
      delete document.documentElement.dataset.contrast;
      document.documentElement.dataset.theme=value;
    },theme);
    const tokens=await page.evaluate(()=>{
      const s=getComputedStyle(document.documentElement);
      return ["primary","success","field-border"].map(name=>s.getPropertyValue(`--color-${name}`).trim());
    });
    expect(tokens).toEqual(theme === "light" ? ["#3478f6","#25b17b","#cbd5e1"] : ["#5a96ff","#21966b","#2e2e35"]);
  }
  await expect(page.getByRole("link",{name:"Jump to forms",exact:true})).toHaveCSS("text-decoration-line","none");
});
