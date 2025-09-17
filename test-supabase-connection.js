// Test Supabase Connection
// Run this with: node test-supabase-connection.js

require('dotenv').config({ path: '.env.local' });

async function testSupabaseConnection() {
  console.log('🔄 Testing Supabase connection...\n');

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('Environment Variables:');
  console.log('SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('SUPABASE_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
  console.log('URL Value:', supabaseUrl || 'Not set');
  console.log('Key Preview:', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'Not set');

  if (!supabaseUrl || !supabaseKey) {
    console.log('\n❌ Missing Supabase credentials!');
    console.log('Please update your .env.local file with your actual Supabase credentials.');
    console.log('\nSteps:');
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Select your project');
    console.log('3. Go to Settings → API');
    console.log('4. Copy Project URL and Anon key to .env.local');
    return;
  }

  if (supabaseUrl.includes('your-project') || supabaseKey.includes('your-anon-key')) {
    console.log('\n❌ Using placeholder credentials!');
    console.log('Please replace the placeholder values in .env.local with your actual Supabase credentials.');
    return;
  }

  try {
    // Test connection
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('\n🔄 Testing database connection...');
    
    // Try to fetch from auth.users (this should work even if tables don't exist yet)
    const { data, error } = await supabase.auth.getSession();
    
    if (error && error.message.includes('Invalid API key')) {
      console.log('❌ Invalid Supabase credentials');
      return;
    }

    console.log('✅ Supabase connection successful!');
    
    // Test if our tables exist
    console.log('\n🔄 Checking database tables...');
    
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true });

    if (profileError) {
      console.log('❌ profiles table not found');
      console.log('📝 Please run the SQL schema in your Supabase dashboard');
      console.log('   File: supabase/schema.sql');
    } else {
      console.log('✅ profiles table exists');
    }

    console.log('\n🎉 Setup Status:');
    console.log('✅ Supabase credentials configured');
    console.log('✅ Connection working');
    console.log(profileError ? '❌ Database schema not set up' : '✅ Database schema ready');
    
    if (profileError) {
      console.log('\n📋 Next Steps:');
      console.log('1. Go to your Supabase dashboard');
      console.log('2. Navigate to SQL Editor');
      console.log('3. Copy and run the contents of supabase/schema.sql');
      console.log('4. Run this test again');
    } else {
      console.log('\n🚀 Ready to use! Try:');
      console.log('1. Go to http://localhost:3000/login');
      console.log('2. Create a new account');
      console.log('3. Check the dashboard');
    }

  } catch (err) {
    console.log('❌ Connection failed:', err.message);
  }
}

testSupabaseConnection().catch(console.error);
