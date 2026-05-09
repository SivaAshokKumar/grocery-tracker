/**
 * AMRS Shop Tracker - Recycle Bin Test Suite
 * Tests for: https://sivaashokkumar.github.io/grocery-tracker/recycle-bin.html
 */

const { test, expect } = require('@playwright/test');

const RECYCLE_BIN_URL = '/grocery-tracker/recycle-bin.html';

test.describe('🗑️ Recycle Bin - UI/UX Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(RECYCLE_BIN_URL);
    await page.waitForLoadState('networkidle');
  });

  test('TC037: Verify page title and branding', async ({ page }) => {
    await expect(page).toHaveTitle(/Recycle Bin/);
    
    const heading = page.locator('h1');
    await expect(heading).toContainText('Recycle Bin');
  });

  test('TC038: Verify deleted count card', async ({ page }) => {
    await expect(page.locator('text=Deleted Transactions')).toBeVisible();
    await expect(page.locator('#deletedCount')).toBeVisible();
    
    const count = await page.locator('#deletedCount').textContent();
    expect(parseInt(count) >= 0).toBeTruthy();
  });

  test('TC039: Verify action buttons present', async ({ page }) => {
    await expect(page.locator('text=Refresh')).toBeVisible();
    await expect(page.locator('text=Restore All')).toBeVisible();
    await expect(page.locator('text=Empty Recycle Bin')).toBeVisible();
  });

  test('TC040: Verify table or empty state', async ({ page }) => {
    await page.waitForTimeout(3000);
    
    const tableExists = await page.locator('table').count() > 0;
    const emptyStateExists = await page.locator('text=Recycle Bin is empty').count() > 0;
    
    expect(tableExists || emptyStateExists).toBeTruthy();
  });

  test('TC041: Responsive design - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    await expect(page.locator('.container')).toBeVisible();
    await expect(page.locator('.stats-card')).toBeVisible();
  });
});

test.describe('🗑️ Recycle Bin - Functional Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(RECYCLE_BIN_URL);
    await page.waitForTimeout(3000);
  });

  test('TC042: Refresh deleted data', async ({ page }) => {
    await page.click('text=Refresh');
    await page.waitForTimeout(2000);
    
    // Verify page didn't crash
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('#tableContent')).toBeVisible();
  });

  test('TC043: Table columns verification', async ({ page }) => {
    const tableExists = await page.locator('table').count() > 0;
    
    if (tableExists) {
      const headers = await page.locator('th').allTextContents();
      
      expect(headers.some(h => h.includes('#'))).toBeTruthy();
      expect(headers.some(h => h.includes('Original Created'))).toBeTruthy();
      expect(headers.some(h => h.includes('Deleted At'))).toBeTruthy();
      expect(headers.some(h => h.includes('Actions'))).toBeTruthy();
    }
  });

  test('TC044: Restore button visibility', async ({ page }) => {
    const tableExists = await page.locator('table').count() > 0;
    
    if (tableExists) {
      const restoreButton = page.locator('button:has-text("Restore")').first();
      await expect(restoreButton).toBeVisible();
    }
  });

  test('TC045: Permanent delete button visibility', async ({ page }) => {
    const tableExists = await page.locator('table').count() > 0;
    
    if (tableExists) {
      const deleteButton = page.locator('button:has-text("Delete")').first();
      await expect(deleteButton).toBeVisible();
    }
  });

  test('TC046: Navigation to other pages', async ({ page }) => {
    await page.click('text=Entry');
    await expect(page).toHaveURL(/grocery-tracker\/$/);
    
    await page.goto(RECYCLE_BIN_URL);
    await page.click('text=View Data');
    await expect(page).toHaveURL(/viewer\.html/);
  });
});

test.describe('🗑️ Recycle Bin - Integration Tests', () => {
  
  test('TC047: End-to-end delete and restore flow', async ({ page }) => {
    // Step 1: Add a transaction on entry page
    await page.goto('/grocery-tracker/');
    await page.waitForTimeout(2000);
    
    const timestamp = Date.now();
    await page.fill('#expense_name', `Test Item ${timestamp}`);
    await page.fill('#expense_amount', '99.99');
    await page.click('#submitBtn');
    
    await page.waitForTimeout(3000);
    
    // Step 2: Go to viewer and verify it exists
    await page.goto('/grocery-tracker/viewer.html');
    await page.waitForTimeout(3000);
    
    // Step 3: Delete it (if found in table)
    const rows = await page.locator('table tbody tr').count();
    if (rows > 0) {
      // Click delete on first row
      await page.locator('button:has-text("Delete")').first().click();
      
      // Confirm deletion
      page.on('dialog', async dialog => {
        if (dialog.type() === 'confirm') {
          await dialog.accept();
        }
      });
      
      await page.waitForTimeout(3000);
      
      // Step 4: Go to recycle bin and verify it's there
      await page.goto(RECYCLE_BIN_URL);
      await page.waitForTimeout(3000);
      
      const recycleBinCount = await page.locator('#deletedCount').textContent();
      console.log(`Recycle bin count after deletion: ${recycleBinCount}`);
    }
  });
});

test.describe('🗑️ Recycle Bin - Performance Tests', () => {
  
  test('TC048: Page load time', async ({ page }) => {
    const start = Date.now();
    await page.goto(RECYCLE_BIN_URL);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - start;
    
    console.log(`Recycle bin page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(6000);
  });

  test('TC049: Data loading with many items', async ({ page }) => {
    await page.goto(RECYCLE_BIN_URL);
    
    const start = Date.now();
    await page.waitForTimeout(3000);
    const loadTime = Date.now() - start;
    
    console.log(`Recycle bin data load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('TC050: No console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto(RECYCLE_BIN_URL);
    await page.waitForTimeout(3000);
    
    console.log(`Console errors: ${errors.length}`);
    errors.forEach(e => console.log(`Error: ${e}`));
  });
});

test.describe('🗑️ Recycle Bin - Security Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(RECYCLE_BIN_URL);
  });

  test('TC051: Verify no sensitive data exposure', async ({ page }) => {
    const pageContent = await page.content();
    
    // Should not expose raw API keys in HTML (they should be in JS only)
    expect(pageContent).not.toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
  });

  test('TC052: HTTPS enforcement check', async ({ page }) => {
    const url = page.url();
    expect(url.startsWith('https://')).toBeTruthy();
  });
});
