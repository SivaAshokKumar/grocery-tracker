# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: entry-page.spec.js >> 🛒 Entry Page - UI/UX Tests >> TC002: Verify all navigation links present
- Location: e2e\entry-page.spec.js:25:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.nav-links a')
Expected: 3
Received: 2
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('.nav-links a')
    8 × locator resolved to 2 elements
      - unexpected value "2"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "🛒 AMRS Shop Tracker" [level=1] [ref=e3]
  - paragraph [ref=e4]: Sales & Expense Management System
  - generic [ref=e5]:
    - link "📥 Entry" [ref=e6] [cursor=pointer]:
      - /url: index.html
    - link "📊 View Data" [ref=e7] [cursor=pointer]:
      - /url: viewer.html
  - generic [ref=e8]:
    - generic [ref=e9]:
      - generic [ref=e10]: Sale Amount (optional)
      - spinbutton "Sale Amount (optional)" [ref=e11]
    - generic [ref=e12]:
      - generic [ref=e13]: Expense Name (optional)
      - textbox "Expense Name (optional)" [ref=e14]:
        - /placeholder: Enter expense name
    - generic [ref=e15]:
      - generic [ref=e16]: Expense Amount (optional)
      - spinbutton "Expense Amount (optional)" [ref=e17]
    - button "💾 Save Transaction" [ref=e18] [cursor=pointer]
```

# Test source

```ts
  1   | /**
  2   |  * AMRS Shop Tracker - Entry Page Test Suite
  3   |  * Tests for: https://sivaashokkumar.github.io/grocery-tracker/
  4   |  */
  5   | 
  6   | const { test, expect } = require('@playwright/test');
  7   | 
  8   | const BASE_URL = '/grocery-tracker/';
  9   | 
  10  | test.describe('🛒 Entry Page - UI/UX Tests', () => {
  11  |   
  12  |   test.beforeEach(async ({ page }) => {
  13  |     await page.goto(BASE_URL);
  14  |     await page.waitForLoadState('networkidle');
  15  |   });
  16  | 
  17  |   test('TC001: Verify page title and branding', async ({ page }) => {
  18  |     await expect(page).toHaveTitle(/AMRS Shop Tracker/);
  19  |     
  20  |     const heading = page.locator('h1');
  21  |     await expect(heading).toContainText('AMRS Shop Tracker');
  22  |     await expect(heading).toBeVisible();
  23  |   });
  24  | 
  25  |   test('TC002: Verify all navigation links present', async ({ page }) => {
  26  |     const navLinks = page.locator('.nav-links a');
> 27  |     await expect(navLinks).toHaveCount(3);
      |                            ^ Error: expect(locator).toHaveCount(expected) failed
  28  |     
  29  |     await expect(navLinks.nth(0)).toContainText('Entry');
  30  |     await expect(navLinks.nth(1)).toContainText('View Data');
  31  |     await expect(navLinks.nth(2)).toContainText('Recycle Bin');
  32  |   });
  33  | 
  34  |   test('TC003: Verify form elements present', async ({ page }) => {
  35  |     // Check all form inputs exist
  36  |     await expect(page.locator('#sale_amount')).toBeVisible();
  37  |     await expect(page.locator('#expense_name')).toBeVisible();
  38  |     await expect(page.locator('#expense_amount')).toBeVisible();
  39  |     await expect(page.locator('#submitBtn')).toBeVisible();
  40  |     
  41  |     // Check labels
  42  |     await expect(page.locator('text=Sale Amount')).toBeVisible();
  43  |     await expect(page.locator('text=Expense Name')).toBeVisible();
  44  |     await expect(page.locator('text=Expense Amount')).toBeVisible();
  45  |   });
  46  | 
  47  |   test('TC004: Verify responsive design - Mobile viewport', async ({ page }) => {
  48  |     await page.setViewportSize({ width: 375, height: 667 });
  49  |     await page.reload();
  50  |     
  51  |     const container = page.locator('.container');
  52  |     await expect(container).toBeVisible();
  53  |     
  54  |     // Check form is usable on mobile
  55  |     await expect(page.locator('#sale_amount')).toBeVisible();
  56  |     await expect(page.locator('#submitBtn')).toBeVisible();
  57  |   });
  58  | 
  59  |   test('TC005: Verify responsive design - Tablet viewport', async ({ page }) => {
  60  |     await page.setViewportSize({ width: 768, height: 1024 });
  61  |     await page.reload();
  62  |     
  63  |     const container = page.locator('.container');
  64  |     await expect(container).toBeVisible();
  65  |   });
  66  | });
  67  | 
  68  | test.describe('🛒 Entry Page - Functional Tests', () => {
  69  |   
  70  |   test.beforeEach(async ({ page }) => {
  71  |     await page.goto(BASE_URL);
  72  |     await page.waitForLoadState('networkidle');
  73  |   });
  74  | 
  75  |   test('TC006: Submit sale amount only', async ({ page }) => {
  76  |     await page.fill('#sale_amount', '150.50');
  77  |     await page.click('#submitBtn');
  78  |     
  79  |     // Wait for response
  80  |     await page.waitForTimeout(2000);
  81  |     
  82  |     const message = page.locator('#message');
  83  |     await expect(message).toBeVisible({ timeout: 10000 });
  84  |   });
  85  | 
  86  |   test('TC007: Submit expense only', async ({ page }) => {
  87  |     await page.fill('#expense_name', 'Vegetables');
  88  |     await page.fill('#expense_amount', '45.00');
  89  |     await page.click('#submitBtn');
  90  |     
  91  |     await page.waitForTimeout(2000);
  92  |     
  93  |     const message = page.locator('#message');
  94  |     await expect(message).toBeVisible({ timeout: 10000 });
  95  |   });
  96  | 
  97  |   test('TC008: Submit both sale and expense', async ({ page }) => {
  98  |     await page.fill('#sale_amount', '200.00');
  99  |     await page.fill('#expense_name', 'Stationery');
  100 |     await page.fill('#expense_amount', '25.00');
  101 |     await page.click('#submitBtn');
  102 |     
  103 |     await page.waitForTimeout(2000);
  104 |     
  105 |     const message = page.locator('#message');
  106 |     await expect(message).toBeVisible({ timeout: 10000 });
  107 |   });
  108 | 
  109 |   test('TC009: Submit empty form (all optional fields)', async ({ page }) => {
  110 |     await page.click('#submitBtn');
  111 |     
  112 |     await page.waitForTimeout(2000);
  113 |     
  114 |     // Should either show error or allow empty submission
  115 |     const message = page.locator('#message');
  116 |     await expect(message).toBeVisible({ timeout: 10000 });
  117 |   });
  118 | 
  119 |   test('TC010: Submit with decimal values', async ({ page }) => {
  120 |     await page.fill('#sale_amount', '123.45');
  121 |     await page.fill('#expense_amount', '67.89');
  122 |     await page.click('#submitBtn');
  123 |     
  124 |     await page.waitForTimeout(2000);
  125 |     
  126 |     const message = page.locator('#message');
  127 |     await expect(message).toBeVisible({ timeout: 10000 });
```