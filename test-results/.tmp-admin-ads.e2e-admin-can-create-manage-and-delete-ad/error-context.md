# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: .tmp-admin-ads.e2e.spec.js >> admin can create, manage, and delete ad
- Location: .tmp-admin-ads.e2e.spec.js:5:1

# Error details

```
Error: Runtime errors:
console: Failed to fetch admin data: FirebaseError: Missing or insufficient permissions.
console: Failed to fetch admin data: FirebaseError: Missing or insufficient permissions.

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "console: Failed to fetch admin data: FirebaseError: Missing or insufficient permissions.",
+   "console: Failed to fetch admin data: FirebaseError: Missing or insufficient permissions.",
+ ]
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - navigation [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - generic [ref=e7]: A
          - generic [ref=e8]: Admin Panel
        - generic [ref=e9]:
          - button [ref=e10]:
            - img [ref=e11]
          - generic [ref=e13]:
            - link "📊 Dashboard" [ref=e14]:
              - /url: /admin
              - generic [ref=e15]: 📊
              - generic [ref=e16]: Dashboard
            - link "👥 Clients" [ref=e17]:
              - /url: /admin/clients
              - generic [ref=e18]: 👥
              - generic [ref=e19]: Clients
            - link "🛒 Orders" [ref=e20]:
              - /url: /admin/orders
              - generic [ref=e21]: 🛒
              - generic [ref=e22]: Orders
            - link "📩 Messages" [ref=e23]:
              - /url: /admin/messages
              - generic [ref=e24]: 📩
              - generic [ref=e25]: Messages
            - link "✓ Tasks" [ref=e26]:
              - /url: /admin/tasks
              - generic [ref=e27]: ✓
              - generic [ref=e28]: Tasks
            - link "⚙️ Services" [ref=e29]:
              - /url: /admin/services
              - generic [ref=e30]: ⚙️
              - generic [ref=e31]: Services
            - link "💰 Pricing" [ref=e32]:
              - /url: /admin/pricing
              - generic [ref=e33]: 💰
              - generic [ref=e34]: Pricing
            - link "💳 Payment" [ref=e35]:
              - /url: /admin/payment
              - generic [ref=e36]: 💳
              - generic [ref=e37]: Payment
            - link "🎁 Offers" [ref=e38]:
              - /url: /admin/offers
              - generic [ref=e39]: 🎁
              - generic [ref=e40]: Offers
            - link "🖼️ Portfolio" [ref=e41]:
              - /url: /admin/portfolio
              - generic [ref=e42]: 🖼️
              - generic [ref=e43]: Portfolio
            - link "💬 Testimonials" [ref=e44]:
              - /url: /admin/testimonials
              - generic [ref=e45]: 💬
              - generic [ref=e46]: Testimonials
            - link "📢 Ads" [ref=e47]:
              - /url: /admin/ads
              - generic [ref=e48]: 📢
              - generic [ref=e49]: Ads
          - button [ref=e50]:
            - img [ref=e51]
        - button "🚪 Logout" [ref=e54]:
          - generic [ref=e55]: 🚪
          - generic [ref=e56]: Logout
    - main [ref=e57]:
      - generic [ref=e59]:
        - generic [ref=e60]:
          - generic [ref=e61]:
            - heading "📢 Ad Management" [level=1] [ref=e62]
            - paragraph [ref=e63]: Control promotional banners & popups across the website.
          - button "➕ Create New Ad" [ref=e64]:
            - generic [ref=e65]: ➕
            - text: Create New Ad
        - generic [ref=e66]:
          - generic [ref=e67]:
            - paragraph [ref=e68]: "6"
            - paragraph [ref=e69]: Total Ads
          - generic [ref=e70]:
            - paragraph [ref=e71]: "1"
            - paragraph [ref=e72]: Active
          - generic [ref=e73]:
            - paragraph [ref=e74]: "3"
            - paragraph [ref=e75]: Total Clicks
        - generic [ref=e76]:
          - generic [ref=e77]:
            - img "E2E Ad 1776709174891" [ref=e78]
            - generic [ref=e79]:
              - generic [ref=e80]:
                - generic [ref=e81]:
                  - heading "E2E Ad 1776709174891" [level=3] [ref=e82]
                  - generic [ref=e83]:
                    - generic [ref=e84]: 🏠 Home Page (Top - Hero)
                    - generic [ref=e85]: ⏱ 10s display
                    - generic [ref=e86]: ♻️ V2
                - generic [ref=e87]:
                  - button "🔄" [ref=e88]
                  - button "0" [ref=e89]
                  - button [ref=e90]
              - generic [ref=e92]:
                - generic [ref=e93]:
                  - paragraph [ref=e94]: Clicks
                  - paragraph [ref=e95]: "0"
                - generic [ref=e96]:
                  - paragraph [ref=e97]: Duration
                  - paragraph [ref=e98]: 10s
                - generic [ref=e99]:
                  - paragraph [ref=e100]: Start
                  - paragraph [ref=e101]: Now
                - generic [ref=e102]:
                  - paragraph [ref=e103]: End
                  - paragraph [ref=e104]: Ongoing
                - button [ref=e106]:
                  - img [ref=e107]
          - generic [ref=e109]:
            - img "E2E Ad 1776709085365" [ref=e110]
            - generic [ref=e111]:
              - generic [ref=e112]:
                - generic [ref=e113]:
                  - heading "E2E Ad 1776709085365" [level=3] [ref=e114]
                  - generic [ref=e115]:
                    - generic [ref=e116]: 🏠 Home Page (Top - Hero)
                    - generic [ref=e117]: ⏱ 10s display
                    - generic [ref=e118]: ♻️ V2
                - generic [ref=e119]:
                  - button "🔄" [ref=e120]
                  - button "0" [ref=e121]
                  - button [ref=e122]
              - generic [ref=e124]:
                - generic [ref=e125]:
                  - paragraph [ref=e126]: Clicks
                  - paragraph [ref=e127]: "0"
                - generic [ref=e128]:
                  - paragraph [ref=e129]: Duration
                  - paragraph [ref=e130]: 10s
                - generic [ref=e131]:
                  - paragraph [ref=e132]: Start
                  - paragraph [ref=e133]: Now
                - generic [ref=e134]:
                  - paragraph [ref=e135]: End
                  - paragraph [ref=e136]: Ongoing
                - button [ref=e138]:
                  - img [ref=e139]
          - generic [ref=e141]:
            - img "gfd" [ref=e142]
            - generic [ref=e143]:
              - generic [ref=e144]:
                - generic [ref=e145]:
                  - heading "gfd" [level=3] [ref=e146]
                  - generic [ref=e147]:
                    - generic [ref=e148]: 🌐 All Pages (Popup)
                    - generic [ref=e149]: ⏱ 10s display
                    - generic [ref=e150]: ♻️ V1
                - generic [ref=e151]:
                  - button "🔄" [ref=e152]
                  - button "0" [ref=e153]
                  - button [ref=e154]
              - generic [ref=e156]:
                - generic [ref=e157]:
                  - paragraph [ref=e158]: Clicks
                  - paragraph [ref=e159]: "0"
                - generic [ref=e160]:
                  - paragraph [ref=e161]: Duration
                  - paragraph [ref=e162]: 10s
                - generic [ref=e163]:
                  - paragraph [ref=e164]: Start
                  - paragraph [ref=e165]: Now
                - generic [ref=e166]:
                  - paragraph [ref=e167]: End
                  - paragraph [ref=e168]: Ongoing
                - button [ref=e170]:
                  - img [ref=e171]
          - generic [ref=e173]:
            - img "ghjkl" [ref=e174]
            - generic [ref=e175]:
              - generic [ref=e176]:
                - generic [ref=e177]:
                  - heading "ghjkl" [level=3] [ref=e178]
                  - generic [ref=e179]:
                    - generic [ref=e180]: 🌐 All Pages (Popup)
                    - generic [ref=e181]: ⏱ 10s display
                    - generic [ref=e182]: ♻️ V1
                - generic [ref=e183]:
                  - button "🔄" [ref=e184]
                  - button "0" [ref=e185]
                  - button [ref=e186]
              - generic [ref=e188]:
                - generic [ref=e189]:
                  - paragraph [ref=e190]: Clicks
                  - paragraph [ref=e191]: "0"
                - generic [ref=e192]:
                  - paragraph [ref=e193]: Duration
                  - paragraph [ref=e194]: 10s
                - generic [ref=e195]:
                  - paragraph [ref=e196]: Start
                  - paragraph [ref=e197]: 2026-04-07
                - generic [ref=e198]:
                  - paragraph [ref=e199]: End
                  - paragraph [ref=e200]: 2026-04-24
                - button [ref=e202]:
                  - img [ref=e203]
          - generic [ref=e205]:
            - img "rqn" [ref=e206]
            - generic [ref=e207]:
              - generic [ref=e208]:
                - generic [ref=e209]:
                  - heading "rqn" [level=3] [ref=e210]
                  - generic [ref=e211]:
                    - generic [ref=e212]: 🏠 Home Page (Top - Hero)
                    - generic [ref=e213]: ⏱ 10s display
                    - generic [ref=e214]: ♻️ V1
                - generic [ref=e215]:
                  - button "🔄" [ref=e216]
                  - button "0" [ref=e217]
                  - button [ref=e218]
              - generic [ref=e220]:
                - generic [ref=e221]:
                  - paragraph [ref=e222]: Clicks
                  - paragraph [ref=e223]: "3"
                - generic [ref=e224]:
                  - paragraph [ref=e225]: Duration
                  - paragraph [ref=e226]: 10s
                - generic [ref=e227]:
                  - paragraph [ref=e228]: Start
                  - paragraph [ref=e229]: Now
                - generic [ref=e230]:
                  - paragraph [ref=e231]: End
                  - paragraph [ref=e232]: Ongoing
                - button [ref=e234]:
                  - img [ref=e235]
          - generic [ref=e237]:
            - img "خط" [ref=e238]
            - generic [ref=e239]:
              - generic [ref=e240]:
                - generic [ref=e241]:
                  - heading "خط" [level=3] [ref=e242]
                  - generic [ref=e243]:
                    - generic [ref=e244]: 🏠 Home Page (Top - Hero)
                    - generic [ref=e245]: ⏱ 10s display
                    - generic [ref=e246]: ♻️ V1
                - generic [ref=e247]:
                  - button "🔄" [ref=e248]
                  - button "0" [ref=e249]
                  - button [ref=e250]
              - generic [ref=e252]:
                - generic [ref=e253]:
                  - paragraph [ref=e254]: Clicks
                  - paragraph [ref=e255]: "0"
                - generic [ref=e256]:
                  - paragraph [ref=e257]: Duration
                  - paragraph [ref=e258]: 10s
                - generic [ref=e259]:
                  - paragraph [ref=e260]: Start
                  - paragraph [ref=e261]: Now
                - generic [ref=e262]:
                  - paragraph [ref=e263]: End
                  - paragraph [ref=e264]: Ongoing
                - button [ref=e266]:
                  - img [ref=e267]
  - link "Contact us on WhatsApp" [ref=e269]:
    - /url: https://wa.me/201140507026?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D9%88%D8%B5%D9%84%D8%AA%20%D8%A5%D9%84%D9%8A%D9%83%D9%85%20%D8%B9%D8%A8%D8%B1%20%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9%20%D9%88%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A5%D8%AD%D8%AF%D9%89%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85.%D9%87%D9%84%20%D9%8A%D9%85%D9%83%D9%86%D9%86%D9%8A%20%D9%85%D8%B9%D8%B1%D9%81%D8%A9%20%D8%A7%D9%84%D9%85%D8%B2%D9%8A%D8%AF%D8%9F
    - img [ref=e270]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const BASE_URL = "http://localhost:5173";
  4  | 
  5  | test("admin can create, manage, and delete ad", async ({ page }) => {
  6  |   const adminEmail = process.env.ADMIN_EMAIL;
  7  |   const adminPassword = process.env.ADMIN_PASSWORD;
  8  | 
  9  |   expect(adminEmail, "ADMIN_EMAIL is required").toBeTruthy();
  10 |   expect(adminPassword, "ADMIN_PASSWORD is required").toBeTruthy();
  11 | 
  12 |   const runtimeErrors = [];
  13 |   page.on("pageerror", (err) => runtimeErrors.push(`pageerror: ${err.message}`));
  14 |   page.on("console", (msg) => {
  15 |     if (msg.type() === "error") runtimeErrors.push(`console: ${msg.text()}`);
  16 |   });
  17 |   page.on("dialog", async (dialog) => {
  18 |     await dialog.accept();
  19 |   });
  20 | 
  21 |   const uniq = Date.now();
  22 |   const adTitle = `E2E Ad ${uniq}`;
  23 |   const adLink = "https://example.com";
  24 |   const adImage = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200";
  25 | 
  26 |   await page.goto(`${BASE_URL}/admin/login`, { waitUntil: "domcontentloaded" });
  27 |   await page.locator('input[type="email"]').fill(adminEmail);
  28 |   await page.locator('input[type="password"]').fill(adminPassword);
  29 |   const signInButton = page.getByRole("button", { name: "Sign In" });
  30 |   await expect(signInButton).toBeEnabled();
  31 |   await signInButton.click();
  32 |   await page.waitForLoadState("domcontentloaded");
  33 |   await expect(page).not.toHaveURL(/\/admin\/login$/);
  34 |   await expect(page).toHaveURL(/\/admin$/);
  35 | 
  36 |   await page.goto(`${BASE_URL}/admin/ads`, { waitUntil: "domcontentloaded" });
  37 |   await expect(page.getByRole("heading", { name: /Ad Management/i })).toBeVisible();
  38 | 
  39 |   await page.getByRole("button", { name: /Create New Ad/i }).click();
  40 |   await expect(page.getByRole("heading", { name: /Create New Ad/i })).toBeVisible();
  41 | 
  42 |   await page.getByPlaceholder("e.g. Ramadan Offer").fill(adTitle);
  43 |   await page.getByPlaceholder("https://...").fill(adLink);
  44 |   await page.getByPlaceholder("Paste an Image URL or upload a file below").fill(adImage);
  45 |   await page.getByPlaceholder("e.g. Sponsored").fill("E2E");
  46 |   await page.getByRole("button", { name: /Publish Ad/i }).click();
  47 | 
  48 |   await expect(page.getByText(adTitle)).toBeVisible({ timeout: 20000 });
  49 | 
  50 |   const adCard = page
  51 |     .locator(`h3:has-text("${adTitle}")`)
  52 |     .first()
  53 |     .locator('xpath=ancestor::div[contains(@class,"rounded-3xl")]');
  54 |   await expect(adCard).toBeVisible();
  55 | 
  56 |   const versionBadge = adCard.locator("span").filter({ hasText: "♻️ V" }).first();
  57 |   const oldVersionText = (await versionBadge.textContent()) ?? "♻️ V1";
  58 |   const oldVersion = Number(oldVersionText.replace(/[^0-9]/g, "")) || 1;
  59 |   await adCard.getByRole("button", { name: "🔄" }).click();
  60 |   await expect(versionBadge).toContainText(`V${oldVersion + 1}`, { timeout: 10000 });
  61 | 
  62 |   await adCard.getByRole("button", { name: "0" }).click();
  63 |   await expect(adCard.getByText("0").first()).toBeVisible();
  64 | 
  65 |   const toggleButton = adCard.locator("button.w-12.h-6");
  66 |   const oldToggleClass = (await toggleButton.getAttribute("class")) ?? "";
  67 |   await toggleButton.click();
  68 |   await expect(toggleButton).not.toHaveAttribute("class", oldToggleClass, { timeout: 10000 });
  69 | 
  70 |   await adCard.locator("button.text-red-500").click();
  71 |   await expect(page.getByText(adTitle)).toHaveCount(0);
  72 | 
> 73 |   expect(runtimeErrors, `Runtime errors:\n${runtimeErrors.join("\n")}`).toEqual([]);
     |                                                                         ^ Error: Runtime errors:
  74 | });
  75 | 
```