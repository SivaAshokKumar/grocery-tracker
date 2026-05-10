# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: recycle-bin.spec.js >> 🗑️ Recycle Bin - Security Tests >> TC051: Verify no sensitive data exposure
- Location: e2e\recycle-bin.spec.js:201:3

# Error details

```
Error: expect(received).not.toContain(expected) // indexOf

Expected substring: not "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
Received string:        "<!DOCTYPE html><html lang=\"en\"><head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>🛒 AMRS Shop Tracker - Recycle Bin</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            padding: 30px;
            box-shadow: 0 25px 80px rgba(0,0,0,0.4);
            max-width: 1200px;
            margin: 0 auto;
            border: 1px solid rgba(255,255,255,0.2);
        }
        h1 {
            color: #1a1a2e;
            text-align: center;
            margin-bottom: 8px;
            font-size: 28px;
            font-weight: 700;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 25px;
            font-size: 13px;
        }
        .nav-links {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        .nav-links a {
            flex: 1;
            text-align: center;
            padding: 12px;
            background: white;
            color: #667eea;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            border-radius: 10px;
            border: 2px solid #667eea;
            transition: all 0.3s ease;
        }
        .nav-links a:hover, .nav-links a.active {
            background: #667eea;
            color: white;
        }
        .stats-card {
            background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
            color: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            margin-bottom: 20px;
        }
        .stats-card h3 {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 8px;
        }
        .stats-card .value {
            font-size: 32px;
            font-weight: 700;
        }
        .actions {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
            justify-content: center;
        }
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }
        .btn-success {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
        }
        .btn-success:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
        }
        .btn-danger {
            background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
            color: white;
        }
        .btn-danger:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
        }
        .btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        .table-container {
            overflow-x: auto;
            border-radius: 12px;
            border: 1px solid #e0e0e0;
            margin-top: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        thead {
            background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
            color: white;
        }
        th {
            padding: 15px 12px;
            text-align: left;
            font-weight: 600;
            font-size: 13px;
        }
        td {
            padding: 12px;
            border-bottom: 1px solid #e0e0e0;
        }
        tr:nth-child(even) {
            background: #fff8e1;
        }
        tr:hover {
            background: #ffecb3;
        }
        .no-data {
            text-align: center;
            padding: 40px;
            color: #666;
            font-size: 16px;
        }
        .loading {
            text-align: center;
            padding: 40px;
            color: #ff9800;
        }
        .loading::after {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #ff9800;
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-left: 10px;
            vertical-align: middle;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .message {
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 500;
        }
        .message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #b1dfbb;
        }
        .message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f1b0b7;
        }
        .deleted-at {
            color: #dc3545;
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            .container {
                padding: 20px 15px;
            }
            h1 {
                font-size: 22px;
            }
            .nav-links {
                flex-wrap: wrap;
            }
            .nav-links a {
                font-size: 12px;
                padding: 10px;
            }
            th, td {
                padding: 10px 8px;
                font-size: 12px;
            }
        }
    </style>
</head>
<body>
    <div class=\"container\">
        <h1>🗑️ AMRS Shop Tracker - Recycle Bin</h1>
        <p class=\"subtitle\">Restore or Permanently Delete Transactions</p>
        
        <div class=\"nav-links\">
            <a href=\"index.html\">📥 Entry</a>
            <a href=\"viewer.html\">📊 View Data</a>
            <a href=\"recycle-bin.html\" class=\"active\">🗑️ Recycle Bin</a>
        </div>
        
        <div class=\"stats-card\">
            <h3>Deleted Transactions</h3>
            <div class=\"value\" id=\"deletedCount\">0</div>
        </div>
        
        <div class=\"actions\">
            <button class=\"btn btn-primary\" onclick=\"loadDeletedData()\">🔄 Refresh</button>
            <button class=\"btn btn-success\" onclick=\"restoreAll()\">♻️ Restore All</button>
            <button class=\"btn btn-danger\" onclick=\"emptyRecycleBin()\">🗑️ Empty Recycle Bin</button>
        </div>
        
        <div id=\"message\"></div>
        
        <div class=\"table-container\">
            <div id=\"tableContent\"><div class=\"loading\">Loading deleted items...</div></div>
        </div>
    </div>

    <script>
        // ==========================================
        // HARDCODED SUPABASE CONFIGURATION
        // ==========================================
        const SUPABASE_URL = 'https://qgnmyqayxylfacrnhxiw.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbm15cWF5eHlsZmFjcm5oeGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMDgxMjcsImV4cCI6MjA5Mzg4NDEyN30.emW2ijd4y7VLwdI0phDphtm7tvHzz1p9TcisWcBl7mk';
        
        let deletedData = [];
        
        function showMessage(text, type) {
            const msgDiv = document.getElementById('message');
            msgDiv.className = 'message ' + type;
            msgDiv.textContent = text;
            setTimeout(() => {
                msgDiv.className = '';
                msgDiv.textContent = '';
            }, 5000);
        }
        
        async function loadDeletedData() {
            document.getElementById('tableContent').innerHTML = '<div class=\"loading\">Loading deleted items...</div>';
            
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/recycle_bin?order=deleted_at.desc`, {
                    method: 'GET',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    }
                });
                
                if (response.ok) {
                    deletedData = await response.json();
                    displayDeletedData(deletedData);
                    document.getElementById('deletedCount').textContent = deletedData.length;
                } else {
                    document.getElementById('tableContent').innerHTML = '<div class=\"no-data\">❌ Error loading recycle bin</div>';
                }
            } catch (error) {
                document.getElementById('tableContent').innerHTML = `<div class=\"no-data\">❌ Error: ${error.message}</div>`;
            }
        }
        
        function displayDeletedData(data) {
            if (data.length === 0) {
                document.getElementById('tableContent').innerHTML = '<div class=\"no-data\">🗑️ Recycle Bin is empty. No deleted transactions found.</div>';
                return;
            }
            
            let html = `
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Original Created</th>
                            <th>Deleted At</th>
                            <th>Sale Amount (₹)</th>
                            <th>Expense Name</th>
                            <th>Expense Amount (₹)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            data.forEach((row, index) => {
                const createdDate = new Date(row.created_at).toLocaleString('en-IN');
                const deletedDate = new Date(row.deleted_at).toLocaleString('en-IN');
                
                html += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${createdDate}</td>
                        <td class=\"deleted-at\">${deletedDate}</td>
                        <td>${row.sale_amount ? '₹' + parseFloat(row.sale_amount).toFixed(2) : '-'}</td>
                        <td>${row.expense_name || '-'}</td>
                        <td>${row.expense_amount ? '₹' + parseFloat(row.expense_amount).toFixed(2) : '-'}</td>
                        <td>
                            <button onclick=\"restoreRow('${row.id}')\" class=\"btn btn-success\" style=\"padding: 6px 12px; font-size: 12px; margin-right: 5px;\">♻️ Restore</button>
                            <button onclick=\"permanentDelete('${row.id}')\" class=\"btn btn-danger\" style=\"padding: 6px 12px; font-size: 12px;\">🗑️ Delete</button>
                        </td>
                    </tr>
                `;
            });
            
            html += '</tbody></table>';
            document.getElementById('tableContent').innerHTML = html;
        }
        
        async function restoreRow(id) {
            const row = deletedData.find(r => r.id === id);
            if (!row) return;
            
            if (!confirm('Are you sure you want to restore this transaction?')) return;
            
            try {
                // Step 1: Insert back into transactions
                const restoreData = {
                    sale_amount: row.sale_amount,
                    expense_name: row.expense_name,
                    expense_amount: row.expense_amount
                };
                
                const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/transactions`, {
                    method: 'POST',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify(restoreData)
                });
                
                if (!insertResponse.ok) {
                    showMessage('❌ Error restoring transaction', 'error');
                    return;
                }
                
                // Step 2: Remove from recycle_bin
                const deleteResponse = await fetch(`${SUPABASE_URL}/rest/v1/recycle_bin?id=eq.${id}`, {
                    method: 'DELETE',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    }
                });
                
                if (deleteResponse.ok) {
                    showMessage('✅ Transaction restored successfully!', 'success');
                    loadDeletedData();
                } else {
                    showMessage('❌ Error removing from recycle bin', 'error');
                }
            } catch (error) {
                showMessage('❌ Error: ' + error.message, 'error');
            }
        }
        
        async function restoreAll() {
            if (deletedData.length === 0) {
                showMessage('No items to restore', 'error');
                return;
            }
            
            if (!confirm(`Are you sure you want to restore all ${deletedData.length} transactions?`)) return;
            
            let restored = 0;
            let failed = 0;
            
            for (const row of deletedData) {
                try {
                    const restoreData = {
                        sale_amount: row.sale_amount,
                        expense_name: row.expense_name,
                        expense_amount: row.expense_amount
                    };
                    
                    const insertResponse = await fetch(`${SUPABASE_URL}/rest/v1/transactions`, {
                        method: 'POST',
                        headers: {
                            'apikey': SUPABASE_ANON_KEY,
                            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                            'Content-Type': 'application/json',
                            'Prefer': 'return=minimal'
                        },
                        body: JSON.stringify(restoreData)
                    });
                    
                    if (insertResponse.ok) {
                        await fetch(`${SUPABASE_URL}/rest/v1/recycle_bin?id=eq.${row.id}`, {
                            method: 'DELETE',
                            headers: {
                                'apikey': SUPABASE_ANON_KEY,
                                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                            }
                        });
                        restored++;
                    } else {
                        failed++;
                    }
                } catch (error) {
                    failed++;
                }
            }
            
            showMessage(`✅ Restored ${restored} transactions${failed > 0 ? `, ${failed} failed` : ''}`, restored > 0 ? 'success' : 'error');
            loadDeletedData();
        }
        
        async function permanentDelete(id) {
            if (!confirm('⚠️ WARNING: This will PERMANENTLY delete this transaction.\\n\\nThis cannot be undone!')) return;
            if (!confirm('Really sure? This is permanent!')) return;
            
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/recycle_bin?id=eq.${id}`, {
                    method: 'DELETE',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    }
                });
                
                if (response.ok) {
                    showMessage('✅ Transaction permanently deleted', 'success');
                    loadDeletedData();
                } else {
                    showMessage('❌ Error deleting transaction', 'error');
                }
            } catch (error) {
                showMessage('❌ Error: ' + error.message, 'error');
            }
        }
        
        async function emptyRecycleBin() {
            if (deletedData.length === 0) {
                showMessage('Recycle bin is already empty', 'error');
                return;
            }
            
            if (!confirm(`⚠️ WARNING: This will PERMANENTLY delete ALL ${deletedData.length} transactions in recycle bin.\\n\\nThis cannot be undone!`)) return;
            if (!confirm('Really sure? All data will be lost forever!')) return;
            
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/recycle_bin`, {
                    method: 'DELETE',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    }
                });
                
                if (response.ok) {
                    showMessage('✅ Recycle bin emptied successfully', 'success');
                    loadDeletedData();
                } else {
                    showMessage('❌ Error emptying recycle bin', 'error');
                }
            } catch (error) {
                showMessage('❌ Error: ' + error.message, 'error');
            }
        }
        
        // Load on page load
        loadDeletedData();
    </script>


</body></html>"
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "🗑️ AMRS Shop Tracker - Recycle Bin" [level=1] [ref=e3]
  - paragraph [ref=e4]: Restore or Permanently Delete Transactions
  - generic [ref=e5]:
    - link "📥 Entry" [ref=e6] [cursor=pointer]:
      - /url: index.html
    - link "📊 View Data" [ref=e7] [cursor=pointer]:
      - /url: viewer.html
    - link "🗑️ Recycle Bin" [ref=e8] [cursor=pointer]:
      - /url: recycle-bin.html
  - generic [ref=e9]:
    - heading "Deleted Transactions" [level=3] [ref=e10]
    - generic [ref=e11]: "1"
  - generic [ref=e12]:
    - button "🔄 Refresh" [ref=e13] [cursor=pointer]
    - button "♻️ Restore All" [ref=e14] [cursor=pointer]
    - button "🗑️ Empty Recycle Bin" [ref=e15] [cursor=pointer]
  - table [ref=e18]:
    - rowgroup [ref=e19]:
      - row "# Original Created Deleted At Sale Amount (₹) Expense Name Expense Amount (₹) Actions" [ref=e20]:
        - columnheader "#" [ref=e21]
        - columnheader "Original Created" [ref=e22]
        - columnheader "Deleted At" [ref=e23]
        - columnheader "Sale Amount (₹)" [ref=e24]
        - columnheader "Expense Name" [ref=e25]
        - columnheader "Expense Amount (₹)" [ref=e26]
        - columnheader "Actions" [ref=e27]
    - rowgroup [ref=e28]:
      - row "1 9/5/2026, 2:54:43 pm 9/5/2026, 2:54:52 pm - 1st expense to delete ₹230.00 ♻️ Restore 🗑️ Delete" [ref=e29]:
        - cell "1" [ref=e30]
        - cell "9/5/2026, 2:54:43 pm" [ref=e31]
        - cell "9/5/2026, 2:54:52 pm" [ref=e32]
        - cell "-" [ref=e33]
        - cell "1st expense to delete" [ref=e34]
        - cell "₹230.00" [ref=e35]
        - cell "♻️ Restore 🗑️ Delete" [ref=e36]:
          - button "♻️ Restore" [ref=e37] [cursor=pointer]
          - button "🗑️ Delete" [ref=e38] [cursor=pointer]
```

# Test source

```ts
  105 |     await expect(page).toHaveURL(/grocery-tracker\/$/);
  106 |     
  107 |     await page.goto(RECYCLE_BIN_URL);
  108 |     await page.click('text=View Data');
  109 |     await expect(page).toHaveURL(/viewer\.html/);
  110 |   });
  111 | });
  112 | 
  113 | test.describe('🗑️ Recycle Bin - Integration Tests', () => {
  114 |   
  115 |   test('TC047: End-to-end delete and restore flow', async ({ page }) => {
  116 |     // Step 1: Add a transaction on entry page
  117 |     await page.goto('/grocery-tracker/');
  118 |     await page.waitForTimeout(2000);
  119 |     
  120 |     const timestamp = Date.now();
  121 |     await page.fill('#expense_name', `Test Item ${timestamp}`);
  122 |     await page.fill('#expense_amount', '99.99');
  123 |     await page.click('#submitBtn');
  124 |     
  125 |     await page.waitForTimeout(3000);
  126 |     
  127 |     // Step 2: Go to viewer and verify it exists
  128 |     await page.goto('/grocery-tracker/viewer.html');
  129 |     await page.waitForTimeout(3000);
  130 |     
  131 |     // Step 3: Delete it (if found in table)
  132 |     const rows = await page.locator('table tbody tr').count();
  133 |     if (rows > 0) {
  134 |       // Click delete on first row
  135 |       await page.locator('button:has-text("Delete")').first().click();
  136 |       
  137 |       // Confirm deletion
  138 |       page.on('dialog', async dialog => {
  139 |         if (dialog.type() === 'confirm') {
  140 |           await dialog.accept();
  141 |         }
  142 |       });
  143 |       
  144 |       await page.waitForTimeout(3000);
  145 |       
  146 |       // Step 4: Go to recycle bin and verify it's there
  147 |       await page.goto(RECYCLE_BIN_URL);
  148 |       await page.waitForTimeout(3000);
  149 |       
  150 |       const recycleBinCount = await page.locator('#deletedCount').textContent();
  151 |       console.log(`Recycle bin count after deletion: ${recycleBinCount}`);
  152 |     }
  153 |   });
  154 | });
  155 | 
  156 | test.describe('🗑️ Recycle Bin - Performance Tests', () => {
  157 |   
  158 |   test('TC048: Page load time', async ({ page }) => {
  159 |     const start = Date.now();
  160 |     await page.goto(RECYCLE_BIN_URL);
  161 |     await page.waitForLoadState('networkidle');
  162 |     const loadTime = Date.now() - start;
  163 |     
  164 |     console.log(`Recycle bin page load time: ${loadTime}ms`);
  165 |     expect(loadTime).toBeLessThan(6000);
  166 |   });
  167 | 
  168 |   test('TC049: Data loading with many items', async ({ page }) => {
  169 |     await page.goto(RECYCLE_BIN_URL);
  170 |     
  171 |     const start = Date.now();
  172 |     await page.waitForTimeout(3000);
  173 |     const loadTime = Date.now() - start;
  174 |     
  175 |     console.log(`Recycle bin data load time: ${loadTime}ms`);
  176 |     expect(loadTime).toBeLessThan(5000);
  177 |   });
  178 | 
  179 |   test('TC050: No console errors', async ({ page }) => {
  180 |     const errors = [];
  181 |     page.on('console', msg => {
  182 |       if (msg.type() === 'error') {
  183 |         errors.push(msg.text());
  184 |       }
  185 |     });
  186 |     
  187 |     await page.goto(RECYCLE_BIN_URL);
  188 |     await page.waitForTimeout(3000);
  189 |     
  190 |     console.log(`Console errors: ${errors.length}`);
  191 |     errors.forEach(e => console.log(`Error: ${e}`));
  192 |   });
  193 | });
  194 | 
  195 | test.describe('🗑️ Recycle Bin - Security Tests', () => {
  196 |   
  197 |   test.beforeEach(async ({ page }) => {
  198 |     await page.goto(RECYCLE_BIN_URL);
  199 |   });
  200 | 
  201 |   test('TC051: Verify no sensitive data exposure', async ({ page }) => {
  202 |     const pageContent = await page.content();
  203 |     
  204 |     // Should not expose raw API keys in HTML (they should be in JS only)
> 205 |     expect(pageContent).not.toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
      |                             ^ Error: expect(received).not.toContain(expected) // indexOf
  206 |   });
  207 | 
  208 |   test('TC052: HTTPS enforcement check', async ({ page }) => {
  209 |     const url = page.url();
  210 |     expect(url.startsWith('https://')).toBeTruthy();
  211 |   });
  212 | });
  213 | 
```