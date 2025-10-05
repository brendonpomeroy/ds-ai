-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_generations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can view public design systems" ON design_systems;
DROP POLICY IF EXISTS "Users can create design systems" ON design_systems;
DROP POLICY IF EXISTS "Users can update their own design systems" ON design_systems;
DROP POLICY IF EXISTS "Users can view their own generations" ON user_generations;
DROP POLICY IF EXISTS "Users can create their own generations" ON user_generations;

-- Remove the premature trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Profiles table policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Design systems table policies
CREATE POLICY "Anyone can view public design systems" ON design_systems
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can create design systems" ON design_systems
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own design systems" ON design_systems
  FOR UPDATE USING (auth.uid() = author_id);

-- User generations table policies
CREATE POLICY "Users can view their own generations" ON user_generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own generations" ON user_generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
