import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fstmqszagwpykqgxpkmh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzdG1xc3phZ3dweWtxZ3hwa21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1ODg2NjAsImV4cCI6MjA5NzE2NDY2MH0.19lpVrHubKa5Fwcpb6WtEhY2sQo1EHUkwUh7JIgbP6k'

export const supabase = createClient(supabaseUrl, supabaseKey)