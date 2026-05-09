# Recycle Bin Setup Guide

## Step 1: Create Recycle Bin Table in Supabase

1. Go to Supabase Dashboard → Table Editor
2. Click "New table"
3. Table name: `recycle_bin`
4. Enable Row Level Security (RLS)
5. Add these columns:

| Column Name | Type | Default |
|-------------|------|---------|
| id | uuid | gen_random_uuid() |
| original_id | uuid | (no default) |
| created_at | timestamptz | (no default) |
| deleted_at | timestamptz | now() |
| sale_amount | numeric | null |
| expense_name | text | null |
| expense_amount | numeric | null |

6. Click "Save"

## Step 2: Add RLS Policies for Recycle Bin

Go to Authentication → Policies → recycle_bin table

Add these policies:
1. "Enable read access for all users" (SELECT)
2. "Enable insert access for all users" (INSERT)
3. "Enable delete access for all users" (DELETE) - for permanent delete

## Step 3: Done!

Your app will now:
- ✅ Copy deleted rows to recycle_bin before deletion
- ✅ Show deleted_at timestamp
- ✅ Preserve original created_at
- ✅ Allow viewing and restoring from recycle bin
