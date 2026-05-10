-- Create root_backup table with same schema as recycle_bin
-- This table will store permanent backups that are never deleted

CREATE TABLE root_backup (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    sale_amount DECIMAL(10,2),
    expense_name TEXT,
    expense_amount DECIMAL(10,2),
    is_hidden BOOLEAN DEFAULT false
);

-- Add comment to describe the table
COMMENT ON TABLE root_backup IS 'Permanent backup table - stores all deleted transactions forever for audit/compliance';

-- Create index for faster queries
CREATE INDEX idx_root_backup_deleted_at ON root_backup(deleted_at DESC);
CREATE INDEX idx_root_backup_is_hidden ON root_backup(is_hidden);
