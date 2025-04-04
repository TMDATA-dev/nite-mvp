-- Create audio_messages table
CREATE TABLE IF NOT EXISTS audio_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message_content TEXT,
  audio_url TEXT NOT NULL,
  duration INTEGER, -- Duration in seconds
  transcription TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Add RLS (Row Level Security) Policies
ALTER TABLE audio_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own audio messages
CREATE POLICY "Users can view their own audio messages" 
ON audio_messages
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can only insert their own audio messages
CREATE POLICY "Users can insert their own audio messages" 
ON audio_messages
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own audio messages
CREATE POLICY "Users can update their own audio messages" 
ON audio_messages
FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: Users can only delete their own audio messages
CREATE POLICY "Users can delete their own audio messages" 
ON audio_messages
FOR DELETE
USING (auth.uid() = user_id);

-- Create an index on user_id for faster queries
CREATE INDEX audio_messages_user_id_idx ON audio_messages (user_id);

-- Create function to update the updated_at field
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on each update
CREATE TRIGGER update_audio_messages_updated_at
BEFORE UPDATE ON audio_messages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 