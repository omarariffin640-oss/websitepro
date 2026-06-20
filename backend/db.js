const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://mxaanohwaafzshwksqrt.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14YWFub2h3YWFmenNod2tzcXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NjA2NDksImV4cCI6MjA5NjMzNjY0OX0.gdZ1OIjsPXVQfBoT9Nipabzj6CU273ERxefvKSdbteI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;