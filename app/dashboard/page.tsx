import AddBookmarkForm from '@/components/AddBookmarkForm'
import BookmarkList from '@/components/BookmarkList'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/')
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        SmartMark
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400 hidden sm:inline-block">
                            {user.email}
                        </span>
                        <form action="/auth/signout" method="post">
                            <button className="text-sm px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors">
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                <AddBookmarkForm />
                <BookmarkList />
            </main>
        </div>
    )
}
