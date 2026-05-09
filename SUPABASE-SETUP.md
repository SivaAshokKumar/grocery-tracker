# Supabase Setup Guide for Grocery Tracker

## Step 1: Create Supabase Account (FREE)

1. Go to https://supabase.com/
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Create a new organization (e.g., "Personal")
5. Create a new project:
   - Name: `grocery-tracker`
   - Database Password: (generate a strong one, save it!)
   - Region: Choose closest to you (e.g., Singapore for India)
   - Plan: Free Tier

## Step 2: Create Database Table

1. In Supabase Dashboard, go to **Table Editor**
2. Click **"New table"**
3. Table name: `transactions`
4. Enable **Row Level Security** (RLS)
5. Add these columns:

| Column Name | Type | Default | Primary |
|-------------|------|---------|---------|
| id | uuid | gen_random_uuid() | ✅ Yes |
| created_at | timestamptz | now() | No |
| sale_amount | numeric | null | No |
| expense_name | text | null | No |
| expense_amount | numeric | null | No |

6. Click **Save**

## Step 3: Get API Credentials

1. Go to **Project Settings** (gear icon, bottom left)
2. Click **API** in the sidebar
3. Copy these values:
   - **URL**: `https://xxxxxxxxxxxx.supabase.co`
   - **anon public** key: `eyJ...`

## Step 4: Configure RLS Policies (Security)

1. Go to **Authentication** → **Policies**
2. Find `transactions` table
3. Click **New policy**
4. Choose **"Enable read access for all users"** template
5. Click **Review** → **Save policy**
6. Click **New policy** again
7. Choose **"Enable insert access for all users"** template
8. Click **Review** → **Save policy**

## Step 5: Update HTML Files

Replace `SUPABASE_URL` and `SUPABASE_KEY` in both HTML files with your credentials.

## Free Tier Limits

- 500 MB database storage
- 2 GB bandwidth/month
- 50,000 users/month
- Unlimited API requests
- Perfect for personal use!

## URLs After Setup

- **Data Entry**: https://SivaAshokKumar.github.io/grocery-tracker/
- **Data Viewer**: https://SivaAshokKumar.github.io/grocery-tracker/viewer.html
