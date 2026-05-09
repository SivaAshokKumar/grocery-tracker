/**
 * AMRS Shop Tracker - Entry Page Test Suite
 * Tests for: https://sivaashokkumar.github.io/grocery-tracker/
 */

const { test, expect } = require('@playwright/test');

const BASE_URL = '/grocery-tracker/';

test.describe('🛒 Entry Page - UI/UX Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('TC001: Verify page title and branding', async ({ page }) => {
    await expect(page).toHaveTitle(/AMRS Shop Tracker/);
    
    const heading = page.locator('h1');
    await expect(heading).toContainText('AMRS Shop Tracker');
    await expect(heading).toBeVisible();
  });

  test('TC002: Verify all navigation links present', async ({ page }) => {
    const navLinks = page.locator('.nav-links a');
    await expect(navLinks).toHaveCount(3);
    
    await expect(navLinks.nth(0)).toContainText('Entry');
    await expect(navLinks.nth(1)).toContainText('View Data');
    await expect(navLinks.nth(2)).toContainText('Recycle Bin');
  });

  test('TC003: Verify form elements present', async ({ page }) => {
    // Check all form inputs exist
    await expect(page.locator('#sale_amount')).toBeVisible();
    await expect(page.locator('#expense_name')).toBeVisible();
    await expect(page.locator('#expense_amount')).toBeVisible();
    await expect(page.locator('#submitBtn')).toBeVisible();
    
    // Check labels
    await expect(page.locator('text=Sale Amount')).toBeVisible();
    await expect(page.locator('text=Expense Name')).toBeVisible();
    await expect(page.locator('text=Expense Amount')).toBeVisible();
  });

  test('TC004: Verify responsive design - Mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    const container = page.locator('.container');
    await expect(container).toBeVisible();
    
    // Check form is usable on mobile
    await expect(page.locator('#sale_amount')).toBeVisible();
    await expect(page.locator('#submitBtn')).toBeVisible();
  });

  test('TC005: Verify responsive design - Tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    
    const container = page.locator('.container');
    await expect(container).toBeVisible();
  });
});

test.describe('🛒 Entry Page - Functional Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('TC006: Submit sale amount only', async ({ page }) => {
    await page.fill('#sale_amount', '150.50');
    await page.click('#submitBtn');
    
    // Wait for response
    await page.waitForTimeout(2000);
    
    const message = page.locator('#message');
    await expect(message).toBeVisible({ timeout: 10000 });
  });

  test('TC007: Submit expense only', async ({ page }) => {
    await page.fill('#expense_name', 'Vegetables');
    await page.fill('#expense_amount', '45.00');
    await page.click('#submitBtn');
    
    await page.waitForTimeout(2000);
    
    const message = page.locator('#message');
    await expect(message).toBeVisible({ timeout: 10000 });
  });

  test('TC008: Submit both sale and expense', async ({ page }) => {
    await page.fill('#sale_amount', '200.00');
    await page.fill('#expense_name', 'Stationery');
    await page.fill('#expense_amount', '25.00');
    await page.click('#submitBtn');
    
    await page.waitForTimeout(2000);
    
    const message = page.locator('#message');
    await expect(message).toBeVisible({ timeout: 10000 });
  });

  test('TC009: Submit empty form (all optional fields)', async ({ page }) => {
    await page.click('#submitBtn');
    
    await page.waitForTimeout(2000);
    
    // Should either show error or allow empty submission
    const message = page.locator('#message');
    await expect(message).toBeVisible({ timeout: 10000 });
  });

  test('TC010: Submit with decimal values', async ({ page }) => {
    await page.fill('#sale_amount', '123.45');
    await page.fill('#expense_amount', '67.89');
    await page.click('#submitBtn');
    
    await page.waitForTimeout(2000);
    
    const message = page.locator('#message');
    await expect(message).toBeVisible({ timeout: 10000 });
  });

  test('TC011: Form reset after submission', async ({ page }) => {
    await page.fill('#sale_amount', '100.00');
    await page.fill('#expense_name', 'Test Item');
    await page.click('#submitBtn');
    
    await page.waitForTimeout(3000);
    
    // Check if form fields are cleared
    const saleAmount = await page.inputValue('#sale_amount');
    expect(saleAmount).toBe('');
  });
});

test.describe('🛒 Entry Page - Navigation Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('TC012: Navigate to Viewer page', async ({ page }) => {
    await page.click('text=View Data');
    await expect(page).toHaveURL(/viewer\.html/);
    await expect(page.locator('h1')).toContainText('AMRS Shop Tracker');
  });

  test('TC013: Navigate to Recycle Bin page', async ({ page }) => {
    await page.click('text=Recycle Bin');
    await expect(page).toHaveURL(/recycle-bin\.html/);
    await expect(page.locator('h1')).toContainText('Recycle Bin');
  });
});

test.describe('🛒 Entry Page - Performance Tests', () => {
  
  test('TC014: Page load performance', async ({ page }) => {
    const start = Date.now();
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - start;
    
    console.log(`Page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
  });

  test('TC015: Check for console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto(BASE_URL);
    await page.waitForTimeout(2000);
    
    expect(errors).toHaveLength(0);
  });

  test('TC016: Check for broken images', async ({ page }) => {
    const brokenImages = await page.evaluate(() => {
      return Array.from(document.images)
        .filter(img => !img.complete || img.naturalWidth === 0)
        .map(img => img.src);
    });
    
    expect(brokenImages).toHaveLength(0);
  });
});

test.describe('🛒 Entry Page - Accessibility Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('TC017: Verify form inputs have labels', async ({ page }) => {
    const inputs = ['#sale_amount', '#expense_name', '#expense_amount'];
    
    for (const input of inputs) {
      const element = page.locator(input);
      const label = await element.evaluate(el => {
        const id = el.id;
        const labelEl = document.querySelector(`label[for="${id}"]`);
        return labelEl ? labelEl.textContent : null;
      });
      
      expect(label).not.toBeNull();
    }
  });

  test('TC018: Verify color contrast', async ({ page }) => {
    // Check heading color is readable
    const heading = page.locator('h1');
    const color = await heading.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.color;
    });
    
    expect(color).not.toBe('rgb(255, 255, 255)'); // Not white on potentially light background
  });

  test('TC019: Keyboard navigation works', async ({ page }) => {
    await page.keyboard.press('Tab');
    
    // Check if we can navigate to form elements
    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });
    
    expect(focusedElement).toBeDefined();
  });
});
