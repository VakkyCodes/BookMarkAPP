'use client'

import { createClient } from '@/utils/supabase/client'
import { Loader2, Trash2, ExternalLink } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Bookmark {
    id: number
    title: string
    url: string
    created_at: string
    user_id: string
}

export default function BookmarkList() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchBookmarks = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data, error } = await supabase
                    .from('bookmarks')
                    .select('*')
                    .order('created_at', { ascending: false })

                if (!error && data) {
                    setBookmarks(data)
                }
            }
            setIsLoading(false)
        }

        fetchBookmarks()

        // Realtime subscription
        const channel = supabase
            .channel('realtime bookmarks')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'bookmarks'
            }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setBookmarks((prev) => [payload.new as Bookmark, ...prev])
                } else if (payload.eventType === 'DELETE') {
                    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== (payload.old as Bookmark).id))
                } else if (payload.eventType === 'UPDATE') {
                    setBookmarks((prev) => prev.map((bookmark) =>
                        bookmark.id === (payload.new as Bookmark).id ? (payload.new as Bookmark) : bookmark
                    ))
                }
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    const handleDelete = async (id: number) => {
        try {
            const { error } = await supabase
                .from('bookmarks')
                .delete()
                .eq('id', id)

            if (error) throw error
        } catch (error) {
            console.error('Error deleting bookmark:', error)
            alert('Error deleting bookmark')
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 bg-gray-900/30 rounded-xl border border-dashed border-gray-800">
                <p>No bookmarks yet. Add one above!</p>
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark) => (
                <div
                    key={bookmark.id}
                    className="group relative p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all hover:bg-gray-900"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-white line-clamp-1 pr-8" title={bookmark.title}>
                            {bookmark.title}
                        </h3>
                        <button
                            onClick={() => handleDelete(bookmark.id)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete bookmark"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>

                    <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 break-all line-clamp-1"
                    >
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        {bookmark.url}
                    </a>

                    <div className="mt-4 text-xs text-gray-600">
                        {new Date(bookmark.created_at).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    )
}
