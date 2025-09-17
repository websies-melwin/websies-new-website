// Test Authentication System
// Run with: node test-auth.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase Authentication...\n');

if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'your_supabase_project_url_here' || 
    supabaseAnonKey === 'your_supabase_anon_key_here') {
  console.error('❌ Please update your .env.local file with actual Supabase credentials\n');
  console.log('Steps to get your credentials:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Select your project (or create a new one)');
  console.log('3. Go to Settings → API');
  console.log('4. Copy Project URL and anon key to .env.local\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  try {
    console.log('✅ Supabase client initialized');
    console.log('URL:', supabaseUrl);
    console.log('Key:', '***' + supabaseAnonKey.slice(-10) + '\n');
    
    // Test auth methods availability
    console.log('Available auth methods:');
    console.log('- signUp: ' + (typeof supabase.auth.signUp === 'function' ? '✅' : '❌'));
    console.log('- signInWithPassword: ' + (typeof supabase.auth.signInWithPassword === 'function' ? '✅' : '❌'));
    console.log('- signOut: ' + (typeof supabase.auth.signOut === 'function' ? '✅' : '❌'));
    console.log('- getSession: ' + (typeof supabase.auth.getSession === 'function' ? '✅' : '❌'));
    
    // Check current session
    const { data: session, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('\n❌ Error checking session:', error.message);
    } else {
      console.log('\n✅ Auth system is ready!');
      console.log('Current session:', session.session ? 'Active' : 'None');
    }
    
    console.log('\n📝 Next steps:');
    console.log('1. Run the development server: npm run dev');
    console.log('2. Navigate to http://localhost:3000/auth to create an account');
    console.log('3. After signup, check your email for verification');
    console.log('4. Once verified, you can access the dashboard');
    
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  }
}

testAuth();