# 🛒 Grocery Shop Sales & Expense Tracker

A simple web application to track sales and expenses, automatically saving data to Google Sheets.

## Features

- **3 Input Fields** (all optional):
  - Sale Amount
  - Expense Name
  - Expense Amount
- **Automatic Data Storage** to Google Sheets
- **Docker Containerized** - Free tier compatible
- **CI/CD Pipeline** via GitHub Actions
- **Modern UI** with responsive design

## Prerequisites

### 1. Google Sheets API Setup (Required for data storage)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API" and enable it
   - Search for "Google Drive API" and enable it
4. Create Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in details and click "Create"
   - Grant role: "Editor" or "Owner"
   - Click "Done"
5. Create and download JSON key:
   - Click on the created service account
   - Go to "Keys" tab
   - Click "Add Key" > "Create New Key"
   - Select "JSON" and download
   - **Rename the downloaded file to `credentials.json` and place it in the project root**
6. Share your Google Sheet:
   - Open the downloaded `credentials.json` and copy the `client_email`
   - Create a new Google Sheet (or the app will create one automatically)
   - Share the sheet with the `client_email` from step above (give Editor access)

### 2. Docker Desktop Setup

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Free tier)
2. Sign in (free account works fine)
3. Ensure Docker Desktop is running

### 3. GitHub Secrets Setup (for CI/CD)

1. Push this code to a GitHub repository
2. Go to Settings > Secrets and Variables > Actions
3. Add these secrets:
   - `DOCKER_USERNAME` - Your Docker Hub username
   - `DOCKER_PASSWORD` - Your Docker Hub password or access token

## Running Locally with Docker Desktop

### Option 1: Build and Run Locally

```bash
# Build the Docker image
docker build -t grocery-tracker .

# Run the container (mount your credentials.json)
docker run -p 5000:5000 -v "$(pwd)/credentials.json:/app/credentials.json" grocery-tracker
```

### Option 2: Pull from Docker Hub (after CI/CD runs)

```bash
# Pull and run from Docker Hub
docker pull YOUR_DOCKER_USERNAME/grocery-tracker:latest
docker run -p 5000:5000 -v "$(pwd)/credentials.json:/app/credentials.json" YOUR_DOCKER_USERNAME/grocery-tracker:latest
```

### Option 3: Docker Compose (Easiest)

```bash
docker-compose up
```

## Access the Application

Once running, open your browser and go to:
- **http://localhost:5000**

## Project Structure

```
.
├── app.py                    # Flask application
├── requirements.txt          # Python dependencies
├── Dockerfile                # Docker configuration
├── docker-compose.yml        # Docker Compose configuration
├── credentials.json          # Google API credentials (you provide this)
├── templates/
│   └── index.html           # Web UI
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # GitHub Actions pipeline
└── README.md
```

## CI/CD Pipeline

The GitHub Actions workflow automatically:
1. Builds the Docker image on every push to `main`/`master`
2. Pushes the image to Docker Hub
3. You can then pull and run locally

## Usage

1. Open the web interface at `http://localhost:5000`
2. Enter data in any combination of fields:
   - Sale Amount only
   - Expense Name + Expense Amount
   - All three fields
   - Any combination (all fields are optional)
3. Click "Save to Google Sheets"
4. Data automatically appears in your Google Sheet with timestamp

## Troubleshooting

### "Error saving data" message
- Verify `credentials.json` is in the project root
- Check that Google Sheets API and Drive API are enabled
- Ensure the service account email has access to the sheet

### Docker issues
- Ensure Docker Desktop is running
- Check port 5000 is not in use: `docker ps`
- Try rebuilding: `docker build --no-cache -t grocery-tracker .`

## Free Tier Compatibility

✅ **Docker Desktop Free Tier** - Works perfectly
✅ **Google Sheets API** - Free tier (1 billion read/write requests per month)
✅ **GitHub Actions** - Free tier (2,000 minutes/month for public repos)
✅ **Docker Hub** - Free tier (unlimited public repositories)

## License

MIT License - Personal learning project
