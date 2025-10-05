-- Enable Row Level Security
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    username text unique not null,
    email text not null,
    first_name text,
    last_name text,
    generations_this_month integer default 0,
    generations_reset_date timestamp with time zone default now(),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Create design_systems table
create table public.design_systems (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    author_id uuid references public.profiles(id) on delete cascade not null,
    author_username text not null,
    tags text[] default array[]::text[],
    prompt_tags text[] default array[]::text[],
    custom_prompt text,
    creativity_scale integer default 50 check (creativity_scale >= 0 and creativity_scale <= 100),
    json_tokens jsonb not null,
    preview_image_url text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    remixed_from uuid references public.design_systems(id) on delete set null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.design_systems enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone" on public.profiles
    for select using (true);

create policy "Users can insert their own profile" on public.profiles
    for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
    for update using (auth.uid() = id);

-- Design systems policies
create policy "Design systems are viewable by everyone" on public.design_systems
    for select using (true);

create policy "Authenticated users can insert design systems" on public.design_systems
    for insert with check (auth.role() = 'authenticated' and auth.uid() = author_id);

create policy "Users can update their own design systems" on public.design_systems
    for update using (auth.uid() = author_id);

create policy "Users can delete their own design systems" on public.design_systems
    for delete using (auth.uid() = author_id);

-- Create indexes for better performance
create index profiles_username_idx on public.profiles(username);
create index design_systems_author_id_idx on public.design_systems(author_id);
create index design_systems_created_at_idx on public.design_systems(created_at desc);
create index design_systems_tags_idx on public.design_systems using gin(tags);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_updated_at before update on public.profiles
    for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.design_systems
    for each row execute procedure public.handle_updated_at();

-- Function to handle user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, username, email, first_name)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
        new.email,
        new.raw_user_meta_data->>'first_name'
    );
    return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
