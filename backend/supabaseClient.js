// supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://mywxdbckvgfasdjjqmfu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15d3hkYmNrdmdmYXNkampxbWZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNjM1MDYsImV4cCI6MjA2ODgzOTUwNn0.zCXY9cJBRtel1HeX0XAndgiXo2Ikk7XSFT8iMkMLxNk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = supabase; 