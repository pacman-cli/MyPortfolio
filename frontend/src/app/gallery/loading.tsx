export default function GalleryLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 max-w-6xl pt-28 pb-20">
        <div className="mb-16">
          <div className="h-12 w-48 bg-muted rounded-lg animate-pulse mb-4" />
          <div className="h-6 w-96 bg-muted rounded-lg animate-pulse" />
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-3 rounded-2xl bg-muted animate-pulse"
              style={{ height: `${180 + (i % 4) * 60}px` }}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
