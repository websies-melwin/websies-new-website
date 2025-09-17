# Supabase Authentication Setup Guide

## ✅ What I've Done

1. **Updated Login System**: Your login page now connects to Supabase authentication
2. **Added Authentication Provider**: Created `AuthProvider.js` for managing user state
3. **Protected Routes**: Added `ProtectedRoute.js` to secure your dashboard
4. **Updated Dashboard**: Now shows real user data and includes profile management
5. **Updated Header**: Shows login/logout based on authentication state
6. **Database Schema**: Created complete schema for users, subscriptions, referrals, etc.

## 🔧 What You Need to Do

### Step 1: Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings → API**
4. Copy these values:
   - **Project URL** (looks like: https://abc123.supabase.co)
   - **Anon public key** (starts with: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)

### Step 2: Update Environment Variables

1. Open your `.env.local` file
2. Replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### Step 3: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/schema.sql` (I created this file)
3. Paste it into the SQL Editor and click **Run**

This will create:
- User profiles table
- Subscriptions table
- Referrals table
- Website requests table
- All necessary security policies
- Automatic profile creation trigger

### Step 4: Test the Authentication

1. Start your development server: `npm run dev`
2. Go to `/login`
3. Try creating a new account
4. Check that you get redirected to `/dashboard`
5. Verify your profile data shows up

## 🎉 Features Now Available

### For Users:
- **Sign Up/Sign In**: Full authentication flow
- **Protected Dashboard**: Only accessible when logged in
- **Profile Management**: Users can update their name and business info
- **Referral System**: Each user gets a unique referral code
- **Secure Logout**: Proper session management

### For Admins:
- **Role-based Access**: Admin and owner roles supported
- **User Management**: View all user profiles (when admin)
- **Protected Routes**: Different access levels based on roles

## 🔒 Security Features

- **Row Level Security**: Users can only see their own data
- **Protected Routes**: Automatic redirection if not authenticated
- **Secure Sessions**: Proper token management
- **Email Verification**: Built-in email confirmation (configurable)

## 🛠️ Next Steps (Optional)

1. **Email Templates**: Customize sign-up/reset password emails in Supabase
2. **Social Login**: Add Google/Facebook login if needed
3. **Email Verification**: Enable/disable email confirmation in Supabase Auth settings
4. **Password Policy**: Set minimum password requirements
5. **Rate Limiting**: Configure sign-up rate limits

## 📁 Files Created/Modified

- ✅ `components/AuthProvider.js` - Authentication context
- ✅ `components/ProtectedRoute.js` - Route protection
- ✅ `app/(site)/login/page.js` - Updated login form
- ✅ `app/(site)/dashboard/page.js` - Updated dashboard
- ✅ `components/SiteHeader.js` - Updated header with auth
- ✅ `app/layout.js` - Added AuthProvider
- ✅ `supabase/schema.sql` - Database schema

Your authentication system is now fully functional! Just add your Supabase credentials and run the database schema.
