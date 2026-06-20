import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test("admin can create, manage, and delete ad", async ({ page }) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  expect(adminEmail, "ADMIN_EMAIL is required").toBeTruthy();
  expect(adminPassword, "ADMIN_PASSWORD is required").toBeTruthy();

  const runtimeErrors = [];
  page.on("pageerror", (err) => runtimeErrors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") runtimeErrors.push(`console: ${msg.text()}`);
  });
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  const uniq = Date.now();
  const adTitle = `E2E Ad ${uniq}`;
  const adLink = "https://example.com";
  const adImage = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200";

  await page.goto(`${BASE_URL}/admin/login`, { waitUntil: "domcontentloaded" });
  await page.locator('input[type="email"]').fill(adminEmail);
  await page.locator('input[type="password"]').fill(adminPassword);
  const signInButton = page.getByRole("button", { name: "Sign In" });
  await expect(signInButton).toBeEnabled();
  await signInButton.click();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).not.toHaveURL(/\/admin\/login$/);
  await expect(page).toHaveURL(/\/admin$/);

  await page.goto(`${BASE_URL}/admin/ads`, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: /Ad Management/i })).toBeVisible();

  await page.getByRole("button", { name: /Create New Ad/i }).click();
  await expect(page.getByRole("heading", { name: /Create New Ad/i })).toBeVisible();

  await page.getByPlaceholder("e.g. Ramadan Offer").fill(adTitle);
  await page.getByPlaceholder("https://...").fill(adLink);
  await page.getByPlaceholder("Paste an Image URL or upload a file below").fill(adImage);
  await page.getByPlaceholder("e.g. Sponsored").fill("E2E");
  await page.getByRole("button", { name: /Publish Ad/i }).click();

  await expect(page.getByText(adTitle)).toBeVisible({ timeout: 20000 });

  const adCard = page
    .locator(`h3:has-text("${adTitle}")`)
    .first()
    .locator('xpath=ancestor::div[contains(@class,"rounded-3xl")]');
  await expect(adCard).toBeVisible();

  const versionBadge = adCard.locator("span").filter({ hasText: "♻️ V" }).first();
  const oldVersionText = (await versionBadge.textContent()) ?? "♻️ V1";
  const oldVersion = Number(oldVersionText.replace(/[^0-9]/g, "")) || 1;
  await adCard.getByRole("button", { name: "🔄" }).click();
  await expect(versionBadge).toContainText(`V${oldVersion + 1}`, { timeout: 10000 });

  await adCard.getByRole("button", { name: "0" }).click();
  await expect(adCard.getByText("0").first()).toBeVisible();

  const toggleButton = adCard.locator("button.w-12.h-6");
  const oldToggleClass = (await toggleButton.getAttribute("class")) ?? "";
  await toggleButton.click();
  await expect(toggleButton).not.toHaveAttribute("class", oldToggleClass, { timeout: 10000 });

  await adCard.locator("button.text-red-500").click();
  await expect(page.getByText(adTitle)).toHaveCount(0);

  expect(runtimeErrors, `Runtime errors:\n${runtimeErrors.join("\n")}`).toEqual([]);
});
