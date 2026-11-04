import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/accessibility", timeout: 60000, workers: 1,
  use: { baseURL: "http://127.0.0.1:4174", headless: true, reducedMotion: "reduce" },
  webServer: { command: "npm run dev -- --host 127.0.0.1 --port 4174 --strictPort", url: "http://127.0.0.1:4174/tests/accessibility/", reuseExistingServer: false, timeout: 60000 },
  outputDir: "work/accessibility-results", reporter: [["list"], ["html", { outputFolder: "work/accessibility-report", open: "never" }], ["json", { outputFile: "work/accessibility-report/results.json" }]],
});
