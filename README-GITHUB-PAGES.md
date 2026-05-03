# 🛒 Grocery Shop Tracker - GitHub Pages Edition

A simple web application to track sales and expenses, hosted on **GitHub Pages** (no Docker required!).

## Architecture

- **Frontend**: Static HTML/CSS/JS hosted on GitHub Pages (FREE)
- **Backend**: Google Apps Script (serverless, FREE)
- **Database**: Google Sheets (FREE)

## Setup Instructions

### Step 1: Create Google Apps Script Backend

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Replace the default `Code.gs` with the content from `google-apps-script/Code.gs` in this repo
4. **Save** the project (Ctrl+S)

### Step 2: Deploy Apps Script as Web App

1. Click **Deploy** → **New deployment**
2. Click **Select type** → **Web app**
3. Configure:
   - **Description**: `Grocery Tracker API v1`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` (or `Anyone with Google account` for more security)
4. Click **Deploy**
5. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/.../exec`)
6. Click **Done**

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository → **Settings** → **Pages**
2. Under **Build and deployment**:
   - **Source**: `GitHub Actions`
3. The workflow will auto-deploy on next push

### Step 4: Use the App

1. Visit your GitHub Pages site: `https://SivaAshokKumar.github.io/grocery-tracker/`
2. **Paste your Apps Script URL** in the input field
3. Start tracking sales and expenses!

## File Structure

```
.
├── docs/
│   └── index.html          # Frontend (deployed to GitHub Pages)
├── google-apps-script/
│   └── Code.gs             # Backend code (deploy to Apps Script)
├── .github/workflows/
│   └── github-pages.yml    # Auto-deploy to Pages
└── README-GITHUB-PAGES.md  # This file
```

## How It Works

1. User fills form on GitHub Pages site
2. JavaScript sends POST request to Google Apps Script
3. Apps Script writes data to Google Sheets
4. All happens without any server hosting costs!

## Troubleshooting

### "Please enter your Google Apps Script URL"
- You need to deploy the Apps Script first (Step 2)
- Copy the Web App URL and paste it in the site

### "Error: Failed to fetch"
- Check that Apps Script is deployed with "Anyone" access
- Verify the URL is correct (ends with `/exec`)

### Data not appearing in Google Sheets
- Check Apps Script execution logs: **View** → **Executions**
- Ensure the Apps Script has permissions to access Google Drive/Sheets

## Free Tier Limits

- **GitHub Pages**: 1GB storage, 100GB bandwidth/month
- **Google Apps Script**: 50,000 URL fetches/day
- **Google Sheets**: 1 billion read/write requests/month

## Advantages Over Docker

✅ No Docker Desktop required
✅ No local server to run
✅ Accessible from anywhere
✅ Automatic HTTPS
✅ Zero hosting costs
✅ CI/CD built-in

## Security Note

The Apps Script URL is stored in your browser's localStorage, not on any server. The Google Sheet is private to your Google account.
