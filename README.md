# Smart Bookmark App

A simple, secure bookmark manager built with Next.js, Supabase (Auth, Database, Realtime), and Tailwind CSS.
Features:
- **Authentication**: Sign in/up with Google only.
- **Bookmarks**: Add bookmarks with Title and URL.
- **Private**: Users can only see their own bookmarks (RLS enforced).
- **Real-time**: Bookmark list updates instantly without refresh if modified in another tab/session.
- **Live Deployment**: Deployed on Vercel.

## Tech Stack
- **Frontend**: Next.js 14 (App Router)
- **Backend/DB**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS

## Setup & Run Locally
1. Clone repo: `git clone <repo-url>`
2. Install deps: `npm install`
3. Create `.env.local` with your Supabase keys:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```
4. Run: `npm run dev`

## Challenges & Solutions
- **Realtime**: Used Supabase Realtime subscription (`channel().on('postgres_changes')`) to listen for INSERT/DELETE events and update the state instantly.
- **RLS**: Configured Row Level Security policies in SQL to ensure strict data privacy for authenticated users.
