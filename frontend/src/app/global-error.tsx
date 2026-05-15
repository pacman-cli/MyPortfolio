"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-emerald-500 mb-4">500</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Critical error</h2>
          <p className="text-muted-foreground mb-8">
            A critical error occurred. Please refresh the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
          >
            Refresh page
          </button>
        </div>
      </body>
    </html>
  )
}
