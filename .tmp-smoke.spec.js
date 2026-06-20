import { test, expect } from "@playwright/test";

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
  "/admin/ads",
  "/client/settings",
  "/not-real-route",
];

test("smoke route navigation without runtime crash", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });

  for (const route of routes) {
    const response = await page.goto(`${BASE_URL}${route}`, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    expect(response, `No response on ${route}`).toBeTruthy();
    expect(response.status(), `Bad status on ${route}`).toBeLessThan(500);
  }

  expect(errors, `Runtime errors found:\n${errors.join("\n")}`).toEqual([]);
});
