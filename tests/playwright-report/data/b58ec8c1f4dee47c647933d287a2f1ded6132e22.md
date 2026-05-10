# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: entry-page.spec.js >> 🛒 Entry Page - Navigation Tests >> TC013: Navigate to Recycle Bin page
- Location: e2e\entry-page.spec.js:155:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=Recycle Bin')

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
  128 |   });
  129 | 
  130 |   test('TC011: Form reset after submission', async ({ page }) => {
  131 |     await page.fill('#sale_amount', '100.00');
  132 |     await page.fill('#expense_name', 'Test Item');
  133 |     await page.click('#submitBtn');
  134 |     
  135 |     await page.waitForTimeout(3000);
  136 |     
  137 |     // Check if form fields are cleared
  138 |     const saleAmount = await page.inputValue('#sale_amount');
  139 |     expect(saleAmount).toBe('');
  140 |   });
  141 | });
  142 | 
  143 | test.describe('🛒 Entry Page - Navigation Tests', () => {
  144 |   
  145 |   test.beforeEach(async ({ page }) => {
  146 |     await page.goto(BASE_URL);
  147 |   });
  148 | 
  149 |   test('TC012: Navigate to Viewer page', async ({ page }) => {
  150 |     await page.click('text=View Data');
  151 |     await expect(page).toHaveURL(/viewer\.html/);
  152 |     await expect(page.locator('h1')).toContainText('AMRS Shop Tracker');
  153 |   });
  154 | 
  155 |   test('TC013: Navigate to Recycle Bin page', async ({ page }) => {
> 156 |     await page.click('text=Recycle Bin');
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
  157 |     await expect(page).toHaveURL(/recycle-bin\.html/);
  158 |     await expect(page.locator('h1')).toContainText('Recycle Bin');
  159 |   });
  160 | });
  161 | 
  162 | test.describe('🛒 Entry Page - Performance Tests', () => {
  163 |   
  164 |   test('TC014: Page load performance', async ({ page }) => {
  165 |     const start = Date.now();
  166 |     await page.goto(BASE_URL);
  167 |     await page.waitForLoadState('networkidle');
  168 |     const loadTime = Date.now() - start;
  169 |     
  170 |     console.log(`Page load time: ${loadTime}ms`);
  171 |     expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
  172 |   });
  173 | 
  174 |   test('TC015: Check for console errors', async ({ page }) => {
  175 |     const errors = [];
  176 |     page.on('console', msg => {
  177 |       if (msg.type() === 'error') {
  178 |         errors.push(msg.text());
  179 |       }
  180 |     });
  181 |     
  182 |     await page.goto(BASE_URL);
  183 |     await page.waitForTimeout(2000);
  184 |     
  185 |     expect(errors).toHaveLength(0);
  186 |   });
  187 | 
  188 |   test('TC016: Check for broken images', async ({ page }) => {
  189 |     const brokenImages = await page.evaluate(() => {
  190 |       return Array.from(document.images)
  191 |         .filter(img => !img.complete || img.naturalWidth === 0)
  192 |         .map(img => img.src);
  193 |     });
  194 |     
  195 |     expect(brokenImages).toHaveLength(0);
  196 |   });
  197 | });
  198 | 
  199 | test.describe('🛒 Entry Page - Accessibility Tests', () => {
  200 |   
  201 |   test.beforeEach(async ({ page }) => {
  202 |     await page.goto(BASE_URL);
  203 |   });
  204 | 
  205 |   test('TC017: Verify form inputs have labels', async ({ page }) => {
  206 |     const inputs = ['#sale_amount', '#expense_name', '#expense_amount'];
  207 |     
  208 |     for (const input of inputs) {
  209 |       const element = page.locator(input);
  210 |       const label = await element.evaluate(el => {
  211 |         const id = el.id;
  212 |         const labelEl = document.querySelector(`label[for="${id}"]`);
  213 |         return labelEl ? labelEl.textContent : null;
  214 |       });
  215 |       
  216 |       expect(label).not.toBeNull();
  217 |     }
  218 |   });
  219 | 
  220 |   test('TC018: Verify color contrast', async ({ page }) => {
  221 |     // Check heading color is readable
  222 |     const heading = page.locator('h1');
  223 |     const color = await heading.evaluate(el => {
  224 |       const styles = window.getComputedStyle(el);
  225 |       return styles.color;
  226 |     });
  227 |     
  228 |     expect(color).not.toBe('rgb(255, 255, 255)'); // Not white on potentially light background
  229 |   });
  230 | 
  231 |   test('TC019: Keyboard navigation works', async ({ page }) => {
  232 |     await page.keyboard.press('Tab');
  233 |     
  234 |     // Check if we can navigate to form elements
  235 |     const focusedElement = await page.evaluate(() => {
  236 |       return document.activeElement?.tagName;
  237 |     });
  238 |     
  239 |     expect(focusedElement).toBeDefined();
  240 |   });
  241 | });
  242 | 
```