'use client'

import { createClient } from '@/utils/supabase/client'
import { Loader2, Plus } from 'lucide-react'
import { useState } from 'react'

export default function AddBookmarkForm() {
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!url || !title) return

        setIsLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) throw new Error('No user found')

            const { error } = await supabase
                .from('bookmarks')
                .insert([
                    {
                        title,
                        url,
                        user_id: user.id
                    }
                ])

            if (error) throw error

            setUrl('')
            setTitle('')
        } catch (error) {
            console.error('Error adding bookmark:', error)
            alert('Error adding bookmark')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4 rounded-xl bg-gray-900/50 p-6 border border-gray-800">
            <h2 className="text-lg font-semibold text-white mb-4">Add New Bookmark</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. My Favorite Blog"
                        className="w-full rounded-lg bg-gray-950 border border-gray-800 px-4 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-400 mb-1">
                        URL
                    </label>
                    <input
                        id="url"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full rounded-lg bg-gray-950 border border-gray-800 px-4 py-2 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        required
                    />
                </div>
            </div>
            <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Plus className="h-4 w-4" />
                    )}
                    Add Bookmark
                </button>
            </div>
        </form>
    )
}
