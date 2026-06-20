import { chromium } from "playwright";

const BASE_URL = "http://localhost:5173";
const routes = [
  "/",
  "/about",
  "/portfolio",
  "/pricing",
  "/contact",
  "/privacy",
  "/terms",
  "/services/social-media",
  "/services/web-design",
  "/services/video-editing",
  "/services/posters",
  "/admin/login",
  "/client/login",
  "/admin",
  "/client",
  "/not-real-route",
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

const failures = [];
const routeResults = [];

page.on("pageerror", (err) => {
  failures.push(`PageError: ${err.message}`);
});

page.on("console", (msg) => {
  if (msg.type() === "error") {
    failures.push(`ConsoleError: ${msg.text()}`);
  }
});

for (const route of routes) {
  const url = `${BASE_URL}${route}`;
  try {
    const response = await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 45000,
    });
    const status = response?.status() ?? "no-response";
    const finalUrl = page.url();
    const title = await page.title();
    routeResults.push({ route, status, finalUrl, title });
  } catch (error) {
    routeResults.push({
      route,
      status: "failed",
      finalUrl: "n/a",
      title: "n/a",
      error: error.message,
    });
    failures.push(`NavigationError (${route}): ${error.message}`);
  }
}

console.log("=== ROUTE CHECKS ===");
for (const r of routeResults) {
  console.log(
    `${r.route} | status=${r.status} | final=${r.finalUrl}${r.error ? ` | error=${r.error}` : ""}`,
  );
}

console.log("\n=== FAILURES ===");
if (failures.length === 0) {
  console.log("No runtime console/page errors detected.");
} else {
  [...new Set(failures)].forEach((f) => console.log(f));
}

await browser.close();
