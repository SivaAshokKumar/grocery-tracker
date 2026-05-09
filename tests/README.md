# AMRS Shop Tracker - Test Suite

Comprehensive Playwright E2E testing suite for the AMRS Shop Tracker application.

## 📁 Test Structure

```
tests/
├── e2e/
│   ├── entry-page.spec.js      # Entry page tests (19 cases)
│   ├── viewer-page.spec.js     # Viewer page tests (18 cases)
│   └── recycle-bin.spec.js     # Recycle bin tests (17 cases)
├── playwright.config.js        # Test configuration
├── package.json               # Dependencies & scripts
├── TEST-REPORT.md            # Detailed test report template
└── README.md                 # This file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd tests
npm install
npx playwright install
```

### 2. Run Tests

```bash
# Run all tests
npm test

# Run with UI (interactive)
npm run test:ui

# Run specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run mobile tests
npm run test:mobile

# Debug mode
npm run test:debug
```

### 3. View Results

```bash
# Open HTML report
npm run report
```

## 📊 Test Summary

| Page | Test Cases | Browsers | Mobile |
|------|------------|----------|--------|
| Entry Page | 19 | Chrome, Firefox, Safari | Pixel 5, iPhone 12 |
| Viewer Page | 18 | Chrome, Firefox, Safari | Pixel 5, iPhone 12 |
| Recycle Bin | 17 | Chrome, Firefox, Safari | Pixel 5, iPhone 12 |
| **TOTAL** | **54** | 3 | 2 |

## 🎯 Test Categories

### Entry Page Tests
- ✅ UI/UX (5 tests)
- ✅ Functionality (6 tests)
- ✅ Navigation (2 tests)
- ✅ Performance (3 tests)
- ✅ Accessibility (3 tests)

### Viewer Page Tests
- ✅ UI/UX (5 tests)
- ✅ Functionality (5 tests)
- ✅ Data Display (4 tests)
- ✅ Performance (3 tests)
- ✅ Security (1 test)

### Recycle Bin Tests
- ✅ UI/UX (5 tests)
- ✅ Functionality (6 tests)
- ✅ Integration (1 test)
- ✅ Performance (3 tests)
- ✅ Security (2 tests)

## 📈 Performance Targets

| Metric | Target |
|--------|--------|
| Page Load | < 5 seconds |
| Data Refresh | < 3 seconds |
| Form Submit | < 2 seconds |
| Excel Export | < 5 seconds |

## 🛡️ Security Tests

- HTTPS enforcement
- API key exposure check
- Console error monitoring
- Page error handling

## ♿ Accessibility Tests

- Form label validation
- Color contrast check
- Keyboard navigation
- Mobile responsiveness

## 📝 Test Case IDs

- **TC001-TC019:** Entry Page
- **TC020-TC037:** Viewer Page  
- **TC038-TC054:** Recycle Bin

## 🔧 Configuration

Test configuration is in `playwright.config.js`:
- Base URL: `https://sivaashokkumar.github.io`
- Browsers: Chrome, Firefox, Safari
- Mobile: Pixel 5, iPhone 12
- Retries: 2 on CI, 0 locally
- Workers: Auto-detected

## 📄 Reports

- HTML Report: `playwright-report/index.html`
- JSON Report: `test-results.json`
- Markdown Report: `TEST-REPORT.md`

## 🐛 Debugging

```bash
# Run in headed mode (see browser)
npm run test:headed

# Debug specific test
npx playwright test entry-page.spec.js --debug

# Slow motion execution
npx playwright test --headed --slow-mo 1000
```

## 📞 Support

For issues with tests:
1. Check Playwright docs: https://playwright.dev
2. Verify site is accessible: https://sivaashokkumar.github.io/grocery-tracker/
3. Check Supabase status if tests fail with API errors

---

**Created:** May 9, 2026  
**Framework:** Playwright v1.40  
**Total Test Cases:** 54
