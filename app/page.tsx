import AuthButton from "@/components/AuthButton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-white">
      <main className="flex flex-col items-center gap-8 text-center max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Smart Bookmark App
          </h1>
          <p className="text-xl text-gray-400">
            A simple, secure, and real-time bookmark manager.
            Login to start organizing your web.
          </p>
        </div>

        <div className="p-1 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20">
          <div className="bg-gray-900/50 p-8 rounded-lg backdrop-blur-sm border border-gray-800">
            <AuthButton />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-sm text-gray-500">
          <div className="flex flex-col items-center gap-2">
            <span className="p-2 bg-gray-900 rounded-lg">🔒Private</span>
            <p>Your bookmarks are only visible to you.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="p-2 bg-gray-900 rounded-lg">⚡Real-time</span>
            <p>Updates instantly across all your devices.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="p-2 bg-gray-900 rounded-lg">🚀Fast</span>
            <p>Built with Next.js and Supabase for speed.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
