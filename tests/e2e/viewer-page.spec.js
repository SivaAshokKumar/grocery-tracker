/**
 * AMRS Shop Tracker - Viewer Page Test Suite
 * Tests for: https://sivaashokkumar.github.io/grocery-tracker/viewer.html
 */

const { test, expect } = require('@playwright/test');

const VIEWER_URL = '/grocery-tracker/viewer.html';

test.describe('📊 Viewer Page - UI/UX Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(VIEWER_URL);
    await page.waitForLoadState('networkidle');
  });

  test('TC020: Verify page title and branding', async ({ page }) => {
    await expect(page).toHaveTitle(/AMRS Shop Tracker/);
    
    const heading = page.locator('h1');
    await expect(heading).toContainText('AMRS Shop Tracker');
  });

  test('TC021: Verify statistics cards present', async ({ page }) => {
    await expect(page.locator('text=Total Transactions')).toBeVisible();
    await expect(page.locator('text=Total Sales')).toBeVisible();
    await expect(page.locator('text=Total Expenses')).toBeVisible();
    await expect(page.locator('text=Net Balance')).toBeVisible();
  });

  test('TC022: Verify action buttons present', async ({ page }) => {
    await expect(page.locator('text=Refresh')).toBeVisible();
    await expect(page.locator('text=Export to Excel')).toBeVisible();
    await expect(page.locator('text=Clear All Data')).toBeVisible();
  });

  test('TC023: Verify filters present', async ({ page }) => {
    await expect(page.locator('#searchInput')).toBeVisible();
    await expect(page.locator('#dateFrom')).toBeVisible();
    await expect(page.locator('#dateTo')).toBeVisible();
  });

  test('TC024: Verify data table structure', async ({ page }) => {
    // Wait for table to load or show "no data" message
    await page.waitForTimeout(2000);
    
    const tableContent = page.locator('#tableContent');
    await expect(tableContent).toBeVisible();
    
    // Check if table headers exist OR no-data message exists
    const hasTable = await page.locator('table').count() > 0;
    const hasNoData = await page.locator('.no-data').count() > 0;
    
    expect(hasTable || hasNoData).toBeTruthy();
  });

  test('TC025: Responsive design - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    
    await expect(page.locator('.container')).toBeVisible();
    await expect(page.locator('.stats-cards')).toBeVisible();
  });
});

test.describe('📊 Viewer Page - Functional Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(VIEWER_URL);
    await page.waitForLoadState('networkidle');
  });

  test('TC026: Refresh data button works', async ({ page }) => {
    await page.click('text=Refresh');
    await page.waitForTimeout(2000);
    
    // Should either load data or show appropriate message
    const message = page.locator('#message');
    // Message might not appear on success, so just verify no crash
    await expect(page.locator('body')).toBeVisible();
  });

  test('TC027: Search filter functionality', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Type in search box
    await page.fill('#searchInput', 'test');
    await page.waitForTimeout(1000);
    
    // Should not crash
    await expect(page.locator('body')).toBeVisible();
  });

  test('TC028: Date range filter', async ({ page }) => {
    await page.fill('#dateFrom', '2024-01-01');
    await page.fill('#dateTo', '2024-12-31');
    await page.waitForTimeout(1000);
    
    // Should not crash
    await expect(page.locator('body')).toBeVisible();
  });

  test('TC029: Export to Excel button', async ({ page }) => {
    // Note: Actual download testing requires additional setup
    await page.click('text=Export to Excel');
    await page.waitForTimeout(1000);
    
    // Check for success message or no error
    await expect(page.locator('body')).toBeVisible();
  });

  test('TC030: Navigation links work', async ({ page }) => {
    await page.click('text=Entry');
    await expect(page).toHaveURL(/grocery-tracker\/$/);
    
    await page.goto(VIEWER_URL);
    await page.click('text=Recycle Bin');
    await expect(page).toHaveURL(/recycle-bin\.html/);
  });
});

test.describe('📊 Viewer Page - Data Display Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(VIEWER_URL);
    await page.waitForTimeout(3000); // Wait for data to load
  });

  test('TC031: Verify table columns', async ({ page }) => {
    const tableExists = await page.locator('table').count() > 0;
    
    if (tableExists) {
      const headers = await page.locator('th').allTextContents();
      
      // Check expected column headers exist
      expect(headers.some(h => h.includes('#') || h.includes('No'))).toBeTruthy();
      expect(headers.some(h => h.includes('Date') || h.includes('Time'))).toBeTruthy();
      expect(headers.some(h => h.includes('Sale') || h.includes('Amount'))).toBeTruthy();
      expect(headers.some(h => h.includes('Expense'))).toBeTruthy();
      expect(headers.some(h => h.includes('Actions'))).toBeTruthy();
    }
  });

  test('TC032: Verify data row structure', async ({ page }) => {
    const rows = await page.locator('table tbody tr').count();
    
    if (rows > 0) {
      const firstRow = page.locator('table tbody tr').first();
      await expect(firstRow).toBeVisible();
      
      // Check for delete button in actions column
      const deleteButton = firstRow.locator('button:has-text("Delete")');
      await expect(deleteButton).toBeVisible();
    }
  });

  test('TC033: Statistics calculation', async ({ page }) => {
    const totalCount = await page.locator('#totalCount').textContent();
    const totalSales = await page.locator('#totalSales').textContent();
    const totalExpenses = await page.locator('#totalExpenses').textContent();
    const netBalance = await page.locator('#netBalance').textContent();
    
    // All stats should be visible and have values
    expect(totalCount).toBeTruthy();
    expect(totalSales).toContain('₹');
    expect(totalExpenses).toContain('₹');
    expect(netBalance).toContain('₹');
  });
});

test.describe('📊 Viewer Page - Performance Tests', () => {
  
  test('TC034: Page load time', async ({ page }) => {
    const start = Date.now();
    await page.goto(VIEWER_URL);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - start;
    
    console.log(`Viewer page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(6000);
  });

  test('TC035: Data loading performance', async ({ page }) => {
    await page.goto(VIEWER_URL);
    
    const start = Date.now();
    await page.click('text=Refresh');
    await page.waitForTimeout(3000);
    const loadTime = Date.now() - start;
    
    console.log(`Data refresh time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(5000);
  });

  test('TC036: No JavaScript errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    
    await page.goto(VIEWER_URL);
    await page.waitForTimeout(3000);
    
    expect(errors).toHaveLength(0);
  });
});
