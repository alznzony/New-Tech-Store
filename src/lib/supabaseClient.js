import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://umrkxareviqvayfzmukr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtcmt4YXJldmlxdmF5ZnptdWtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyODg0NjEsImV4cCI6MjA2Mjg2NDQ2MX0.tjS2XCWFOfvUqKQs0wS70MDDG4ew7RJJIBBI_I8M3P8";

export const supabase = createClient(supabaseUrl, supabaseKey);
