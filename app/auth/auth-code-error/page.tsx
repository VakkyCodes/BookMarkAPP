export default function AuthErrorPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold text-red-500">Authentication Error</h1>
                <p className="text-gray-600">There was an error logging you in. Please try again.</p>
                <a
                    href="/"
                    className="inline-block bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                    Back to Home
                </a>
            </div>
        </div>
    )
}
